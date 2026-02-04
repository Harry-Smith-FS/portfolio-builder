/**
 * Formatting utilities for the Portfolio Builder
 */

/**
 * Format a number as Australian currency
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);

/**
 * Format a decimal as a percentage
 * @param {number} decimal - The decimal value (e.g., 0.05 for 5%)
 * @param {number} digits - Number of decimal places (default 2)
 * @returns {string} Formatted percentage string
 */
export const formatPercent = (decimal, digits = 2) =>
  (decimal * 100).toFixed(digits) + '%';

/**
 * Format a date in Australian format
 * @param {Date|string} date - The date to format
 * @returns {string} Formatted date string (DD/MM/YYYY)
 */
export const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-AU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

/**
 * Generate a random unique ID
 * @returns {string} 9-character alphanumeric ID
 */
export const generateId = () =>
  Math.random().toString(36).substr(2, 9);
