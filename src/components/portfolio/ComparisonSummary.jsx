import React from 'react';
import DeltaIndicator from './DeltaIndicator';
import { Icons } from '../common';

/**
 * ComparisonSummary Component
 * Banner showing portfolio comparison metrics
 * Displays side-by-side comparison of key metrics between current and baseline portfolios
 */
const ComparisonSummary = ({
  current = {},
  baseline = {},
  showLabels = true,
  compact = false,
}) => {
  const {
    totalAllocation: currentAlloc = 0,
    weightedMER: currentMER = 0,
    totalGrowth: currentGrowth = 0,
    totalDefensive: currentDefensive = 0,
    totalFees: currentFees = 0,
  } = current;

  const {
    totalAllocation: baselineAlloc = 0,
    weightedMER: baselineMER = 0,
    totalGrowth: baselineGrowth = 0,
    totalDefensive: baselineDefensive = 0,
    totalFees: baselineFees = 0,
  } = baseline;

  const formatPercent = (val) => `${(val || 0).toFixed(1)}%`;
  const formatMER = (mer) => `${((mer || 0) * 100).toFixed(2)}%`;
  const formatCurrency = (val) =>
    new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val || 0);

  if (compact) {
    return (
      <div className="bg-fs-teal-50 border border-fs-teal-200 rounded-lg p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-sm font-medium text-fs-slate-600 mb-2">Allocation</div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg font-bold text-fs-slate-800">{formatPercent(currentAlloc)}</span>
              <DeltaIndicator
                current={currentAlloc}
                baseline={baselineAlloc}
                format="percent"
                size="small"
                showIcon={true}
              />
            </div>
          </div>

          <div className="text-center">
            <div className="text-sm font-medium text-fs-slate-600 mb-2">MER</div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg font-bold text-fs-slate-800">{formatMER(currentMER)}</span>
              <DeltaIndicator
                current={currentMER * 100}
                baseline={baselineMER * 100}
                format="number"
                size="small"
                showIcon={true}
              />
            </div>
          </div>

          <div className="text-center">
            <div className="text-sm font-medium text-fs-slate-600 mb-2">Growth</div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg font-bold text-fs-slate-800">{formatPercent(currentGrowth)}</span>
              <DeltaIndicator
                current={currentGrowth}
                baseline={baselineGrowth}
                format="percent"
                size="small"
                showIcon={true}
              />
            </div>
          </div>

          <div className="text-center">
            <div className="text-sm font-medium text-fs-slate-600 mb-2">Defensive</div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg font-bold text-fs-slate-800">
                {formatPercent(currentDefensive)}
              </span>
              <DeltaIndicator
                current={currentDefensive}
                baseline={baselineDefensive}
                format="percent"
                size="small"
                showIcon={true}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-fs-teal-50 to-fs-teal-100 border border-fs-teal-200 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Icons.GitCompare />
        <h3 className="text-sm font-semibold text-fs-slate-800">Portfolio Comparison</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div>
          {showLabels && <div className="text-xs font-medium text-fs-slate-600 mb-2">Allocation</div>}
          <div className="space-y-1">
            <div className="text-sm font-semibold text-fs-slate-800">{formatPercent(currentAlloc)}</div>
            <div className="text-xs text-fs-slate-500">Current</div>
            <DeltaIndicator
              current={currentAlloc}
              baseline={baselineAlloc}
              format="percent"
              size="small"
              label="vs baseline"
            />
          </div>
        </div>

        <div>
          {showLabels && <div className="text-xs font-medium text-fs-slate-600 mb-2">MER</div>}
          <div className="space-y-1">
            <div className="text-sm font-semibold text-fs-slate-800">{formatMER(currentMER)}</div>
            <div className="text-xs text-fs-slate-500">Current</div>
            <DeltaIndicator
              current={currentMER * 100}
              baseline={baselineMER * 100}
              format="number"
              size="small"
              label="bps"
            />
          </div>
        </div>

        <div>
          {showLabels && <div className="text-xs font-medium text-fs-slate-600 mb-2">Growth</div>}
          <div className="space-y-1">
            <div className="text-sm font-semibold text-blue-600">{formatPercent(currentGrowth)}</div>
            <div className="text-xs text-fs-slate-500">Allocation</div>
            <DeltaIndicator
              current={currentGrowth}
              baseline={baselineGrowth}
              format="percent"
              size="small"
              label="change"
            />
          </div>
        </div>

        <div>
          {showLabels && <div className="text-xs font-medium text-fs-slate-600 mb-2">Defensive</div>}
          <div className="space-y-1">
            <div className="text-sm font-semibold text-purple-600">{formatPercent(currentDefensive)}</div>
            <div className="text-xs text-fs-slate-500">Allocation</div>
            <DeltaIndicator
              current={currentDefensive}
              baseline={baselineDefensive}
              format="percent"
              size="small"
              label="change"
            />
          </div>
        </div>

        <div>
          {showLabels && <div className="text-xs font-medium text-fs-slate-600 mb-2">Annual Fees</div>}
          <div className="space-y-1">
            <div className="text-sm font-semibold text-fs-slate-800">{formatCurrency(currentFees)}</div>
            <div className="text-xs text-fs-slate-500">Estimated</div>
            <DeltaIndicator
              current={currentFees}
              baseline={baselineFees}
              format="currency"
              size="small"
              label="change"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSummary;
