/**
 * Ford Scott Portfolio Builder
 * Main Application Component
 *
 * This is a placeholder during migration. Features will be progressively
 * extracted from the monolithic index.html into this modular structure.
 */

import React from 'react';
import { Icons } from './components/common';
import {
  INVESTMENTS,
  MODELS,
  ASSET_CLASS_COLORS,
  RISK_PROFILE_RANGES
} from './data';
import {
  formatCurrency,
  formatPercent,
  getBalanceRange,
  calculateAccountTotals
} from './utils';
import {
  fetchInvestments,
  fetchModels,
  fetchSharedPortfolios
} from './api/supabase';

function App() {
  const [investmentsData, setInvestmentsData] = React.useState(INVESTMENTS);
  const [modelsData, setModelsData] = React.useState(MODELS);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // Load data from Supabase on mount
  React.useEffect(() => {
    const loadData = async () => {
      try {
        const [investments, models] = await Promise.all([
          fetchInvestments(),
          fetchModels()
        ]);

        // Transform investments array to object format
        const invData = investments.reduce((acc, row) => {
          acc[row.name] = {
            mer: row.mer,
            growth: row.growth,
            defensive: row.defensive,
            assetClass: row.asset_class
          };
          return acc;
        }, {});
        setInvestmentsData(invData);

        // Transform models array to object format
        const modData = models.reduce((acc, row) => {
          acc[row.model_key] = row.allocations;
          return acc;
        }, {});
        setModelsData(modData);

        console.log('✅ Loaded', Object.keys(invData).length, 'investments and', Object.keys(modData).length, 'models from Supabase');
      } catch (err) {
        console.error('⚠️ Error loading from Supabase, using defaults:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Example calculation using extracted utilities
  const exampleTotals = React.useMemo(() => {
    const exampleAllocations = {
      "LONSEC LISTED MANAGED PORTFOLIO - BALANCED": 60,
      "DNR CAPITAL AUSTRALIAN EQUITIES HIGH CONVICTION PORTFOLIO": 15,
      "Aoris International Fund (BAOR)": 10,
      "Macquarie Dynamic Bond Fund": 10,
      "CASH": 5
    };
    return calculateAccountTotals(exampleAllocations, 500000, {}, {}, investmentsData);
  }, [investmentsData]);

  return (
    <div className="min-h-screen bg-fs-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-fs-slate-200 sticky top-0 z-50">
        <div className="border-t-4 border-fs-teal-600"></div>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-2xl font-bold text-fs-slate-800">
                Portfolio Builder
              </h1>
              <p className="text-fs-slate-500 text-sm">
                Ford Scott Financial Planning — Modular Version
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                Phase 1 Complete
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Status Banner */}
        <div className="bg-gradient-to-r from-fs-teal-700 to-fs-teal-800 rounded-xl shadow-lg p-6 mb-6 text-white">
          <h2 className="font-heading text-xl font-semibold mb-4 flex items-center gap-2">
            <Icons.ShieldCheck /> Migration Status
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-fs-teal-200 text-xs uppercase mb-1">Data Files</p>
              <p className="text-2xl font-bold">✅ 4</p>
              <p className="text-xs text-white/70">investments, models, config, index</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-fs-teal-200 text-xs uppercase mb-1">Utilities</p>
              <p className="text-2xl font-bold">✅ 4</p>
              <p className="text-xs text-white/70">formatting, calculations, storage, index</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-fs-teal-200 text-xs uppercase mb-1">API</p>
              <p className="text-2xl font-bold">✅ 1</p>
              <p className="text-xs text-white/70">supabase client</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-fs-teal-200 text-xs uppercase mb-1">Components</p>
              <p className="text-2xl font-bold">✅ 1</p>
              <p className="text-xs text-white/70">Icons (19 icons)</p>
            </div>
          </div>
        </div>

        {/* Data Loading Status */}
        <div className="bg-white rounded-xl shadow-sm border border-fs-slate-200 p-6 mb-6">
          <h3 className="font-heading font-semibold text-fs-slate-800 mb-4 flex items-center gap-2">
            <Icons.Refresh className={loading ? 'animate-spin' : ''} />
            Supabase Connection
          </h3>
          {loading ? (
            <p className="text-fs-slate-500">Loading data from Supabase...</p>
          ) : error ? (
            <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <Icons.AlertTriangle className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-800 font-medium">Using fallback data</p>
                <p className="text-amber-600 text-sm">{error}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <Icons.Check className="text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-emerald-800 font-medium">Connected successfully</p>
                <p className="text-emerald-600 text-sm">
                  Loaded {Object.keys(investmentsData).length} investments and {Object.keys(modelsData).length} models
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Example Calculations */}
        <div className="bg-white rounded-xl shadow-sm border border-fs-slate-200 p-6 mb-6">
          <h3 className="font-heading font-semibold text-fs-slate-800 mb-4 flex items-center gap-2">
            <Icons.TrendingUp /> Example Calculation (Utilities Working)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <p className="text-fs-slate-500 text-xs uppercase mb-1">Balance</p>
              <p className="text-lg font-semibold text-fs-slate-800">{formatCurrency(500000)}</p>
            </div>
            <div>
              <p className="text-fs-slate-500 text-xs uppercase mb-1">Allocation</p>
              <p className="text-lg font-semibold text-fs-slate-800">{exampleTotals.totalAllocation.toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-fs-slate-500 text-xs uppercase mb-1">Growth</p>
              <p className="text-lg font-semibold text-fs-teal-700">{exampleTotals.totalGrowth.toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-fs-slate-500 text-xs uppercase mb-1">Weighted MER</p>
              <p className="text-lg font-semibold text-fs-slate-800">{formatPercent(exampleTotals.weightedMER)}</p>
            </div>
            <div>
              <p className="text-fs-slate-500 text-xs uppercase mb-1">Annual Fees</p>
              <p className="text-lg font-semibold text-fs-gold-600">{formatCurrency(exampleTotals.totalFees)}</p>
            </div>
          </div>
        </div>

        {/* Icons Demo */}
        <div className="bg-white rounded-xl shadow-sm border border-fs-slate-200 p-6 mb-6">
          <h3 className="font-heading font-semibold text-fs-slate-800 mb-4">
            Extracted Icons (19 total)
          </h3>
          <div className="flex flex-wrap gap-4">
            {Object.entries(Icons).map(([name, Icon]) => (
              <div key={name} className="flex items-center gap-2 px-3 py-2 bg-fs-slate-50 rounded-lg">
                <Icon />
                <span className="text-xs text-fs-slate-600">{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Asset Class Colors */}
        <div className="bg-white rounded-xl shadow-sm border border-fs-slate-200 p-6 mb-6">
          <h3 className="font-heading font-semibold text-fs-slate-800 mb-4">
            Asset Class Colors (from config)
          </h3>
          <div className="flex flex-wrap gap-3">
            {Object.entries(ASSET_CLASS_COLORS).map(([name, color]) => (
              <div key={name} className="flex items-center gap-2 px-3 py-2 bg-fs-slate-50 rounded-lg">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: color }}
                ></div>
                <span className="text-xs text-fs-slate-600">{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
          <h3 className="font-heading font-semibold text-indigo-800 mb-3 flex items-center gap-2">
            <Icons.GitCompare /> Next Steps (Phase 2)
          </h3>
          <ul className="space-y-2 text-indigo-700">
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-indigo-200 flex items-center justify-center text-xs">1</span>
              Extract chart components (DonutChart, GrowthDefensiveBar, VolatilityMeter)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-indigo-200 flex items-center justify-center text-xs">2</span>
              Extract modal components (CustomInvestmentModal, ShareToTeamModal, etc.)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-indigo-200 flex items-center justify-center text-xs">3</span>
              Extract AccountPanel (largest component)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-indigo-200 flex items-center justify-center text-xs">4</span>
              Migrate full App logic with hooks
            </li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-fs-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-fs-slate-400 text-sm">
            Ford Scott Portfolio Builder v16.0.0 (Modular) • February 2026
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
