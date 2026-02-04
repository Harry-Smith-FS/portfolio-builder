import React from 'react';

/**
 * Tooltip component that displays on hover
 * @param {React.ReactNode} children - Element to attach tooltip to
 * @param {string} content - Tooltip content text
 * @param {string} [position='top'] - Tooltip position: 'top', 'bottom', 'left', 'right'
 * @param {string} [variant='dark'] - Tooltip style: 'dark', 'light'
 * @param {number} [delay=200] - Delay before showing tooltip in ms
 * @param {string} [className] - Additional Tailwind classes for container
 */
const Tooltip = ({
  children,
  content,
  position = 'top',
  variant = 'dark',
  delay = 200,
  className = '',
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const timeoutRef = React.useRef(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent',
  };

  const variantStyles = {
    dark: {
      bg: 'bg-fs-slate-800',
      text: 'text-white',
      arrow: 'border-fs-slate-800',
    },
    light: {
      bg: 'bg-white',
      text: 'text-fs-slate-800',
      arrow: 'border-white',
    },
  };

  const styles = variantStyles[variant] || variantStyles.dark;

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {isVisible && (
        <div
          className={`
            absolute z-50 px-3 py-1.5 text-sm rounded-lg whitespace-nowrap
            pointer-events-none animate-fade-in
            ${positionClasses[position]}
            ${styles.bg}
            ${styles.text}
          `}
        >
          {content}
          <div
            className={`
              absolute w-0 h-0
              ${arrowClasses[position]}
              ${styles.arrow}
            `}
          />
        </div>
      )}
    </div>
  );
};

Tooltip.displayName = 'Tooltip';

export { Tooltip };
