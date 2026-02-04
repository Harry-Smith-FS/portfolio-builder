/**
 * HoldingRow Component
 * Displays a single investment holding with asset class indicator and edit/delete actions
 */

import React from 'react';
import { Icons } from '../common/Icons';
import { ASSET_CLASS_COLORS } from '../../data/constants';

export const HoldingRow = ({
  name,
  percentage,
  assetClass,
  mer,
  onUpdate,
  onRemove
}) => {
  const handlePercentageChange = (e) => {
    const value = Math.max(0, Math.min(100, parseFloat(e.target.value) || 0));
    onUpdate(value);
  };

  const dotColor = ASSET_CLASS_COLORS[assetClass] || '#94a3b8';

  return (
    <div className="flex items-center gap-3 p-3 bg-fs-slate-50 rounded-lg hover:bg-fs-slate-100 transition-smooth">
      {/* Asset Class Indicator */}
      <div
        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: dotColor }}
        title={assetClass}
      />

      {/* Investment Details */}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-fs-slate-700 truncate">
          {name}
        </div>
        <div className="text-xs text-fs-slate-500 flex gap-2">
          <span>{assetClass}</span>
          {mer !== undefined && <span>• MER: {(mer * 100).toFixed(2)}%</span>}
        </div>
      </div>

      {/* Percentage Display */}
      <div className="text-sm text-fs-slate-500 tabular-nums min-w-12 text-right">
        {percentage.toFixed(2)}%
      </div>

      {/* Percentage Input */}
      <input
        type="number"
        value={percentage}
        onChange={handlePercentageChange}
        className="w-20 border border-fs-slate-300 rounded px-2 py-1 text-sm text-right tabular-nums focus:border-fs-teal-500 focus:ring-1 focus:ring-fs-teal-500"
        step="0.5"
        min="0"
        max="100"
      />

      {/* Remove Button */}
      <button
        onClick={onRemove}
        className="text-fs-slate-400 hover:text-red-500 transition-smooth p-1"
        title="Remove investment"
      >
        <Icons.Trash />
      </button>
    </div>
  );
};
