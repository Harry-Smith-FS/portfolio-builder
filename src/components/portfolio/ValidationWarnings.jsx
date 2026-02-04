import React from 'react';
import { Icons } from '../common';

/**
 * ValidationWarnings Component
 * Validation checklist for portfolio
 * Displays warnings and validation status for portfolio configuration
 */
const ValidationWarnings = ({
  allocations = {},
  targetAllocation = 100,
  merCap = 0.015,
  portfolioMER = 0,
  totalFees = 0,
  hasInvestments = false,
  minAllocationPerInvestment = 1,
  verbose = false,
}) => {
  const totalAllocation = Object.values(allocations).reduce((sum, val) => sum + val, 0);
  const allocationDiff = Math.abs(totalAllocation - targetAllocation);
  const investmentCount = Object.keys(allocations).filter(k => allocations[k] > 0).length;

  const warnings = [];
  const passes = [];

  // Validation checks
  if (!hasInvestments) {
    warnings.push({
      id: 'no-investments',
      type: 'error',
      message: 'No investments selected',
      description: 'Add at least one investment to the portfolio',
      icon: 'AlertTriangle',
    });
  } else {
    passes.push('Investments added');
  }

  if (allocationDiff > 0.5) {
    warnings.push({
      id: 'allocation-mismatch',
      type: 'error',
      message: `Allocation is ${totalAllocation.toFixed(1)}%, target is ${targetAllocation}%`,
      description: `Total allocation must equal ${targetAllocation}% to submit`,
      icon: 'AlertTriangle',
    });
  } else if (allocationDiff > 0.01) {
    warnings.push({
      id: 'allocation-minor',
      type: 'warning',
      message: `Allocation is ${totalAllocation.toFixed(2)}%, rounding may apply`,
      description: 'Minor discrepancy due to rounding',
      icon: 'AlertTriangle',
    });
  } else {
    passes.push(`Allocation correct (${totalAllocation.toFixed(1)}%)`);
  }

  if (portfolioMER > merCap) {
    warnings.push({
      id: 'high-mer',
      type: 'warning',
      message: `MER is ${(portfolioMER * 100).toFixed(2)}%, recommended maximum is ${(merCap * 100).toFixed(2)}%`,
      description: 'Consider allocating to lower-cost options',
      icon: 'AlertTriangle',
    });
  } else {
    passes.push(`MER within limits (${(portfolioMER * 100).toFixed(2)}%)`);
  }

  if (investmentCount > 0 && investmentCount < 2) {
    warnings.push({
      id: 'low-diversification',
      type: 'warning',
      message: `Only ${investmentCount} investment selected`,
      description: 'Consider adding multiple investments for better diversification',
      icon: 'Umbrella',
    });
  } else if (investmentCount > 0) {
    passes.push(`Diversification: ${investmentCount} investments`);
  }

  // Check for investments with zero allocation
  const zeroAllocations = Object.entries(allocations).filter(
    ([_, pct]) => pct === 0 || pct === '0'
  ).length;

  if (zeroAllocations > 0) {
    warnings.push({
      id: 'zero-allocations',
      type: 'info',
      message: `${zeroAllocations} investment(s) have 0% allocation`,
      description: 'Remove investments with no allocation to clean up the portfolio',
      icon: 'Check',
    });
  }

  const errorCount = warnings.filter(w => w.type === 'error').length;
  const warningCount = warnings.filter(w => w.type === 'warning').length;
  const infoCount = warnings.filter(w => w.type === 'info').length;
  const passCount = passes.length;

  const isValid = errorCount === 0 && allocationDiff < 0.5;

  if (!verbose) {
    // Compact mode - just show status badge
    if (errorCount > 0) {
      return (
        <div className="inline-flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg">
          <Icons.AlertTriangle />
          <span className="text-sm font-medium text-red-600">{errorCount} error{errorCount !== 1 ? 's' : ''}</span>
        </div>
      );
    }

    if (warningCount > 0) {
      return (
        <div className="inline-flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
          <Icons.AlertTriangle />
          <span className="text-sm font-medium text-amber-600">{warningCount} warning{warningCount !== 1 ? 's' : ''}</span>
        </div>
      );
    }

    return (
      <div className="inline-flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
        <Icons.Check />
        <span className="text-sm font-medium text-green-600">All checks passed</span>
      </div>
    );
  }

  // Detailed mode
  return (
    <div className="bg-white rounded-lg border border-fs-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isValid
                ? 'bg-green-100'
                : errorCount > 0
                  ? 'bg-red-100'
                  : 'bg-amber-100'
            }`}
          >
            {isValid ? (
              <Icons.Check />
            ) : (
              <Icons.AlertTriangle />
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-fs-slate-800">Portfolio Validation</h3>
            <p className="text-xs text-fs-slate-500">
              {isValid
                ? 'Portfolio ready to submit'
                : `${errorCount + warningCount} issue${errorCount + warningCount !== 1 ? 's' : ''} found`}
            </p>
          </div>
        </div>
        {!isValid && (
          <div className="flex gap-2">
            {errorCount > 0 && (
              <span className="px-2 py-1 text-xs font-medium rounded bg-red-100 text-red-600">
                {errorCount} error
              </span>
            )}
            {warningCount > 0 && (
              <span className="px-2 py-1 text-xs font-medium rounded bg-amber-100 text-amber-600">
                {warningCount} warning
              </span>
            )}
          </div>
        )}
      </div>

      {/* Errors */}
      {warnings.filter(w => w.type === 'error').length > 0 && (
        <div className="mb-4 space-y-2">
          <h4 className="text-xs font-semibold text-red-600 uppercase">Errors</h4>
          {warnings
            .filter(w => w.type === 'error')
            .map(warning => (
              <div
                key={warning.id}
                className="p-3 bg-red-50 border border-red-200 rounded-lg"
              >
                <div className="flex items-start gap-2">
                  <Icons.AlertTriangle />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-red-800">{warning.message}</p>
                    <p className="text-xs text-red-700 mt-1">{warning.description}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Warnings */}
      {warnings.filter(w => w.type === 'warning').length > 0 && (
        <div className="mb-4 space-y-2">
          <h4 className="text-xs font-semibold text-amber-600 uppercase">Warnings</h4>
          {warnings
            .filter(w => w.type === 'warning')
            .map(warning => (
              <div
                key={warning.id}
                className="p-3 bg-amber-50 border border-amber-200 rounded-lg"
              >
                <div className="flex items-start gap-2">
                  <Icons.AlertTriangle />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-amber-800">{warning.message}</p>
                    <p className="text-xs text-amber-700 mt-1">{warning.description}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Info Messages */}
      {warnings.filter(w => w.type === 'info').length > 0 && (
        <div className="mb-4 space-y-2">
          <h4 className="text-xs font-semibold text-fs-slate-600 uppercase">Notes</h4>
          {warnings
            .filter(w => w.type === 'info')
            .map(warning => (
              <div
                key={warning.id}
                className="p-3 bg-fs-slate-50 border border-fs-slate-200 rounded-lg"
              >
                <div className="flex items-start gap-2">
                  <Icons.Check />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-fs-slate-700">{warning.message}</p>
                    <p className="text-xs text-fs-slate-600 mt-1">{warning.description}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Passed Checks */}
      {passCount > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-green-600 uppercase">Passed Checks</h4>
          <div className="grid grid-cols-2 gap-2">
            {passes.map((pass, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 p-2 bg-green-50 rounded-lg text-xs text-green-700"
              >
                <Icons.Check />
                <span>{pass}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ValidationWarnings;
