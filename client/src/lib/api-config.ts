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
