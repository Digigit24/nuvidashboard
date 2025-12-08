import { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  consultationAPI,
  Consultation,
  CreateConsultationData,
  UpdateConsultationStatusData,
} from '@/lib/api-config';

export const useConsultations = () => {
  const { token } = useAuth();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch all consultations
   */
  const fetchConsultations = useCallback(async () => {
    if (!token) {
      setError('No authentication token');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await consultationAPI.getAll(token);
      setConsultations(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch consultations';
      setError(errorMessage);
      console.error('Error fetching consultations:', err);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  /**
   * Get consultation by ID
   */
  const getConsultation = useCallback(
    async (id: number): Promise<Consultation | null> => {
      if (!token) {
        setError('No authentication token');
        return null;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data = await consultationAPI.getById(token, id);
        return data;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch consultation';
        setError(errorMessage);
        console.error('Error fetching consultation:', err);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [token]
  );

  /**
   * Create new consultation
   */
  const createConsultation = useCallback(
    async (data: CreateConsultationData): Promise<Consultation | null> => {
      if (!token) {
        setError('No authentication token');
        return null;
      }

      setIsLoading(true);
      setError(null);

      try {
        const newConsultation = await consultationAPI.create(token, data);
        setConsultations((prev) => [newConsultation, ...prev]);
        return newConsultation;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to create consultation';
        setError(errorMessage);
        console.error('Error creating consultation:', err);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [token]
  );

  /**
   * Update consultation status
   */
  const updateConsultationStatus = useCallback(
    async (id: number, statusData: UpdateConsultationStatusData): Promise<boolean> => {
      if (!token) {
        setError('No authentication token');
        return false;
      }

      setIsLoading(true);
      setError(null);

      try {
        const updatedConsultation = await consultationAPI.updateStatus(token, id, statusData);
        setConsultations((prev) =>
          prev.map((consultation) =>
            consultation.id === id ? updatedConsultation : consultation
          )
        );
        return true;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to update status';
        setError(errorMessage);
        console.error('Error updating consultation status:', err);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [token]
  );

  return {
    consultations,
    isLoading,
    error,
    fetchConsultations,
    getConsultation,
    createConsultation,
    updateConsultationStatus,
  };
};
