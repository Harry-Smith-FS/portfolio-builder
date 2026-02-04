/**
 * Supabase API client for the Portfolio Builder
 */

import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../data/config';

const headers = {
  'apikey': SUPABASE_ANON_KEY,
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
};

/**
 * Fetch active investments from Supabase
 * @returns {Promise<Array>} Array of investment records
 */
export const fetchInvestments = async () => {
  const resp = await fetch(
    `${SUPABASE_URL}/rest/v1/investments?select=*&active=eq.true&order=sort_order.asc`,
    { headers }
  );
  if (!resp.ok) throw new Error('Failed to fetch investments');
  return resp.json();
};

/**
 * Fetch active models from Supabase
 * @returns {Promise<Array>} Array of model records
 */
export const fetchModels = async () => {
  const resp = await fetch(
    `${SUPABASE_URL}/rest/v1/models?select=*&active=eq.true`,
    { headers }
  );
  if (!resp.ok) throw new Error('Failed to fetch models');
  return resp.json();
};

/**
 * Fetch shared portfolios from Supabase
 * @returns {Promise<Array>} Array of shared portfolio records
 */
export const fetchSharedPortfolios = async () => {
  const resp = await fetch(
    `${SUPABASE_URL}/rest/v1/shared_portfolios?select=*&order=created_at.desc`,
    { headers }
  );
  if (!resp.ok) throw new Error('Failed to fetch shared portfolios');
  return resp.json();
};

/**
 * Save a portfolio to Supabase for team sharing
 * @param {string} name - Portfolio name
 * @param {string} description - Portfolio description
 * @param {Object} data - Portfolio data
 * @returns {Promise<Object>} Created portfolio record
 */
export const saveSharedPortfolio = async (name, description, data) => {
  const resp = await fetch(
    `${SUPABASE_URL}/rest/v1/shared_portfolios`,
    {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        name,
        description,
        data_json: data,
        created_by: 'ford-scott-team'
      })
    }
  );
  if (!resp.ok) throw new Error('Failed to save portfolio');
  return resp.json();
};
