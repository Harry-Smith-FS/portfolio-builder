import React from 'react';

/**
 * Badge component for status indicators and labels
 * @param {React.ReactNode} children - Badge content
 * @param {string} [variant='default'] - Badge style: 'default', 'success', 'warning', 'danger', 'info', 'esg'
 * @param {string} [size='md'] - Badge size: 'sm', 'md', 'lg'
 * @param {React.ReactNode} [icon] - Optional icon to display before text
 * @param {string} [className] - Additional Tailwind classes
 * @param {object} [props] - Additional HTML attributes
 */
const Badge = React.forwardRef(({
  children,
  variant = 'default',
  size = 'md',
  icon = null,
  className = '',
  ...props
}, ref) => {
  const variantStyles = {
    default: 'bg-fs-slate-200 text-fs-slate-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-amber-100 text-amber-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
    esg: 'bg-green-500 text-white',
    teal: 'bg-fs-teal-100 text-fs-teal-700',
    gold: 'bg-fs-gold-400/20 text-fs-gold-600',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  const variantClass = variantStyles[variant] || variantStyles.default;
  const sizeClass = sizeStyles[size] || sizeStyles.md;

  return (
    <span
      ref={ref}
      className={`inline-flex items-center gap-1 font-medium rounded-full whitespace-nowrap ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';

export { Badge };
