import React from 'react';
import { Icons } from '../common';

/**
 * VolatilityMeter Component
 * Shows expected volatility based on growth allocation
 * Displays a visual meter with risk level indicator
 */
const VolatilityMeter = ({
  growthAllocation = 0,
  defensiveAllocation = 0,
  showLabel = true,
  detailed = false,
}) => {
  // Normalize to ensure they add up to 100
  const total = growthAllocation + defensiveAllocation;
  const normalizedGrowth = total > 0 ? (growthAllocation / total) * 100 : 0;
  const normalizedDefensive = total > 0 ? (defensiveAllocation / total) * 100 : 0;

  // Determine risk level based on growth allocation
  const getRiskLevel = () => {
    if (normalizedGrowth < 30) return { level: 'Conservative', color: 'bg-green-500', textColor: 'text-green-600' };
    if (normalizedGrowth < 50) return { level: 'Balanced', color: 'bg-blue-500', textColor: 'text-blue-600' };
    if (normalizedGrowth < 80) return { level: 'Growth', color: 'bg-orange-500', textColor: 'text-orange-600' };
    return { level: 'High Growth', color: 'bg-red-500', textColor: 'text-red-600' };
  };

  const riskInfo = getRiskLevel();

  // Calculate volatility score (simplified: 1-10 scale based on growth allocation)
  const volatilityScore = Math.round((normalizedGrowth / 100) * 10) || 1;

  if (detailed) {
    return (
      <div className="bg-white rounded-lg border border-fs-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Icons.Umbrella />
            <h3 className="text-sm font-semibold text-fs-slate-800">Volatility Profile</h3>
          </div>
          <span className={`text-lg font-bold ${riskInfo.textColor}`}>{riskInfo.level}</span>
        </div>

        <div className="space-y-4">
          {/* Growth/Defensive Split */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-fs-slate-600">Asset Allocation Split</span>
              <span className="text-xs text-fs-slate-500">
                {normalizedGrowth.toFixed(1)}% / {normalizedDefensive.toFixed(1)}%
              </span>
            </div>
            <div className="flex gap-1 h-3 bg-fs-slate-100 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 rounded-full transition-all"
                style={{ width: `${normalizedGrowth}%` }}
              />
              <div className="bg-purple-500 rounded-full" style={{ width: `${normalizedDefensive}%` }} />
            </div>
          </div>

          {/* Volatility Meter */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-fs-slate-600">Expected Volatility</span>
              <span className="text-xs font-bold text-fs-slate-800">{volatilityScore} / 10</span>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-2 rounded-sm transition-all ${
                    i < volatilityScore
                      ? riskInfo.color
                      : 'bg-fs-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Risk Assessment */}
          <div className={`p-3 rounded-lg ${
            volatilityScore <= 3
              ? 'bg-green-50 border border-green-200'
              : volatilityScore <= 6
                ? 'bg-blue-50 border border-blue-200'
                : volatilityScore <= 8
                  ? 'bg-orange-50 border border-orange-200'
                  : 'bg-red-50 border border-red-200'
          }`}>
            <p className="text-xs text-fs-slate-700">
              {volatilityScore <= 3 &&
                'Low volatility profile. Suitable for conservative investors prioritizing capital preservation.'}
              {volatilityScore > 3 && volatilityScore <= 6 &&
                'Moderate volatility profile. Balanced approach suitable for medium-term investors.'}
              {volatilityScore > 6 && volatilityScore <= 8 &&
                'Higher volatility profile. Growth-focused suitable for investors with longer time horizons.'}
              {volatilityScore > 8 &&
                'High volatility profile. Aggressive growth focus suitable for experienced investors with high risk tolerance.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-fs-slate-50 rounded-lg border border-fs-slate-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icons.Umbrella />
          <span className="text-xs font-semibold text-fs-slate-600">Volatility</span>
        </div>
        <span className={`text-sm font-bold ${riskInfo.textColor}`}>{riskInfo.level}</span>
      </div>

      {/* Quick Meter */}
      <div className="flex gap-1 mb-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-1.5 rounded-sm ${
              i < volatilityScore
                ? riskInfo.color
                : 'bg-fs-slate-200'
            }`}
          />
        ))}
      </div>

      {/* Score and Split */}
      <div className="flex justify-between text-xs text-fs-slate-600">
        <span>
          {volatilityScore}/10
        </span>
        <span>
          Growth {normalizedGrowth.toFixed(0)}% • Defensive {normalizedDefensive.toFixed(0)}%
        </span>
      </div>
    </div>
  );
};

export default VolatilityMeter;
