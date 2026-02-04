import React from 'react';
import { Icons } from '../common';

/**
 * GrowthDefensiveBar Component
 * Visual representation of growth vs defensive asset allocation
 * Displays stacked horizontal bar chart with percentages and interactive details
 */
const GrowthDefensiveBar = ({
  growth = 0,
  defensive = 0,
  label = 'Asset Allocation',
  detailed = false,
  showPercentages = true,
  colorScheme = 'default',
  height = 'h-3',
}) => {
  // Normalize to 100%
  const total = growth + defensive;
  const normalizedGrowth = total > 0 ? (growth / total) * 100 : 0;
  const normalizedDefensive = total > 0 ? (defensive / total) * 100 : 0;

  const colorSchemes = {
    default: {
      growth: 'bg-blue-500',
      defensive: 'bg-purple-500',
      growthLight: 'bg-blue-50',
      defensiveLight: 'bg-purple-50',
    },
    teal: {
      growth: 'bg-fs-teal-500',
      defensive: 'bg-fs-teal-300',
      growthLight: 'bg-fs-teal-50',
      defensiveLight: 'bg-fs-teal-100',
    },
    gradient: {
      growth: 'bg-gradient-to-r from-green-500 to-blue-500',
      defensive: 'bg-gradient-to-r from-orange-400 to-red-500',
      growthLight: 'from-green-50 to-blue-50',
      defensiveLight: 'from-orange-50 to-red-50',
    },
  };

  const colors = colorSchemes[colorScheme] || colorSchemes.default;

  if (detailed) {
    return (
      <div className="bg-white rounded-lg border border-fs-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Icons.TrendingUp />
          <h3 className="text-sm font-semibold text-fs-slate-800">{label}</h3>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Growth Section */}
          <div className={`p-4 rounded-lg ${colors.growthLight}`}>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${colors.growth}`} />
              <span className="text-xs font-medium text-fs-slate-700">Growth Assets</span>
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {normalizedGrowth.toFixed(1)}%
            </div>
            <p className="text-xs text-fs-slate-600">
              Higher growth potential, higher volatility
            </p>
          </div>

          {/* Defensive Section */}
          <div className={`p-4 rounded-lg ${colors.defensiveLight}`}>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${colors.defensive}`} />
              <span className="text-xs font-medium text-fs-slate-700">Defensive Assets</span>
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {normalizedDefensive.toFixed(1)}%
            </div>
            <p className="text-xs text-fs-slate-600">
              Capital preservation, lower volatility
            </p>
          </div>
        </div>

        {/* Detailed Bar */}
        <div>
          <div className="text-xs font-medium text-fs-slate-700 mb-3">Distribution</div>
          <div className="flex gap-2 h-8 bg-fs-slate-100 rounded-lg overflow-hidden mb-4">
            <div
              className={`${colors.growth} rounded-lg transition-all relative group`}
              style={{ width: `${normalizedGrowth}%` }}
            >
              {normalizedGrowth > 15 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {normalizedGrowth.toFixed(0)}%
                  </span>
                </div>
              )}
            </div>
            <div
              className={`${colors.defensive} rounded-lg transition-all relative group`}
              style={{ width: `${normalizedDefensive}%` }}
            >
              {normalizedDefensive > 15 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {normalizedDefensive.toFixed(0)}%
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="p-4 bg-fs-slate-50 rounded-lg border border-fs-slate-200">
          <p className="text-xs text-fs-slate-700 leading-relaxed">
            <strong>Profile:</strong>{' '}
            {normalizedGrowth < 30
              ? 'Conservative - prioritizes capital preservation with limited growth exposure.'
              : normalizedGrowth < 50
                ? 'Balanced - balanced approach between growth and stability.'
                : normalizedGrowth < 80
                  ? 'Growth - focuses on capital appreciation with moderate volatility.'
                  : 'High Growth - maximizes growth potential with higher volatility exposure.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {label && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-fs-slate-700">{label}</span>
          {showPercentages && (
            <span className="text-xs text-fs-slate-600">
              {normalizedGrowth.toFixed(1)}% / {normalizedDefensive.toFixed(1)}%
            </span>
          )}
        </div>
      )}

      {/* Stacked Bar */}
      <div className={`flex gap-0.5 bg-fs-slate-100 rounded-lg overflow-hidden ${height}`}>
        {normalizedGrowth > 0 && (
          <div
            className={`${colors.growth} rounded-l-lg transition-all relative`}
            style={{ width: `${normalizedGrowth}%` }}
            title={`Growth: ${normalizedGrowth.toFixed(1)}%`}
          />
        )}
        {normalizedDefensive > 0 && (
          <div
            className={`${colors.defensive} rounded-r-lg transition-all relative`}
            style={{ width: `${normalizedDefensive}%` }}
            title={`Defensive: ${normalizedDefensive.toFixed(1)}%`}
          />
        )}
      </div>

      {/* Legend */}
      {showPercentages && (
        <div className="flex gap-4 mt-2">
          <div className="flex items-center gap-2 text-xs text-fs-slate-600">
            <div className={`w-2.5 h-2.5 rounded-full ${colors.growth}`} />
            <span>Growth</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-fs-slate-600">
            <div className={`w-2.5 h-2.5 rounded-full ${colors.defensive}`} />
            <span>Defensive</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrowthDefensiveBar;
