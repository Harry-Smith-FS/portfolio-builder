import { useState, useCallback, useMemo } from 'react';
import { calculateAccountTotals, getModelKey, getModelAllocations } from '../utils/calculations';

const createDefaultAccount = (id = 1) => ({
  id,
  name: `Account ${id}`,
  type: 'Accumulation',
  balance: 500000,
  riskProfile: 'Balanced',
  isESG: false,
  holdings: {}
});

export function usePortfolio(investmentsData = {}, modelsData = {}) {
  const [accounts, setAccounts] = useState([createDefaultAccount(1)]);
  const [customInvestments, setCustomInvestments] = useState({});
  const [merOverrides, setMerOverrides] = useState({});
  const [baseline, setBaseline] = useState(null);

  // Combine default investments with custom ones
  const allInvestments = useMemo(() => ({
    ...investmentsData,
    ...customInvestments
  }), [investmentsData, customInvestments]);

  // Calculate totals for each account
  const accountTotals = useMemo(() => {
    return accounts.map(account =>
      calculateAccountTotals(account, allInvestments, merOverrides)
    );
  }, [accounts, allInvestments, merOverrides]);

  // Calculate combined portfolio totals
  const combinedTotals = useMemo(() => {
    const totalBalance = accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0);
    const weightedMER = accountTotals.reduce((sum, totals, i) => {
      const weight = accounts[i].balance / totalBalance;
      return sum + (totals.weightedMER * weight);
    }, 0);
    const totalGrowth = accountTotals.reduce((sum, t) => sum + t.growthAmount, 0);
    const totalDefensive = accountTotals.reduce((sum, t) => sum + t.defensiveAmount, 0);

    return {
      totalBalance,
      weightedMER: isNaN(weightedMER) ? 0 : weightedMER,
      annualFees: totalBalance * (weightedMER / 100),
      growthPercent: totalBalance > 0 ? (totalGrowth / totalBalance) * 100 : 0,
      defensivePercent: totalBalance > 0 ? (totalDefensive / totalBalance) * 100 : 0
    };
  }, [accounts, accountTotals]);

  // Account operations
  const addAccount = useCallback(() => {
    const newId = Math.max(...accounts.map(a => a.id), 0) + 1;
    setAccounts(prev => [...prev, createDefaultAccount(newId)]);
  }, [accounts]);

  const updateAccount = useCallback((id, updates) => {
    setAccounts(prev => prev.map(acc =>
      acc.id === id ? { ...acc, ...updates } : acc
    ));
  }, []);

  const removeAccount = useCallback((id) => {
    if (accounts.length > 1) {
      setAccounts(prev => prev.filter(acc => acc.id !== id));
    }
  }, [accounts.length]);

  // Load model into account
  const loadModel = useCallback((accountId, modelName) => {
    const account = accounts.find(a => a.id === accountId);
    if (!account) return;

    const modelKey = getModelKey(account.balance, account.riskProfile, account.isESG);
    const allocations = getModelAllocations(modelKey, modelsData);

    if (allocations) {
      updateAccount(accountId, { holdings: { ...allocations } });
    }
  }, [accounts, modelsData, updateAccount]);

  // Update holding percentage
  const updateHolding = useCallback((accountId, investmentKey, percentage) => {
    const account = accounts.find(a => a.id === accountId);
    if (!account) return;

    const newHoldings = { ...account.holdings };
    if (percentage <= 0) {
      delete newHoldings[investmentKey];
    } else {
      newHoldings[investmentKey] = percentage;
    }
    updateAccount(accountId, { holdings: newHoldings });
  }, [accounts, updateAccount]);

  // Baseline operations
  const saveBaseline = useCallback(() => {
    setBaseline({
      accounts: JSON.parse(JSON.stringify(accounts)),
      timestamp: new Date().toISOString()
    });
  }, [accounts]);

  const restoreBaseline = useCallback(() => {
    if (baseline) {
      setAccounts(JSON.parse(JSON.stringify(baseline.accounts)));
    }
  }, [baseline]);

  const clearBaseline = useCallback(() => {
    setBaseline(null);
  }, []);

  // Reset portfolio
  const resetPortfolio = useCallback(() => {
    setAccounts([createDefaultAccount(1)]);
    setCustomInvestments({});
    setMerOverrides({});
    setBaseline(null);
  }, []);

  return {
    // State
    accounts,
    customInvestments,
    merOverrides,
    baseline,
    allInvestments,
    accountTotals,
    combinedTotals,

    // Account operations
    addAccount,
    updateAccount,
    removeAccount,
    loadModel,
    updateHolding,

    // Custom investments
    setCustomInvestments,
    addCustomInvestment: (key, investment) => {
      setCustomInvestments(prev => ({ ...prev, [key]: investment }));
    },

    // MER overrides
    setMerOverrides,
    setMerOverride: (key, value) => {
      setMerOverrides(prev => ({ ...prev, [key]: value }));
    },

    // Baseline operations
    saveBaseline,
    restoreBaseline,
    clearBaseline,
    hasBaseline: !!baseline,

    // Portfolio operations
    resetPortfolio,
    setAccounts
  };
}

export default usePortfolio;
