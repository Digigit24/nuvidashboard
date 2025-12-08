// API Configuration
export const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/auth/login/`,
    logout: `${API_BASE_URL}/auth/logout/`,
    register: `${API_BASE_URL}/auth/register/`,
    user: `${API_BASE_URL}/auth/me/`,
    userUpdate: `${API_BASE_URL}/auth/update/`,
  },
  consultations: {
    list: `${API_BASE_URL}/consultations/`,
    create: `${API_BASE_URL}/consultations/create`,
    detail: (id: number) => `${API_BASE_URL}/consultations/${id}`,
    updateStatus: (id: number) => `${API_BASE_URL}/consultations/${id}/status`,
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
  fullName?: string; // camelCase version for frontend
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
    const userData = data.user || data;

    // Transform snake_case to camelCase for consistency
    return {
      id: userData.id,
      email: userData.email,
      full_name: userData.full_name,
      fullName: userData.full_name, // Add camelCase version
      phone: userData.phone,
      role: userData.role,
    };
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
    const userData = responseData.user || responseData;

    // Transform snake_case to camelCase for consistency
    return {
      id: userData.id,
      email: userData.email,
      full_name: userData.full_name,
      fullName: userData.full_name, // Add camelCase version
      phone: userData.phone,
      role: userData.role,
    };
  },
};

// ============================================================================
// Consultation API Service
// ============================================================================

export interface Consultation {
  id: number;
  patient: number;
  doctor: number | null;
  patient_email?: string;
  doctor_email?: string | null;
  reason: string;
  date: string; // ISO format datetime
  status: 'Pending' | 'Approved' | 'Completed' | 'Cancelled';
  notes?: string;
}

export interface CreateConsultationData {
  patient: number;
  doctor?: number | null;
  reason: string;
  date: string; // ISO format datetime
  notes?: string;
}

export interface UpdateConsultationStatusData {
  status: 'Pending' | 'Approved' | 'Completed' | 'Cancelled';
}

export const consultationAPI = {
  /**
   * Get all consultations
   */
  getAll: async (accessToken: string): Promise<Consultation[]> => {
    const response = await fetch(API_ENDPOINTS.consultations.list, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch consultations');
    }

    return response.json();
  },

  /**
   * Get consultation by ID
   */
  getById: async (accessToken: string, id: number): Promise<Consultation> => {
    const response = await fetch(API_ENDPOINTS.consultations.detail(id), {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch consultation');
    }

    return response.json();
  },

  /**
   * Create new consultation
   */
  create: async (accessToken: string, data: CreateConsultationData): Promise<Consultation> => {
    const response = await fetch(API_ENDPOINTS.consultations.create, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to create consultation' }));
      throw new Error(error.message || error.detail || 'Failed to create consultation');
    }

    return response.json();
  },

  /**
   * Update consultation status
   */
  updateStatus: async (
    accessToken: string,
    id: number,
    data: UpdateConsultationStatusData
  ): Promise<Consultation> => {
    const response = await fetch(API_ENDPOINTS.consultations.updateStatus(id), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to update status' }));
      throw new Error(error.message || error.detail || 'Failed to update consultation status');
    }

    return response.json();
  },
};
