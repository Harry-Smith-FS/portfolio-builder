import React from 'react';

/**
 * Card container component with customizable header and footer
 * @param {React.ReactNode} children - Card content
 * @param {string} [title] - Optional card title
 * @param {React.ReactNode} [subtitle] - Optional subtitle under title
 * @param {React.ReactNode} [header] - Custom header content (overrides title)
 * @param {React.ReactNode} [footer] - Optional footer content
 * @param {string} [variant='default'] - Card style: 'default', 'outlined', 'elevated'
 * @param {string} [className] - Additional Tailwind classes
 * @param {object} [props] - Additional HTML attributes
 */
const Card = React.forwardRef(({
  children,
  title,
  subtitle,
  header,
  footer,
  variant = 'default',
  className = '',
  ...props
}, ref) => {
  const variantStyles = {
    default: 'bg-white rounded-xl shadow-sm border border-fs-slate-200',
    outlined: 'bg-fs-slate-50 rounded-xl border-2 border-fs-slate-200',
    elevated: 'bg-white rounded-xl shadow-lg border border-fs-slate-200',
  };

  const variantClass = variantStyles[variant] || variantStyles.default;

  return (
    <div
      ref={ref}
      className={`${variantClass} overflow-hidden ${className}`}
      {...props}
    >
      {header && (
        <div className="px-6 py-4 border-b border-fs-slate-200">
          {header}
        </div>
      )}

      {title && !header && (
        <div className="px-6 py-4 border-b border-fs-slate-200">
          <h3 className="text-lg font-semibold text-fs-slate-800 font-heading">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-fs-slate-500 mt-1">{subtitle}</p>
          )}
        </div>
      )}

      <div className="p-6">
        {children}
      </div>

      {footer && (
        <div className="px-6 py-4 border-t border-fs-slate-200 bg-fs-slate-50">
          {footer}
        </div>
      )}
    </div>
  );
});

Card.displayName = 'Card';

export { Card };
