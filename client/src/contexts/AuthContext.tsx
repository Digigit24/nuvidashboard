import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '@shared/schema';
import { API_ENDPOINTS } from '@/lib/api-config';

interface AuthContextType {
  user: Omit<User, 'password'> | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (roles: string | string[]) => boolean;
}

interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  full_name?: string; // Django backend uses snake_case
  phone?: string;
  role: 'Patient' | 'Doctor' | 'Admin';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Omit<User, 'password'> | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      // Fetch user data with the stored token
      fetchUser(storedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUser = async (authToken: string) => {
    try {
      const response = await fetch(API_ENDPOINTS.auth.user, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Django backend returns user directly, not nested
        setUser(data.user || data);
      } else {
        // Token is invalid, clear it
        localStorage.removeItem('authToken');
        setToken(null);
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      localStorage.removeItem('authToken');
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      console.log('Attempting login to:', API_ENDPOINTS.auth.login);
      const response = await fetch(API_ENDPOINTS.auth.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('Login response status:', response.status);

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Login failed' }));
        console.error('Login error response:', error);
        throw new Error(error.message || error.detail || 'Login failed');
      }

      const data = await response.json();
      console.log('Login successful, received data:', data);

      // Django JWT backend returns access and refresh tokens
      const accessToken = data.access;
      const refreshToken = data.refresh;

      if (!accessToken) {
        throw new Error('No access token received from server');
      }

      // Store tokens
      setToken(accessToken);
      localStorage.setItem('authToken', accessToken);
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }

      // Fetch user data using the access token
      await fetchUser(accessToken);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (registerData: RegisterData) => {
    try {
      // Convert camelCase to snake_case for Django backend
      const payload = {
        email: registerData.email,
        password: registerData.password,
        full_name: registerData.fullName,
        phone: registerData.phone || '',
        role: registerData.role,
      };

      console.log('Attempting registration to:', API_ENDPOINTS.auth.register);
      const response = await fetch(API_ENDPOINTS.auth.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('Registration response status:', response.status);

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Registration failed' }));
        console.error('Registration error response:', error);
        throw new Error(error.message || error.detail || 'Registration failed');
      }

      const data = await response.json();
      console.log('Registration successful, received data:', data);

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('authToken', data.token);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    const currentToken = token;

    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');

    // Call the backend logout endpoint
    if (currentToken) {
      fetch(API_ENDPOINTS.auth.logout, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${currentToken}`,
        },
      }).catch(console.error);
    }
  };

  const hasRole = (roles: string | string[]): boolean => {
    if (!user) return false;
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(user.role);
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user && !!token,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
