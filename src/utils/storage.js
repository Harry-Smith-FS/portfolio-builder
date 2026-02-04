/**
 * Local storage utilities for portfolio persistence
 */

import { STORAGE_KEY } from '../data';

/**
 * Get all saved portfolios from localStorage
 * @returns {Object} Saved portfolios keyed by name
 */
export const getSavedPortfolios = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (e) {
    console.error('Error reading saved portfolios:', e);
    return {};
  }
};

/**
 * Save a portfolio to localStorage
 * @param {string} name - Portfolio name
 * @param {Object} data - Portfolio data to save
 * @returns {boolean} Success status
 */
export const savePortfolioToStorage = (name, data) => {
  try {
    const portfolios = getSavedPortfolios();
    portfolios[name] = {
      ...data,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolios));
    return true;
  } catch (e) {
    console.error('Error saving portfolio:', e);
    return false;
  }
};

/**
 * Delete a portfolio from localStorage
 * @param {string} name - Portfolio name to delete
 * @returns {boolean} Success status
 */
export const deletePortfolioFromStorage = (name) => {
  try {
    const portfolios = getSavedPortfolios();
    delete portfolios[name];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolios));
    return true;
  } catch (e) {
    console.error('Error deleting portfolio:', e);
    return false;
  }
};
