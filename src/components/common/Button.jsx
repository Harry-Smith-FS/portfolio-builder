import React from 'react';

/**
 * Button component with multiple variants and sizes
 * @param {string} [variant='primary'] - Button style: 'primary', 'secondary', 'ghost', 'danger'
 * @param {string} [size='md'] - Button size: 'sm', 'md', 'lg'
 * @param {boolean} [disabled=false] - Whether button is disabled
 * @param {React.ReactNode} [icon] - Optional icon element to display
 * @param {React.ReactNode} children - Button content
 * @param {Function} [onClick] - Click handler
 * @param {string} [className] - Additional Tailwind classes
 * @param {object} [props] - Additional HTML button attributes
 */
const Button = React.forwardRef(({
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon = null,
  children,
  onClick,
  className = '',
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-fs-teal-600 text-white hover:bg-fs-teal-700 active:bg-fs-teal-800',
    secondary: 'bg-fs-slate-100 text-fs-slate-700 hover:bg-fs-slate-200 active:bg-fs-slate-300',
    ghost: 'text-fs-slate-600 hover:bg-fs-slate-100 active:bg-fs-slate-200',
    danger: 'bg-red-100 text-red-600 hover:bg-red-200 active:bg-red-300',
    success: 'bg-green-100 text-green-600 hover:bg-green-200 active:bg-green-300',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const variantClass = variantStyles[variant] || variantStyles.primary;
  const sizeClass = sizeStyles[size] || sizeStyles.md;

  return (
    <button
      ref={ref}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };
