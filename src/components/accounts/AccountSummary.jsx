/**
 * AccountSummary Component
 * Displays portfolio totals, MER, and asset allocation summary
 */

import React from 'react';
import { formatCurrency, formatPercent } from '../../utils/formatting';

export const AccountSummary = ({
  totalAllocation,
  portfolioMER,
  growthPercentage,
  defensivePercentage,
  assetClassBreakdown = {}
}) => {
  const isFullyAllocated = Math.abs(totalAllocation - 100) < 0.01;

  return (
    <div className="space-y-4">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-3 gap-4 p-4 bg-fs-slate-50 rounded-lg">
        <div className="text-center">
          <div className="text-2xl font-bold text-fs-teal-600 tabular-nums">
            {(portfolioMER * 100).toFixed(2)}%
          </div>
          <div className="text-xs text-fs-slate-500">Portfolio MER</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 tabular-nums">
            {growthPercentage.toFixed(1)}%
          </div>
          <div className="text-xs text-fs-slate-500">Growth</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600 tabular-nums">
            {defensivePercentage.toFixed(1)}%
          </div>
          <div className="text-xs text-fs-slate-500">Defensive</div>
        </div>
      </div>

      {/* Allocation Status */}
      <div className={`flex items-center justify-between p-3 rounded-lg font-medium ${
        isFullyAllocated ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
      }`}>
        <span>Total Allocation</span>
        <span className="tabular-nums font-bold">{totalAllocation.toFixed(2)}%</span>
      </div>

      {/* Asset Class Breakdown */}
      {Object.keys(assetClassBreakdown).length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-fs-slate-600 uppercase tracking-wide">
            Asset Class Breakdown
          </h4>
          <div className="space-y-1">
            {Object.entries(assetClassBreakdown)
              .sort(([, a], [, b]) => b - a)
              .map(([assetClass, percentage]) => (
                <div key={assetClass} className="flex justify-between items-center text-sm px-3 py-2 bg-fs-slate-50 rounded">
                  <span className="text-fs-slate-600">{assetClass}</span>
                  <span className="font-medium text-fs-slate-700 tabular-nums">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
