/**
 * AccountActions Component
 * Displays buttons for adding investments, loading models, and other account operations
 */

import React from 'react';
import { Icons } from '../common/Icons';

export const AccountActions = ({
  availableInvestments,
  currentAllocations,
  onAddInvestment,
  onLoadModel,
  showAddButton = true
}) => {
  const [selectedInvestment, setSelectedInvestment] = React.useState('');

  const handleAddInvestment = () => {
    if (selectedInvestment) {
      onAddInvestment(selectedInvestment);
      setSelectedInvestment('');
    }
  };

  const unallocatedInvestments = availableInvestments.filter(
    name => !currentAllocations[name]
  );

  return (
    <div className="space-y-3">
      {/* Load Model Button */}
      <button
        onClick={onLoadModel}
        className="flex items-center gap-2 px-4 py-2 bg-fs-teal-600 text-white rounded-lg hover:bg-fs-teal-700 transition-smooth text-sm font-medium w-full justify-center"
      >
        <Icons.Refresh />
        Load Model
      </button>

      {/* Add Investment Section */}
      {showAddButton && (
        <div className="flex gap-2">
          <select
            value={selectedInvestment}
            onChange={(e) => setSelectedInvestment(e.target.value)}
            className="flex-1 border border-fs-slate-300 rounded-lg px-3 py-2 text-sm focus:border-fs-teal-500 focus:ring-1 focus:ring-fs-teal-500"
          >
            <option value="" disabled>
              Add investment...
            </option>
            {unallocatedInvestments.map(name => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddInvestment}
            disabled={!selectedInvestment}
            className="px-4 py-2 bg-fs-teal-600 text-white rounded-lg hover:bg-fs-teal-700 disabled:bg-fs-slate-300 disabled:cursor-not-allowed transition-smooth text-sm font-medium flex items-center gap-2"
          >
            <Icons.Plus />
            Add
          </button>
        </div>
      )}
    </div>
  );
};
