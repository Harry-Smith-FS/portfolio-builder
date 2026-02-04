import React from 'react';

/**
 * Tabs component with tab switching functionality
 * @param {Array} tabs - Array of tab objects with id, label, and content properties
 * @param {string} [activeTab] - ID of the currently active tab
 * @param {Function} [onTabChange] - Callback when tab is changed
 * @param {string} [variant='default'] - Tab style: 'default', 'pills'
 * @param {string} [className] - Additional Tailwind classes
 * @param {object} [props] - Additional HTML attributes
 */
const Tabs = React.forwardRef(({
  tabs = [],
  activeTab,
  onTabChange,
  variant = 'default',
  className = '',
  ...props
}, ref) => {
  const [active, setActive] = React.useState(activeTab || tabs[0]?.id);

  const handleTabChange = (tabId) => {
    setActive(tabId);
    onTabChange?.(tabId);
  };

  const tabListVariants = {
    default: 'border-b border-fs-slate-200',
    pills: 'gap-2',
  };

  const tabButtonVariants = {
    default: {
      inactive: 'border-b-2 border-transparent text-fs-slate-600 hover:text-fs-slate-700 hover:border-fs-slate-300 pb-4',
      active: 'border-b-2 border-fs-teal-600 text-fs-teal-600 pb-4',
    },
    pills: {
      inactive: 'bg-fs-slate-100 text-fs-slate-600 hover:bg-fs-slate-200 rounded-full',
      active: 'bg-fs-teal-600 text-white rounded-full',
    },
  };

  const tabListClass = tabListVariants[variant] || tabListVariants.default;
  const tabVariant = tabButtonVariants[variant] || tabButtonVariants.default;

  return (
    <div ref={ref} className={className} {...props}>
      <div className={`flex ${tabListClass}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`
              px-4 py-2 font-medium text-sm transition-colors
              ${active === tab.id ? tabVariant.active : tabVariant.inactive}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {tabs.find((tab) => tab.id === active)?.content}
      </div>
    </div>
  );
});

Tabs.displayName = 'Tabs';

/**
 * TabPanel component for use with Tabs
 * @param {string} id - Unique identifier for the tab
 * @param {string} label - Display label for the tab
 * @param {React.ReactNode} children - Tab content
 */
const TabPanel = ({ id, label, children }) => {
  return { id, label, content: children };
};

TabPanel.displayName = 'TabPanel';

export { Tabs, TabPanel };
