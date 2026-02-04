import React from 'react';
import { Button } from '../common/Button';
import { Icons } from '../common/Icons';

/**
 * InvestmentComparisonModal - Compare current vs baseline investments
 * @param {boolean} isOpen - Whether the modal is visible
 * @param {Function} onClose - Callback to close the modal
 * @param {object} [currentData] - Current investment data
 * @param {object} [baselineData] - Baseline/model investment data
 * @param {string} [title] - Modal title
 */
const InvestmentComparisonModal = ({
  isOpen,
  onClose,
  currentData = {},
  baselineData = {},
  title = 'Compare Allocations',
}) => {
  const formatPercent = (val) => `${(val || 0).toFixed(1)}%`;
  const formatMER = (mer) => `${((mer || 0) * 100).toFixed(2)}%`;

  const allInvestments = Array.from(
    new Set([
      ...Object.keys(currentData),
      ...Object.keys(baselineData),
    ])
  ).sort();

  const calculateDifference = (investment) => {
    const current = currentData[investment] || 0;
    const baseline = baselineData[investment] || 0;
    return current - baseline;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-auto">
        <div className="flex items-center justify-between mb-6 sticky top-0 bg-white">
          <div className="flex items-center gap-3">
            <div className="bg-fs-teal-100 p-2 rounded-lg">
              <Icons.GitCompare />
            </div>
            <h3 className="text-lg font-semibold text-fs-slate-800">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-fs-slate-400 hover:text-fs-slate-600"
          >
            <Icons.X />
          </button>
        </div>

        <div className="mb-6 p-4 bg-fs-slate-50 rounded-lg border border-fs-slate-200">
          <div className="flex items-center justify-between text-sm text-fs-slate-600">
            <span>Total Current: {Object.values(currentData).reduce((a, b) => a + b, 0).toFixed(1)}%</span>
            <span>Total Baseline: {Object.values(baselineData).reduce((a, b) => a + b, 0).toFixed(1)}%</span>
          </div>
        </div>

        {allInvestments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-fs-slate-500">No investments to compare</p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="grid grid-cols-12 gap-2 px-2 py-2 bg-fs-slate-100 rounded-lg font-medium text-xs text-fs-slate-600 sticky top-20">
              <div className="col-span-5">Investment</div>
              <div className="col-span-2 text-right">Current</div>
              <div className="col-span-2 text-right">Baseline</div>
              <div className="col-span-3 text-right">Difference</div>
            </div>

            {allInvestments.map((investment) => {
              const current = currentData[investment] || 0;
              const baseline = baselineData[investment] || 0;
              const diff = calculateDifference(investment);
              const diffColor =
                Math.abs(diff) < 0.01
                  ? 'text-fs-slate-600'
                  : diff > 0
                    ? 'text-blue-600'
                    : 'text-orange-600';

              return (
                <div
                  key={investment}
                  className="grid grid-cols-12 gap-2 px-2 py-3 bg-fs-slate-50 rounded-lg items-center border border-fs-slate-200"
                >
                  <div className="col-span-5">
                    <p className="text-sm font-medium text-fs-slate-800 truncate" title={investment}>
                      {investment}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-fs-slate-700 text-right tabular-nums">
                      {formatPercent(current)}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-fs-slate-700 text-right tabular-nums">
                      {formatPercent(baseline)}
                    </p>
                  </div>
                  <div className={`col-span-3 text-right tabular-nums font-medium ${diffColor}`}>
                    <p className="text-sm">
                      {diff > 0 ? '+' : ''}{formatPercent(diff)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex justify-end mt-6 sticky bottom-0 bg-white pt-4 border-t border-fs-slate-200">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export { InvestmentComparisonModal };
