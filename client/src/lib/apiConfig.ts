const API_BASE_URL = '/api';

export const apiConfig = {
  baseUrl: API_BASE_URL,
  endpoints: {
    users: `${API_BASE_URL}/users`,
    dashboard: `${API_BASE_URL}/dashboard`,
    settings: `${API_BASE_URL}/settings`,
  },
};

export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

export function buildUrl(endpoint: string, params?: Record<string, string>): string {
  const url = new URL(endpoint, window.location.origin);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  return url.toString();
}
