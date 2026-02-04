import React from 'react';
import { Icons } from '../common';

/**
 * DeltaIndicator Component
 * Shows change between current and baseline values
 * Displays the difference with an up/down arrow and color coding
 */
const DeltaIndicator = ({
  current = 0,
  baseline = 0,
  label = 'Change',
  format = 'percent',
  size = 'default',
  showIcon = true,
  threshold = 0.01,
}) => {
  const delta = current - baseline;
  const deltaPercent = baseline !== 0 ? ((delta / baseline) * 100).toFixed(1) : 0;
  const isPositive = delta > threshold;
  const isNegative = delta < -threshold;
  const isNeutral = !isPositive && !isNegative;

  const formatValue = (value) => {
    if (format === 'percent') {
      return `${Math.abs(value).toFixed(1)}%`;
    } else if (format === 'currency') {
      return new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(Math.abs(value));
    } else if (format === 'number') {
      return Math.abs(value).toFixed(2);
    }
    return value;
  };

  const sizeClasses = {
    small: 'text-xs',
    default: 'text-sm',
    large: 'text-base',
  };

  const colorClasses = isPositive
    ? 'text-green-600 bg-green-50'
    : isNegative
      ? 'text-red-600 bg-red-50'
      : 'text-fs-slate-500 bg-fs-slate-50';

  const iconColorClass = isPositive
    ? 'text-green-600'
    : isNegative
      ? 'text-red-600'
      : 'text-fs-slate-400';

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md ${colorClasses} ${sizeClasses[size]}`}>
      {showIcon && (
        <span className={`flex-shrink-0 ${iconColorClass}`}>
          {isPositive && <Icons.ArrowUp />}
          {isNegative && <Icons.ArrowDown />}
          {isNeutral && <span className="text-xs">─</span>}
        </span>
      )}
      <span className="font-medium">{formatValue(delta)}</span>
      {label && <span className="text-xs opacity-75">{label}</span>}
    </div>
  );
};

export default DeltaIndicator;
