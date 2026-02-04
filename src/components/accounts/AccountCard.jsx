/**
 * AccountCard Component
 * Main container for a single account with all its holdings and management
 */

import React from 'react';
import { AccountHeader } from './AccountHeader';
import { HoldingRow } from './HoldingRow';
import { AccountSummary } from './AccountSummary';
import { AccountActions } from './AccountActions';
import { calculateAccountTotals, getModelAllocations, getBalanceRange } from '../../utils/calculations';

export const AccountCard = ({
  account,
  onUpdate,
  onRemove,
  canRemove = true,
  investmentsData = {},
  modelsData = {}
}) => {
  // Calculate totals
  const totals = React.useMemo(() => {
    return calculateAccountTotals(account.allocations, account.balance, {}, {}, investmentsData);
  }, [account.allocations, account.balance, investmentsData]);

  // Sort allocations by percentage (descending)
  const sortedAllocations = React.useMemo(() => {
    return Object.entries(account.allocations).sort(([, a], [, b]) => b - a);
  }, [account.allocations]);

  // Get available investments not yet in this account
  const availableInvestments = React.useMemo(() => {
    return Object.keys(investmentsData).sort();
  }, [investmentsData]);

  // Get available risk profiles for this account type/balance
  const availableProfiles = React.useMemo(() => {
    const balanceRange = getBalanceRange(account.balance);
    const modelKey = `${account.accountType}-${balanceRange}${account.isESG ? '-esg' : '-standard'}`;
    const model = modelsData[modelKey];

    if (!model) {
      return ['conservative', 'balanced', 'growth', 'highGrowth'];
    }
    return Object.keys(model);
  }, [account.accountType, account.balance, account.isESG, modelsData]);

  // Load model allocations
  const loadModel = () => {
    const allocations = getModelAllocations(
      account.accountType,
      account.balance,
      account.isESG,
      account.riskProfile,
      modelsData
    );

    if (Object.keys(allocations).length > 0) {
      onUpdate({ ...account, allocations });
    }
  };

  // Handle investment addition
  const addInvestment = (name) => {
    if (name && !account.allocations[name]) {
      onUpdate({
        ...account,
        allocations: { ...account.allocations, [name]: 0 }
      });
    }
  };

  // Handle percentage update
  const updateAllocation = (name, value) => {
    onUpdate({
      ...account,
      allocations: { ...account.allocations, [name]: value }
    });
  };

  // Handle investment removal
  const removeInvestment = (name) => {
    const { [name]: _, ...rest } = account.allocations;
    onUpdate({ ...account, allocations: rest });
  };

  // Handle account field updates
  const handleUpdate = (field, value) => {
    onUpdate({ ...account, [field]: value });
  };

  // Validate available profiles
  React.useEffect(() => {
    if (!availableProfiles.includes(account.riskProfile)) {
      handleUpdate('riskProfile', availableProfiles[availableProfiles.length - 1]);
    }
  }, [availableProfiles, account.riskProfile]);

  const riskProfileLabels = {
    conservative: 'Conservative',
    balanced: 'Balanced',
    growth: 'Growth',
    highGrowth: 'High Growth'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-fs-slate-200 overflow-hidden animate-fade-in">
      {/* Header */}
      <AccountHeader
        name={account.name}
        accountType={account.accountType}
        isESG={account.isESG}
        onNameChange={(name) => handleUpdate('name', name)}
        onRemove={onRemove}
        canRemove={canRemove}
      />

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Account Settings Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-fs-slate-500 mb-1">
              Account Type
            </label>
            <select
              value={account.accountType}
              onChange={(e) => handleUpdate('accountType', e.target.value)}
              className="w-full border border-fs-slate-300 rounded-lg px-3 py-2 text-sm focus:border-fs-teal-500 focus:ring-1 focus:ring-fs-teal-500"
            >
              <option value="accumulation">Accumulation</option>
              <option value="pension">Pension</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-fs-slate-500 mb-1">
              Balance
            </label>
            <input
              type="number"
              value={account.balance}
              onChange={(e) => handleUpdate('balance', parseFloat(e.target.value) || 0)}
              className="w-full border border-fs-slate-300 rounded-lg px-3 py-2 text-sm focus:border-fs-teal-500 focus:ring-1 focus:ring-fs-teal-500 tabular-nums"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-fs-slate-500 mb-1">
              Risk Profile
            </label>
            <select
              value={account.riskProfile}
              onChange={(e) => handleUpdate('riskProfile', e.target.value)}
              className="w-full border border-fs-slate-300 rounded-lg px-3 py-2 text-sm focus:border-fs-teal-500 focus:ring-1 focus:ring-fs-teal-500"
            >
              {availableProfiles.map(profile => (
                <option key={profile} value={profile}>
                  {riskProfileLabels[profile] || profile}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={account.isESG}
                onChange={(e) => handleUpdate('isESG', e.target.checked)}
                className="w-4 h-4 text-fs-teal-600 rounded border-fs-slate-300 focus:ring-fs-teal-500"
              />
              <span className="text-sm text-fs-slate-600">ESG Focus</span>
            </label>
          </div>
        </div>

        {/* Summary Section */}
        <AccountSummary
          totalAllocation={totals.totalAllocation}
          portfolioMER={totals.weightedMER}
          growthPercentage={totals.totalGrowth}
          defensivePercentage={totals.totalDefensive}
          assetClassBreakdown={totals.assetClassBreakdown}
        />

        {/* Holdings List */}
        {sortedAllocations.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-fs-slate-600 uppercase tracking-wide px-3">
              Holdings ({sortedAllocations.length})
            </h3>
            <div className="space-y-2">
              {sortedAllocations.map(([name, percentage]) => {
                const investment = investmentsData[name];
                return (
                  <HoldingRow
                    key={name}
                    name={name}
                    percentage={percentage}
                    assetClass={investment?.assetClass || 'Unknown'}
                    mer={investment?.mer}
                    onUpdate={(value) => updateAllocation(name, value)}
                    onRemove={() => removeInvestment(name)}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <AccountActions
          availableInvestments={availableInvestments}
          currentAllocations={account.allocations}
          onAddInvestment={addInvestment}
          onLoadModel={loadModel}
          showAddButton={availableInvestments.length > Object.keys(account.allocations).length}
        />
      </div>
    </div>
  );
};
