import React from 'react';
import { Button } from '../common/Button';
import { Icons } from '../common/Icons';

/**
 * SharedPortfoliosModal - Lists shared portfolios with load/delete buttons
 * @param {boolean} isOpen - Whether the modal is visible
 * @param {Function} onClose - Callback to close the modal
 * @param {Array} portfolios - Array of portfolio objects
 * @param {Function} onLoad - Callback when loading a portfolio (receives portfolio object)
 * @param {Function} onDelete - Callback when deleting a portfolio (receives portfolio id)
 * @param {boolean} [isLoading] - Whether data is being loaded
 */
const SharedPortfoliosModal = ({
  isOpen,
  onClose,
  portfolios = [],
  onLoad,
  onDelete,
  isLoading = false,
}) => {
  const handleDelete = (id) => {
    if (confirm('Delete this portfolio? This action cannot be undone.')) {
      onDelete(id);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-auto">
        <div className="flex items-center justify-between mb-6 sticky top-0 bg-white">
          <div className="flex items-center gap-3">
            <div className="bg-fs-teal-100 p-2 rounded-lg">
              <Icons.FolderOpen />
            </div>
            <h3 className="text-lg font-semibold text-fs-slate-800">Load Portfolio</h3>
          </div>
          <button
            onClick={onClose}
            className="text-fs-slate-400 hover:text-fs-slate-600"
          >
            <Icons.X />
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-fs-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-sm text-fs-slate-500">Loading portfolios...</p>
            </div>
          </div>
        ) : portfolios.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-fs-slate-50 w-12 h-12 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <Icons.FolderOpen />
            </div>
            <p className="text-fs-slate-500 font-medium">No saved portfolios yet</p>
            <p className="text-xs text-fs-slate-400 mt-1">Save your first portfolio to get started</p>
          </div>
        ) : (
          <div className="space-y-2">
            {portfolios.map((portfolio) => (
              <div
                key={portfolio.id}
                className="flex items-start justify-between p-4 bg-fs-slate-50 rounded-lg hover:bg-fs-slate-100 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-fs-slate-800 truncate">
                    {portfolio.name}
                  </h4>
                  {portfolio.description && (
                    <p className="text-sm text-fs-slate-600 mt-1 line-clamp-2">
                      {portfolio.description}
                    </p>
                  )}
                  <p className="text-xs text-fs-slate-400 mt-2">
                    Saved {new Date(portfolio.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0 ml-4">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onLoad(portfolio)}
                    icon={<Icons.Refresh />}
                  >
                    Load
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(portfolio.id)}
                    icon={<Icons.Trash />}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end mt-6 sticky bottom-0 bg-white pt-4 border-t border-fs-slate-200">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export { SharedPortfoliosModal };
