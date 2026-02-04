/**
 * AccountHeader Component
 * Displays account name, type, and ESG badge with remove button
 */

import React from 'react';
import { Icons } from '../common/Icons';

export const AccountHeader = ({
  name,
  accountType,
  isESG,
  onNameChange,
  onRemove,
  canRemove
}) => {
  const accountTypeLabel = accountType === 'accumulation' ? 'Accumulation' : 'Pension';

  return (
    <div className="bg-gradient-to-r from-fs-teal-600 to-fs-teal-700 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        {/* Account Name Input */}
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="bg-white/20 text-white placeholder-white/60 px-3 py-1.5 rounded-lg border border-white/30 font-heading font-semibold"
          placeholder="Account name"
        />

        {/* Account Type Badge */}
        <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full border border-white/30">
          {accountTypeLabel}
        </span>

        {/* ESG Badge */}
        {isESG && (
          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Icons.Leaf />
            ESG
          </span>
        )}
      </div>

      {/* Remove Button */}
      {canRemove && (
        <button
          onClick={onRemove}
          className="text-white/80 hover:text-white transition-smooth p-1"
          title="Remove account"
        >
          <Icons.X />
        </button>
      )}
    </div>
  );
};
