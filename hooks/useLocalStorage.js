import { useState, useCallback } from 'react';
import { STORAGE_KEY } from '../data/config';

export function useLocalStorage() {
  const [savedPortfolios, setSavedPortfolios] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const savePortfolio = useCallback((name, portfolioData) => {
    try {
      const newPortfolios = {
        ...savedPortfolios,
        [name]: {
          ...portfolioData,
          savedAt: new Date().toISOString()
        }
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPortfolios));
      setSavedPortfolios(newPortfolios);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [savedPortfolios]);

  const loadPortfolio = useCallback((name) => {
    const portfolio = savedPortfolios[name];
    if (portfolio) {
      return { success: true, data: portfolio };
    }
    return { success: false, error: 'Portfolio not found' };
  }, [savedPortfolios]);

  const deletePortfolio = useCallback((name) => {
    try {
      const newPortfolios = { ...savedPortfolios };
      delete newPortfolios[name];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPortfolios));
      setSavedPortfolios(newPortfolios);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [savedPortfolios]);

  const getPortfolioNames = useCallback(() => {
    return Object.keys(savedPortfolios);
  }, [savedPortfolios]);

  const exportToJSON = useCallback((portfolioData, filename = 'portfolio.json') => {
    const blob = new Blob([JSON.stringify(portfolioData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  return {
    savedPortfolios,
    savePortfolio,
    loadPortfolio,
    deletePortfolio,
    getPortfolioNames,
    exportToJSON,
    portfolioCount: Object.keys(savedPortfolios).length
  };
}

export default useLocalStorage;
