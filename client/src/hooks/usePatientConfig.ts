import { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { patientAPI } from '@/lib/api-config';
import type {
  PatientConfig,
  UpdatePatientConfigData,
  VitalRecord,
  CreateVitalRecordData,
  HealthTemplate,
} from '@/types';

export const usePatientConfig = () => {
  const { token } = useAuth();
  const [config, setConfig] = useState<PatientConfig | null>(null);
  const [vitals, setVitals] = useState<VitalRecord[]>([]);
  const [templates, setTemplates] = useState<HealthTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch patient config
   */
  const fetchConfig = useCallback(async () => {
    if (!token) {
      setError('No authentication token');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await patientAPI.getConfig(token);
      setConfig(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch patient config';
      setError(errorMessage);
      console.error('Error fetching patient config:', err);
      setConfig(null);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  /**
   * Update patient config
   */
  const updateConfig = useCallback(
    async (data: UpdatePatientConfigData): Promise<boolean> => {
      if (!token) {
        setError('No authentication token');
        return false;
      }

      setIsLoading(true);
      setError(null);

      try {
        const updatedConfig = await patientAPI.updateConfig(token, data);
        setConfig(updatedConfig);
        return true;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to update patient config';
        setError(errorMessage);
        console.error('Error updating patient config:', err);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [token]
  );

  /**
   * Fetch patient vitals
   */
  const fetchVitals = useCallback(async () => {
    if (!token) {
      setError('No authentication token');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await patientAPI.getVitals(token);
      setVitals(Array.isArray(data) ? data : []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch vitals';
      setError(errorMessage);
      console.error('Error fetching vitals:', err);
      setVitals([]);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  /**
   * Create vital record
   */
  const createVital = useCallback(
    async (data: CreateVitalRecordData): Promise<VitalRecord | null> => {
      if (!token) {
        setError('No authentication token');
        return null;
      }

      setIsLoading(true);
      setError(null);

      try {
        const newVital = await patientAPI.createVital(token, data);
        setVitals((prev) => [newVital, ...prev]);
        return newVital;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to create vital record';
        setError(errorMessage);
        console.error('Error creating vital record:', err);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [token]
  );

  /**
   * Fetch health templates
   */
  const fetchTemplates = useCallback(async () => {
    if (!token) {
      setError('No authentication token');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await patientAPI.getTemplates(token);
      setTemplates(Array.isArray(data) ? data : []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch health templates';
      setError(errorMessage);
      console.error('Error fetching health templates:', err);
      setTemplates([]);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  return {
    config,
    vitals,
    templates,
    isLoading,
    error,
    fetchConfig,
    updateConfig,
    fetchVitals,
    createVital,
    fetchTemplates,
  };
};
