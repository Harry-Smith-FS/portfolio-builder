import React from 'react';

/**
 * AllocationBar Component
 * Renders a horizontal stacked bar chart showing Growth vs Defensive allocation
 *
 * @param {Object} props
 * @param {number} props.growthPercent - Growth allocation percentage (0-100)
 * @param {number} props.defensivePercent - Defensive allocation percentage (0-100)
 * @param {boolean} props.showLabels - Show percentage labels (default true)
 * @param {string} props.height - Bar height class (default 'h-8')
 * @returns {JSX.Element} Horizontal stacked bar chart
 */
export const AllocationBar = ({
  growthPercent = 0,
  defensivePercent = 0,
  showLabels = true,
  height = 'h-8'
}) => {
  const total = growthPercent + defensivePercent || 100;
  const growthRatio = (growthPercent / total) * 100;
  const defensiveRatio = (defensivePercent / total) * 100;

  // Ensure percentages add up to 100
  const adjustedGrowth = (growthPercent / total) * 100;
  const adjustedDefensive = (defensivePercent / total) * 100;

  return (
    <div className="w-full">
      <svg
        width="100%"
        height="32"
        viewBox="0 0 100 32"
        preserveAspectRatio="none"
        className="w-full"
      >
        {/* Defensive segment */}
        {adjustedDefensive > 0 && (
          <>
            <rect
              x="0"
              y="4"
              width={adjustedDefensive}
              height="24"
              fill="#8b5cf6"
              opacity="0.9"
            />
            {showLabels && adjustedDefensive >= 15 && (
              <text
                x={adjustedDefensive / 2}
                y="20"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-semibold text-white"
                style={{
                  fontSize: '12px',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}
              >
                {adjustedDefensive.toFixed(1)}%
              </text>
            )}
          </>
        )}

        {/* Growth segment */}
        {adjustedGrowth > 0 && (
          <>
            <rect
              x={adjustedDefensive}
              y="4"
              width={adjustedGrowth}
              height="24"
              fill="#0891b2"
              opacity="0.9"
            />
            {showLabels && adjustedGrowth >= 15 && (
              <text
                x={adjustedDefensive + adjustedGrowth / 2}
                y="20"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-semibold text-white"
                style={{
                  fontSize: '12px',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}
              >
                {adjustedGrowth.toFixed(1)}%
              </text>
            )}
          </>
        )}
      </svg>

      {/* Legend */}
      <div className="flex gap-6 mt-3 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#0891b2' }} />
          <span className="text-fs-slate-600">Growth</span>
          <span className="font-semibold text-fs-slate-800">{adjustedGrowth.toFixed(1)}%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#8b5cf6' }} />
          <span className="text-fs-slate-600">Defensive</span>
          <span className="font-semibold text-fs-slate-800">{adjustedDefensive.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
};

export default AllocationBar;
