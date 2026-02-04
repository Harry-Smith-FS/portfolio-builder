/**
 * Ford Scott Portfolio Builder
 * Main Application Component - Integrated Version
 */

import React, { useState, useEffect } from 'react';
import { usePortfolio } from './hooks/usePortfolio';
import { useSupabase } from './hooks/useSupabase';
import { useLocalStorage } from './hooks/useLocalStorage';
import { AccountCard } from './components/accounts';
import { AllocationChart, AllocationBar } from './components/charts';
import { Button, Card, Input, Select, Badge, Tabs } from './components/common';
import { Icons } from './components/common';
import { ValidationWarnings, GrowthDefensiveBar } from './components/portfolio';
import { ShareToTeamModal, SharedPortfoliosModal, ExportDropdown } from './components/modals';
import { formatCurrency, formatPercent } from './utils';
import { INVESTMENTS, MODELS } from './data';

function App() {
  // Load data from Supabase
  const {
    investments,
    models,
    sharedPortfolios,
    loading: dataLoading,
    error: dataError,
    investmentCount,
    modelCount
  } = useSupabase();

  // Portfolio state management
  const {
    accounts,
    accountTotals,
    combinedTotals,
    addAccount,
    updateAccount,
    removeAccount,
    loadModel,
    updateHolding,
    baseline,
    saveBaseline,
    restoreBaseline,
    clearBaseline,
    hasBaseline,
    resetPortfolio
  } = usePortfolio(investments, models);

  // Local storage
  const { savedPortfolios, savePortfolio, loadPortfolio, deletePortfolio } = useLocalStorage();

  // Client details state
  const [clientName, setClientName] = useState('');
  const [platform, setPlatform] = useState('HUB24');
  const [transactionType, setTransactionType] = useState('Switch');
  const [priority, setPriority] = useState('Normal');
  const [notes, setNotes] = useState('');

  // UI state
  const [activeTab, setActiveTab] = useState('builder');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSharedPortfolios, setShowSharedPortfolios] = useState(false);

  // Loading state
  if (dataLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Icons.Refresh className="w-8 h-8 animate-spin text-fs-teal mx-auto mb-4" />
          <p className="text-gray-600">Loading portfolio data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Portfolio Builder</h1>
              <p className="text-sm text-gray-500">Ford Scott Financial Planning</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="success">
                {investmentCount} Investments
              </Badge>
              <Badge variant="info">
                {modelCount} Models
              </Badge>
              <ExportDropdown
                accounts={accounts}
                clientName={clientName}
                combinedTotals={combinedTotals}
              />
              <Button
                variant="primary"
                onClick={() => setShowShareModal(true)}
              >
                <Icons.Share className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Client Details */}
        <Card className="mb-6">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Client Details</h2>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              label="Client Name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Enter client name"
            />
            <Select
              label="Platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              options={[
                { value: 'HUB24', label: 'HUB24' },
                { value: 'Netwealth', label: 'Netwealth' },
                { value: 'BT Panorama', label: 'BT Panorama' },
                { value: 'Colonial First State', label: 'Colonial First State' }
              ]}
            />
            <Select
              label="Transaction Type"
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              options={[
                { value: 'Switch', label: 'Switch' },
                { value: 'New Investment', label: 'New Investment' },
                { value: 'Withdrawal', label: 'Withdrawal' },
                { value: 'Rebalance', label: 'Rebalance' }
              ]}
            />
            <Select
              label="Priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              options={[
                { value: 'Normal', label: 'Normal' },
                { value: 'Urgent', label: 'Urgent' },
                { value: 'Low', label: 'Low' }
              ]}
            />
          </div>
        </Card>

        {/* Portfolio Summary */}
        <Card className="mb-6">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Portfolio Summary</h2>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">Total Balance</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(combinedTotals.totalBalance)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Weighted MER</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatPercent(combinedTotals.weightedMER)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Annual Fees</p>
                <p className="text-2xl font-bold text-fs-gold">
                  {formatCurrency(combinedTotals.annualFees)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Growth</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatPercent(combinedTotals.growthPercent)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Defensive</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatPercent(combinedTotals.defensivePercent)}
                </p>
              </div>
            </div>
            <GrowthDefensiveBar
              growth={combinedTotals.growthPercent}
              defensive={combinedTotals.defensivePercent}
            />
          </div>
        </Card>

        {/* Baseline Actions */}
        {hasBaseline && (
          <Card className="mb-6 bg-amber-50 border-amber-200">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icons.AlertTriangle className="w-5 h-5 text-amber-600" />
                <span className="text-amber-800">Baseline snapshot saved</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={restoreBaseline}>
                  Restore
                </Button>
                <Button variant="ghost" size="sm" onClick={clearBaseline}>
                  Clear
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Accounts */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Accounts ({accounts.length})
          </h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={saveBaseline}>
              <Icons.Camera className="w-4 h-4 mr-2" />
              Snapshot
            </Button>
            <Button variant="primary" onClick={addAccount}>
              <Icons.Plus className="w-4 h-4 mr-2" />
              Add Account
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {accounts.map((account, index) => (
            <AccountCard
              key={account.id}
              account={account}
              totals={accountTotals[index]}
              investments={investments}
              models={models}
              onUpdate={(updates) => updateAccount(account.id, updates)}
              onRemove={() => removeAccount(account.id)}
              onLoadModel={() => loadModel(account.id)}
              onUpdateHolding={(key, value) => updateHolding(account.id, key, value)}
              canRemove={accounts.length > 1}
            />
          ))}
        </div>

        {/* Notes */}
        <Card className="mt-6">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Notes</h2>
          </div>
          <div className="p-4">
            <textarea
              className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-fs-teal focus:border-transparent"
              rows={3}
              placeholder="Add any notes about this portfolio..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </Card>
      </main>

      {/* Modals */}
      {showShareModal && (
        <ShareToTeamModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          portfolioData={{
            clientName,
            platform,
            transactionType,
            accounts,
            combinedTotals,
            notes
          }}
        />
      )}

      {showSharedPortfolios && (
        <SharedPortfoliosModal
          isOpen={showSharedPortfolios}
          onClose={() => setShowSharedPortfolios(false)}
          portfolios={sharedPortfolios}
        />
      )}
    </div>
  );
}

export default App;
