import React from 'react';

/**
 * Input field component for text, number, email, etc.
 * @param {string} [type='text'] - Input type
 * @param {string} [label] - Optional label text
 * @param {string} [placeholder] - Placeholder text
 * @param {string} [value] - Input value
 * @param {Function} [onChange] - Change handler
 * @param {string} [error] - Error message to display
 * @param {string} [helperText] - Helper text below input
 * @param {boolean} [disabled=false] - Whether input is disabled
 * @param {React.ReactNode} [icon] - Optional icon inside input
 * @param {string} [className] - Additional Tailwind classes
 * @param {object} [props] - Additional HTML input attributes
 */
const Input = React.forwardRef(({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  disabled = false,
  icon = null,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-medium text-fs-slate-500 mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full px-3 py-2 text-sm rounded-lg border transition-colors
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' : 'border-fs-slate-300 focus:border-fs-teal-600 focus:ring-fs-teal-600/10'}
            ${disabled ? 'bg-fs-slate-50 text-fs-slate-400 cursor-not-allowed' : 'bg-white text-fs-slate-700'}
            focus:outline-none focus:ring-2
            ${className}
          `}
          {...props}
        />

        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-fs-slate-400 flex-shrink-0">
            {icon}
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-600 mt-1">{error}</p>
      )}

      {helperText && !error && (
        <p className="text-xs text-fs-slate-500 mt-1">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

/**
 * Textarea component for multi-line text input
 * @param {string} [label] - Optional label text
 * @param {string} [placeholder] - Placeholder text
 * @param {string} [value] - Input value
 * @param {Function} [onChange] - Change handler
 * @param {number} [rows=3] - Number of visible rows
 * @param {string} [error] - Error message to display
 * @param {string} [helperText] - Helper text below input
 * @param {boolean} [disabled=false] - Whether input is disabled
 * @param {string} [className] - Additional Tailwind classes
 * @param {object} [props] - Additional HTML textarea attributes
 */
const Textarea = React.forwardRef(({
  label,
  placeholder,
  value,
  onChange,
  rows = 3,
  error,
  helperText,
  disabled = false,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-medium text-fs-slate-500 mb-1">
          {label}
        </label>
      )}

      <textarea
        ref={ref}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={`
          w-full px-4 py-3 text-sm rounded-lg border transition-colors resize-none
          ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' : 'border-fs-slate-300 focus:border-fs-teal-600 focus:ring-fs-teal-600/10'}
          ${disabled ? 'bg-fs-slate-50 text-fs-slate-400 cursor-not-allowed' : 'bg-white text-fs-slate-700'}
          focus:outline-none focus:ring-2
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="text-xs text-red-600 mt-1">{error}</p>
      )}

      {helperText && !error && (
        <p className="text-xs text-fs-slate-500 mt-1">{helperText}</p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

/**
 * Select dropdown component
 * @param {Array} options - Array of option objects with value and label
 * @param {string} [label] - Optional label text
 * @param {string} [value] - Selected value
 * @param {Function} [onChange] - Change handler
 * @param {string} [placeholder] - Placeholder text
 * @param {string} [error] - Error message to display
 * @param {boolean} [disabled=false] - Whether input is disabled
 * @param {string} [className] - Additional Tailwind classes
 * @param {object} [props] - Additional HTML select attributes
 */
const Select = React.forwardRef(({
  options = [],
  label,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-medium text-fs-slate-500 mb-1">
          {label}
        </label>
      )}

      <select
        ref={ref}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-full px-3 py-2 text-sm rounded-lg border transition-colors
          ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' : 'border-fs-slate-300 focus:border-fs-teal-600 focus:ring-fs-teal-600/10'}
          ${disabled ? 'bg-fs-slate-50 text-fs-slate-400 cursor-not-allowed' : 'bg-white text-fs-slate-700'}
          focus:outline-none focus:ring-2 appearance-none cursor-pointer
          ${className}
        `}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-xs text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

/**
 * Checkbox component
 * @param {boolean} [checked=false] - Whether checkbox is checked
 * @param {Function} [onChange] - Change handler
 * @param {string} [label] - Label text
 * @param {boolean} [disabled=false] - Whether input is disabled
 * @param {string} [className] - Additional Tailwind classes
 * @param {object} [props] - Additional HTML input attributes
 */
const Checkbox = React.forwardRef(({
  checked = false,
  onChange,
  label,
  disabled = false,
  className = '',
  ...props
}, ref) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-4 h-4 rounded border-fs-slate-300 text-fs-teal-600
          focus:ring-fs-teal-600 focus:ring-2
          ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
          ${className}
        `}
        {...props}
      />
      {label && (
        <span className={`text-sm ${disabled ? 'text-fs-slate-400' : 'text-fs-slate-700'}`}>
          {label}
        </span>
      )}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

export { Input, Textarea, Select, Checkbox };
