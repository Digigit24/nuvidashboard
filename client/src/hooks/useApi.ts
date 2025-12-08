import { useAuth } from '@/contexts/AuthContext';
import { useCallback } from 'react';

interface RequestOptions extends RequestInit {
  requiresAuth?: boolean;
}

export const useApi = () => {
  const { token } = useAuth();

  const apiRequest = useCallback(
    async <T = any>(url: string, options: RequestOptions = {}): Promise<T> => {
      const { requiresAuth = true, headers = {}, ...restOptions } = options;

      const requestHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(headers as Record<string, string>),
      };

      if (requiresAuth && token) {
        requestHeaders['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        ...restOptions,
        headers: requestHeaders,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Request failed' }));
        throw new Error(error.message || `Request failed with status ${response.status}`);
      }

      return response.json();
    },
    [token]
  );

  return { apiRequest };
};
