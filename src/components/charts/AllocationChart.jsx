import React from 'react';
import { ASSET_CLASS_COLORS } from '../../data/config';

/**
 * AllocationChart Component
 * Renders a pie/donut chart showing asset allocation distribution
 *
 * @param {Object} props
 * @param {Object} props.assetClassBreakdown - Asset class data { className: percentage }
 * @param {number} props.size - Chart size (width/height in pixels, default 300)
 * @param {boolean} props.showDonut - Show as donut (true) or pie (false, default)
 * @param {boolean} props.showLegend - Show legend below chart (default true)
 * @returns {JSX.Element} SVG pie/donut chart
 */
export const AllocationChart = ({
  assetClassBreakdown = {},
  size = 300,
  showDonut = true,
  showLegend = true
}) => {
  const radius = (size / 2) * 0.8;
  const innerRadius = showDonut ? radius * 0.6 : 0;
  const centerX = size / 2;
  const centerY = size / 2;

  // Convert percentages to values for arc calculation
  const items = Object.entries(assetClassBreakdown)
    .filter(([_, value]) => value > 0)
    .sort((a, b) => b[1] - a[1]);

  // Calculate start angles for each segment
  let currentAngle = -Math.PI / 2;
  const segments = items.map(([label, value]) => {
    const sliceAngle = (value / 100) * 2 * Math.PI;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;
    const midAngle = startAngle + sliceAngle / 2;

    // Calculate arc path
    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);

    const largeArc = sliceAngle > Math.PI ? 1 : 0;

    let path = `M ${centerX} ${centerY} L ${x1} ${y1}`;
    path += ` A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;

    if (innerRadius > 0) {
      const x3 = centerX + innerRadius * Math.cos(endAngle);
      const y3 = centerY + innerRadius * Math.sin(endAngle);
      const x4 = centerX + innerRadius * Math.cos(startAngle);
      const y4 = centerY + innerRadius * Math.sin(startAngle);
      path += ` L ${x3} ${y3}`;
      path += ` A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}`;
    }
    path += ' Z';

    const color = ASSET_CLASS_COLORS[label] || '#94a3b8';
    const segment = {
      label,
      value,
      path,
      color,
      startAngle,
      endAngle,
      midAngle
    };

    currentAngle = endAngle;
    return segment;
  });

  // Calculate label positions
  const labelSegments = segments.map(segment => {
    const labelRadius = innerRadius > 0
      ? (radius + innerRadius) / 2
      : radius * 0.7;
    const labelX = centerX + labelRadius * Math.cos(segment.midAngle);
    const labelY = centerY + labelRadius * Math.sin(segment.midAngle);

    return {
      ...segment,
      labelX,
      labelY
    };
  });

  const chartHeight = showLegend ? size + 60 : size;

  return (
    <div className="flex flex-col items-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="bg-white rounded-lg"
      >
        {/* Pie/Donut segments */}
        {labelSegments.map((segment, idx) => (
          <g key={`segment-${idx}`}>
            <path
              d={segment.path}
              fill={segment.color}
              opacity="0.9"
              className="hover:opacity-100 transition-opacity cursor-pointer"
            />
            {/* Labels inside segments */}
            {segment.value >= 8 && (
              <text
                x={segment.labelX}
                y={segment.labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-semibold text-white pointer-events-none"
                style={{
                  fontSize: '11px',
                  fontFamily: 'Inter, system-ui, sans-serif'
                }}
              >
                {segment.value.toFixed(1)}%
              </text>
            )}
          </g>
        ))}
      </svg>

      {/* Legend */}
      {showLegend && (
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          {labelSegments.map((segment, idx) => (
            <div key={`legend-${idx}`} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              <span className="text-fs-slate-600">
                {segment.label} ({segment.value.toFixed(1)}%)
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllocationChart;
