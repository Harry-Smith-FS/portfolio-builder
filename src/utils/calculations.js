/**
 * Portfolio calculation utilities
 */

import { INVESTMENTS, MODELS } from '../data';

/**
 * Determine the balance range tier for a given balance
 * @param {number} balance - Account balance in dollars
 * @returns {string} Balance range identifier
 */
export const getBalanceRange = (balance) => {
  if (balance < 350000) return "under350k";
  if (balance < 500000) return "350k-500k";
  if (balance < 750000) return "500k-750k";
  return "750k-plus";
};

/**
 * Build the model lookup key from account settings
 * @param {string} accountType - 'accumulation' or 'pension'
 * @param {string} balanceRange - Balance tier from getBalanceRange
 * @param {boolean} isESG - Whether ESG investing is preferred
 * @returns {string} Model key for MODELS lookup
 */
export const getModelKey = (accountType, balanceRange, isESG) =>
  `${accountType.toLowerCase()}-${balanceRange}${isESG ? "-esg" : "-standard"}`;

/**
 * Calculate portfolio totals including weighted MER and asset allocation
 * @param {Object} allocations - Investment allocations { name: percentage }
 * @param {number} balance - Account balance in dollars
 * @param {Object} customInvestments - Custom investments to merge with base
 * @param {Object} merOverrides - MER overrides { name: newMER }
 * @param {Object} baseInvestments - Base investments data (default: INVESTMENTS)
 * @returns {Object} Calculated totals
 */
export const calculateAccountTotals = (
  allocations,
  balance,
  customInvestments = {},
  merOverrides = {},
  baseInvestments = INVESTMENTS
) => {
  const allInvestments = { ...baseInvestments, ...customInvestments };
  let totalAllocation = 0;
  let weightedMER = 0;
  let totalGrowth = 0;
  let totalDefensive = 0;
  const assetClassBreakdown = {};

  Object.entries(allocations).forEach(([name, pct]) => {
    const inv = allInvestments[name];
    if (inv && pct > 0) {
      const effectiveMER = merOverrides[name] !== undefined ? merOverrides[name] : inv.mer;
      totalAllocation += pct;
      weightedMER += (pct / 100) * effectiveMER;
      totalGrowth += (pct / 100) * inv.growth;
      totalDefensive += (pct / 100) * inv.defensive;
      assetClassBreakdown[inv.assetClass] = (assetClassBreakdown[inv.assetClass] || 0) + pct;
    }
  });

  return {
    totalAllocation,
    weightedMER,
    totalGrowth: totalGrowth * 100,
    totalDefensive: totalDefensive * 100,
    totalFees: balance * weightedMER,
    assetClassBreakdown
  };
};

/**
 * Get model allocations for an account configuration
 * @param {string} accountType - 'accumulation' or 'pension'
 * @param {number} balance - Account balance in dollars
 * @param {boolean} isESG - Whether ESG investing is preferred
 * @param {string} riskProfile - Risk profile (conservative, balanced, growth, highGrowth)
 * @param {Object} baseModels - Models data (default: MODELS)
 * @returns {Object} Allocation percentages for the model
 */
export const getModelAllocations = (
  accountType,
  balance,
  isESG,
  riskProfile,
  baseModels = MODELS
) => {
  const model = baseModels[getModelKey(accountType, getBalanceRange(balance), isESG)];
  return model?.[riskProfile] ? { ...model[riskProfile] } : {};
};
