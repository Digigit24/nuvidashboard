// API Configuration
export const API_BASE_URL = 'http://127.0.0.1:8000';

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/auth/login/`,
    logout: `${API_BASE_URL}/auth/logout/`,
    register: `${API_BASE_URL}/auth/register/`,
    user: `${API_BASE_URL}/auth/me/`,
    userUpdate: `${API_BASE_URL}/auth/update/`,
  },
};

// Auth API Service
interface LoginResponse {
  access: string;
  refresh: string;
}

interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  phone?: string;
  role: string;
}

interface UserData {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  role: string;
}

export const authAPI = {
  /**
   * Login user and get JWT tokens
   */
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(API_ENDPOINTS.auth.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Login failed' }));
      throw new Error(error.message || error.detail || 'Login failed');
    }

    return response.json();
  },

  /**
   * Get current user data using access token
   */
  getUser: async (accessToken: string): Promise<UserData> => {
    const response = await fetch(API_ENDPOINTS.auth.user, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
    // Django backend may return user directly or nested
    return data.user || data;
  },

  /**
   * Register a new user
   */
  register: async (registerData: RegisterData): Promise<LoginResponse> => {
    const response = await fetch(API_ENDPOINTS.auth.register, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Registration failed' }));
      throw new Error(error.message || error.detail || 'Registration failed');
    }

    return response.json();
  },

  /**
   * Logout user
   */
  logout: async (accessToken: string): Promise<void> => {
    await fetch(API_ENDPOINTS.auth.logout, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    }).catch(console.error);
  },

  /**
   * Update user profile
   */
  updateUser: async (accessToken: string, data: { full_name?: string; phone?: string }): Promise<UserData> => {
    const response = await fetch(API_ENDPOINTS.auth.userUpdate, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Update failed' }));
      throw new Error(error.message || error.detail || 'Failed to update user');
    }

    const responseData = await response.json();
    return responseData.user || responseData;
  },
};
