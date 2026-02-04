import { useState, useEffect, useCallback } from 'react';
import { fetchInvestments, fetchModels, fetchSharedPortfolios, saveSharedPortfolio } from '../api/supabase';
import { INVESTMENTS } from '../data/investments';
import { MODELS } from '../data/models';

export function useSupabase() {
  const [investments, setInvestments] = useState(INVESTMENTS);
  const [models, setModels] = useState(MODELS);
  const [sharedPortfolios, setSharedPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load data on mount
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const [investmentsResult, modelsResult, sharedResult] = await Promise.all([
          fetchInvestments().catch(() => null),
          fetchModels().catch(() => null),
          fetchSharedPortfolios().catch(() => [])
        ]);

        if (investmentsResult && Object.keys(investmentsResult).length > 0) {
          setInvestments(investmentsResult);
        }
        if (modelsResult && Object.keys(modelsResult).length > 0) {
          setModels(modelsResult);
        }
        if (Array.isArray(sharedResult)) {
          setSharedPortfolios(sharedResult);
        }
      } catch (err) {
        console.error('Failed to load data from Supabase:', err);
        setError('Failed to load data. Using default values.');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const refreshData = useCallback(async () => {
    setLoading(true);
    try {
      const [investmentsResult, modelsResult, sharedResult] = await Promise.all([
        fetchInvestments(),
        fetchModels(),
        fetchSharedPortfolios()
      ]);

      if (investmentsResult) setInvestments(investmentsResult);
      if (modelsResult) setModels(modelsResult);
      if (sharedResult) setSharedPortfolios(sharedResult);
    } catch (err) {
      setError('Failed to refresh data');
    } finally {
      setLoading(false);
    }
  }, []);

  const savePortfolioToTeam = useCallback(async (portfolioData) => {
    try {
      const result = await saveSharedPortfolio(portfolioData);
      if (result) {
        setSharedPortfolios(prev => [...prev, result]);
        return { success: true, data: result };
      }
      return { success: false, error: 'Failed to save' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, []);

  return {
    // Data
    investments,
    models,
    sharedPortfolios,

    // Status
    loading,
    error,
    isConnected: !error && !loading,

    // Actions
    refreshData,
    savePortfolioToTeam,

    // Counts for UI
    investmentCount: Object.keys(investments).length,
    modelCount: Object.keys(models).length
  };
}

export default useSupabase;
