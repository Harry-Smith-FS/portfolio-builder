import React from 'react';
import { Input, Textarea } from '../common/Input';
import { Button } from '../common/Button';
import { Icons } from '../common/Icons';

/**
 * ShareToTeamModal - Form to name/describe portfolio before sharing
 * @param {boolean} isOpen - Whether the modal is visible
 * @param {Function} onClose - Callback to close the modal
 * @param {Function} onSave - Callback when portfolio is saved (receives {name, description})
 * @param {object} [initialData] - Initial form values
 * @param {boolean} [isLoading] - Whether save operation is in progress
 */
const ShareToTeamModal = ({
  isOpen,
  onClose,
  onSave,
  initialData = { name: '', description: '' },
  isLoading = false,
}) => {
  const [name, setName] = React.useState(initialData.name);
  const [description, setDescription] = React.useState(initialData.description);
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    setName(initialData.name);
    setDescription(initialData.description);
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Portfolio name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm()) {
      await onSave({ name: name.trim(), description: description.trim() });
      setName('');
      setDescription('');
      setErrors({});
    }
  };

  const handleClose = () => {
    setName('');
    setDescription('');
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-fs-teal-100 p-2 rounded-lg">
            <Icons.Share />
          </div>
          <h3 className="text-lg font-semibold text-fs-slate-800">Save Portfolio</h3>
        </div>

        <div className="space-y-4 mb-6">
          <Input
            label="Portfolio Name"
            placeholder="e.g., Client Portfolio Q1 2026"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors({ ...errors, name: '' });
            }}
            error={errors.name}
          />

          <Textarea
            label="Description (Optional)"
            placeholder="Add notes about this portfolio..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
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
            onClick={handleSave}
            disabled={isLoading}
            icon={isLoading ? undefined : <Icons.Save />}
          >
            {isLoading ? 'Saving...' : 'Save Portfolio'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export { ShareToTeamModal };
