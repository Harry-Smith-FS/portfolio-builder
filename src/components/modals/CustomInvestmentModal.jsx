import React from 'react';
import { Input, Textarea, Select, Checkbox } from '../common/Input';
import { Button } from '../common/Button';
import { Icons } from '../common/Icons';

const ASSET_CLASSES = [
  { value: 'DIVERSIFIED', label: 'Diversified' },
  { value: 'AUSTRALIAN_EQUITIES', label: 'Australian Equities' },
  { value: 'GLOBAL_EQUITIES', label: 'Global Equities' },
  { value: 'FIXED_INCOME', label: 'Fixed Income' },
  { value: 'CASH', label: 'Cash' },
  { value: 'TERM_DEPOSIT', label: 'Term Deposit' },
  { value: 'PROPERTY', label: 'Property' },
  { value: 'ALTERNATIVES', label: 'Alternatives' },
];

/**
 * CustomInvestmentModal - Form to add custom investments
 * @param {boolean} isOpen - Whether the modal is visible
 * @param {Function} onClose - Callback to close the modal
 * @param {Function} onAdd - Callback when investment is added (receives investment object)
 * @param {boolean} [isLoading] - Whether add operation is in progress
 */
const CustomInvestmentModal = ({
  isOpen,
  onClose,
  onAdd,
  isLoading = false,
}) => {
  const [formData, setFormData] = React.useState({
    name: '',
    mer: '',
    growth: '',
    defensive: '',
    assetClass: 'DIVERSIFIED',
    description: '',
  });
  const [errors, setErrors] = React.useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Investment name is required';
    }

    const mer = parseFloat(formData.mer);
    if (formData.mer && (isNaN(mer) || mer < 0 || mer > 1)) {
      newErrors.mer = 'MER must be between 0 and 1 (as decimal)';
    }

    const growth = parseFloat(formData.growth);
    if (formData.growth && (isNaN(growth) || growth < 0 || growth > 1)) {
      newErrors.growth = 'Growth must be between 0 and 1';
    }

    const defensive = parseFloat(formData.defensive);
    if (formData.defensive && (isNaN(defensive) || defensive < 0 || defensive > 1)) {
      newErrors.defensive = 'Defensive must be between 0 and 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = async () => {
    if (validateForm()) {
      await onAdd({
        name: formData.name.trim(),
        mer: parseFloat(formData.mer) || 0,
        growth: parseFloat(formData.growth) || 0,
        defensive: parseFloat(formData.defensive) || 0,
        assetClass: formData.assetClass,
        description: formData.description.trim(),
      });
      setFormData({
        name: '',
        mer: '',
        growth: '',
        defensive: '',
        assetClass: 'DIVERSIFIED',
        description: '',
      });
      setErrors({});
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      mer: '',
      growth: '',
      defensive: '',
      assetClass: 'DIVERSIFIED',
      description: '',
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md max-h-[90vh] overflow-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-fs-teal-100 p-2 rounded-lg">
            <Icons.Plus />
          </div>
          <h3 className="text-lg font-semibold text-fs-slate-800">Add Custom Investment</h3>
        </div>

        <div className="space-y-4 mb-6">
          <Input
            label="Investment Name"
            placeholder="e.g., My Custom Fund"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: '' });
            }}
            error={errors.name}
            required
          />

          <Select
            label="Asset Class"
            value={formData.assetClass}
            onChange={(e) => setFormData({ ...formData, assetClass: e.target.value })}
            options={ASSET_CLASSES}
          />

          <Input
            label="MER (Management Expense Ratio)"
            type="number"
            placeholder="0.005"
            value={formData.mer}
            onChange={(e) => {
              setFormData({ ...formData, mer: e.target.value });
              if (errors.mer) setErrors({ ...errors, mer: '' });
            }}
            error={errors.mer}
            helperText="As decimal (e.g., 0.005 = 0.5%)"
            step="0.0001"
            min="0"
            max="1"
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Growth %"
              type="number"
              placeholder="0.6"
              value={formData.growth}
              onChange={(e) => {
                setFormData({ ...formData, growth: e.target.value });
                if (errors.growth) setErrors({ ...errors, growth: '' });
              }}
              error={errors.growth}
              helperText="0-1"
              step="0.01"
              min="0"
              max="1"
            />

            <Input
              label="Defensive %"
              type="number"
              placeholder="0.4"
              value={formData.defensive}
              onChange={(e) => {
                setFormData({ ...formData, defensive: e.target.value });
                if (errors.defensive) setErrors({ ...errors, defensive: '' });
              }}
              error={errors.defensive}
              helperText="0-1"
              step="0.01"
              min="0"
              max="1"
            />
          </div>

          <Textarea
            label="Description (Optional)"
            placeholder="Add notes about this investment..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={2}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAdd}
            disabled={isLoading}
            icon={isLoading ? undefined : <Icons.Plus />}
          >
            {isLoading ? 'Adding...' : 'Add Investment'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export { CustomInvestmentModal };
