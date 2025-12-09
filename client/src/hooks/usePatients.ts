import { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { patientAPI } from '@/lib/api-config';
import type { PatientUser } from '@/types';

export const usePatients = () => {
  const { token } = useAuth();
  const [patients, setPatients] = useState<PatientUser[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<PatientUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch all patients
   */
  const fetchPatients = useCallback(async () => {
    if (!token) {
      setError('No authentication token');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await patientAPI.getAll(token);
      setPatients(Array.isArray(data) ? data : []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch patients';
      setError(errorMessage);
      console.error('Error fetching patients:', err);
      setPatients([]);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  /**
   * Fetch patient by ID
   */
  const fetchPatientById = useCallback(
    async (id: number): Promise<PatientUser | null> => {
      if (!token) {
        setError('No authentication token');
        return null;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data = await patientAPI.getById(token, id);
        setSelectedPatient(data);
        return data;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch patient';
        setError(errorMessage);
        console.error('Error fetching patient:', err);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [token]
  );

  /**
   * Clear selected patient
   */
  const clearSelectedPatient = useCallback(() => {
    setSelectedPatient(null);
  }, []);

  return {
    patients,
    selectedPatient,
    isLoading,
    error,
    fetchPatients,
    fetchPatientById,
    clearSelectedPatient,
  };
};
