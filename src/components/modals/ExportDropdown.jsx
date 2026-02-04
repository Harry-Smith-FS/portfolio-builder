import React from 'react';
import { Button } from '../common/Button';
import { Icons } from '../common/Icons';

/**
 * ExportDropdown - Export format dropdown menu
 * @param {Function} [onExportCSV] - Callback for CSV export
 * @param {Function} [onExportJSON] - Callback for JSON export
 * @param {Function} [onExportPDF] - Callback for PDF export
 * @param {Function} [onExportExcel] - Callback for Excel export
 * @param {boolean} [isLoading] - Whether export is in progress
 */
const ExportDropdown = ({
  onExportCSV,
  onExportJSON,
  onExportPDF,
  onExportExcel,
  isLoading = false,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleExport = async (exportFn) => {
    if (exportFn) {
      setIsOpen(false);
      await exportFn();
    }
  };

  return (
    <div className="relative inline-block">
      <Button
        variant="secondary"
        icon={<Icons.Download />}
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
      >
        Export
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-fs-slate-200 z-40">
          <div className="py-1">
            {onExportCSV && (
              <button
                onClick={() => handleExport(onExportCSV)}
                disabled={isLoading}
                className="w-full px-4 py-2 text-left text-sm text-fs-slate-700 hover:bg-fs-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <Icons.Download />
                Export as CSV
              </button>
            )}

            {onExportJSON && (
              <button
                onClick={() => handleExport(onExportJSON)}
                disabled={isLoading}
                className="w-full px-4 py-2 text-left text-sm text-fs-slate-700 hover:bg-fs-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <Icons.Download />
                Export as JSON
              </button>
            )}

            {onExportExcel && (
              <button
                onClick={() => handleExport(onExportExcel)}
                disabled={isLoading}
                className="w-full px-4 py-2 text-left text-sm text-fs-slate-700 hover:bg-fs-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <Icons.Download />
                Export as Excel
              </button>
            )}

            {onExportPDF && (
              <button
                onClick={() => handleExport(onExportPDF)}
                disabled={isLoading}
                className="w-full px-4 py-2 text-left text-sm text-fs-slate-700 hover:bg-fs-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 border-t border-fs-slate-200"
              >
                <Icons.Download />
                Export as PDF
              </button>
            )}
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export { ExportDropdown };
