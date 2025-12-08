import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '@shared/schema';
import { authAPI } from '@/lib/api-config';

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
      const userData = await authAPI.getUser(authToken);
      setUser(userData as Omit<User, 'password'>);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      // Token is invalid, clear it
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      console.log('Attempting login...');

      // Call login API and get JWT tokens
      const { access, refresh } = await authAPI.login(email, password);
      console.log('Login successful, received tokens');

      if (!access) {
        throw new Error('No access token received from server');
      }

      // Store tokens
      setToken(access);
      localStorage.setItem('authToken', access);
      if (refresh) {
        localStorage.setItem('refreshToken', refresh);
      }

      // Fetch user data using the access token
      await fetchUser(access);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (registerData: RegisterData) => {
    try {
      console.log('Attempting registration...');

      // Convert camelCase to snake_case for Django backend
      const payload = {
        email: registerData.email,
        password: registerData.password,
        full_name: registerData.fullName,
        phone: registerData.phone || '',
        role: registerData.role,
      };

      // Call register API and get JWT tokens
      const { access, refresh } = await authAPI.register(payload);
      console.log('Registration successful, received tokens');

      if (!access) {
        throw new Error('No access token received from server');
      }

      // Store tokens
      setToken(access);
      localStorage.setItem('authToken', access);
      if (refresh) {
        localStorage.setItem('refreshToken', refresh);
      }

      // Fetch user data using the access token
      await fetchUser(access);
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
    localStorage.removeItem('refreshToken');

    // Call the backend logout endpoint
    if (currentToken) {
      authAPI.logout(currentToken);
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
