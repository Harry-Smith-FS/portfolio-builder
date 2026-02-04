# Account Components Integration Guide

## Migration from Monolithic to Modular Structure

This guide explains how to integrate the new modular account components with the existing application.

## Before (Monolithic)

The original `UPLOAD-ME-V15.html` had a single `AccountPanel` component containing all account management logic:

```jsx
const AccountPanel = ({ account, onUpdate, onRemove, investmentsData, modelsData }) => {
  // All logic including header, holdings, summary, actions in one component
  return (
    <div className="bg-white rounded-xl shadow-sm border border-fs-slate-200">
      {/* Everything here */}
    </div>
  );
};
```

## After (Modular)

Components are now organized into separate, reusable modules:

```
src/components/accounts/
  ├── AccountCard.jsx          (Container component, replaces AccountPanel)
  ├── AccountHeader.jsx         (Header display + remove button)
  ├── AccountSummary.jsx        (Portfolio totals, MER, allocation)
  ├── HoldingRow.jsx            (Individual investment row)
  ├── AccountActions.jsx        (Load model, add investment buttons)
  └── index.js                  (Barrel export)
```

## Component Hierarchy

```
AccountCard (Container)
├── AccountHeader
├── Settings Grid (inline)
├── AccountSummary
│   ├── Key Metrics
│   ├── Allocation Status
│   └── Asset Class Breakdown
├── Holdings List
│   └── HoldingRow (repeating)
└── AccountActions
    ├── Load Model Button
    └── Add Investment Dropdown
```

## Usage in App Component

Replace the monolithic `AccountPanel` import:

### Old Way
```jsx
import { App } from './App'; // Contains inline AccountPanel component

function Portfolio() {
  return (
    <div>
      {accounts.map(account => (
        <AccountPanel
          key={account.id}
          account={account}
          onUpdate={(updates) => updateAccount(account.id, updates)}
          onRemove={() => removeAccount(account.id)}
          canRemove={accounts.length > 1}
          investmentsData={investmentsData}
          modelsData={modelsData}
        />
      ))}
    </div>
  );
}
```

### New Way
```jsx
import { AccountCard } from './components/accounts';
import { INVESTMENTS, MODELS } from './data';

function Portfolio() {
  return (
    <div>
      {accounts.map(account => (
        <AccountCard
          key={account.id}
          account={account}
          onUpdate={(updates) => updateAccount(account.id, updates)}
          onRemove={() => removeAccount(account.id)}
          canRemove={accounts.length > 1}
          investmentsData={INVESTMENTS}
          modelsData={MODELS}
        />
      ))}
    </div>
  );
}
```

## Key Differences from Monolithic Version

### Data Flow
- **Before**: All state managed in AccountPanel
- **After**: Parent component manages state, AccountCard is presentational

### Styling
- **Before**: Inline Tailwind classes in JSX
- **After**: Same Tailwind classes, organized by component

### Calculations
- **Before**: Calculations done inside component
- **After**: Uses external utility functions (`calculateAccountTotals`, `getModelAllocations`)

### Props Interface
- **Before**: All handlers and data as top-level props
- **After**: Organized into logical prop groups (name change, allocation update, remove)

## Migration Checklist

- [x] Extract header UI → `AccountHeader`
- [x] Extract holding rows → `HoldingRow`
- [x] Extract summary section → `AccountSummary`
- [x] Extract action buttons → `AccountActions`
- [x] Create container component → `AccountCard`
- [x] Import utilities from existing modules
- [x] Use Ford Scott brand colors (fs-teal, fs-gold, fs-slate)
- [x] Export all components from index.js
- [x] Create barrel export for convenient importing

## Testing the Components

### Test adding an account
```jsx
const [accounts, setAccounts] = useState([
  {
    id: 1,
    name: 'Test Account',
    accountType: 'accumulation',
    balance: 500000,
    riskProfile: 'balanced',
    isESG: false,
    allocations: {}
  }
]);
```

### Test updating allocations
```jsx
const handleUpdate = (account) => {
  setAccounts(accounts.map(a => a.id === account.id ? account : a));
};

// Component will calculate totals automatically
```

### Test loading models
Models should be auto-loaded on first mount if allocations are empty. Click "Load Model" to reload.

### Test adding/removing investments
Dropdown shows only unallocated investments. Percentages can be edited inline.

## Component Communication

All components are **presentational** - they don't manage their own state:

1. **AccountCard** is the only smart component
2. It computes totals using utility functions
3. It calls parent callbacks for all state changes
4. Child components are pure and reusable

## Future Improvements

1. Add inline editing mode for account settings
2. Create AccountList component to manage multiple accounts
3. Extract allocation editor into separate component
4. Add animations for adding/removing investments
5. Create specialized modals for complex operations

## Utility Functions Used

### From `src/utils/calculations.js`
- `calculateAccountTotals()`: Computes MER, growth/defensive, asset breakdown
- `getModelAllocations()`: Retrieves model from modelsData
- `getBalanceRange()`: Determines balance tier
- `getModelKey()`: Builds lookup key for models

### From `src/utils/formatting.js`
- `formatCurrency()`: AUD currency formatting
- `formatPercent()`: Percentage formatting
- `formatDate()`: Date formatting

## Styling Notes

All components use consistent styling:

- **Colors**: Ford Scott brand palette (fs-teal, fs-gold, fs-slate)
- **Spacing**: Tailwind's spacing scale (px, py, gap, etc.)
- **Shadows**: `shadow-sm` for subtle card shadows
- **Borders**: `border-fs-slate-200` for light borders
- **Rounded**: `rounded-lg` for inputs, `rounded-xl` for cards
- **Hover States**: Smooth transitions with `transition-smooth` class

## Performance Considerations

1. **Memoization**: AccountCard uses `useMemo` for calculations
2. **Effect Hooks**: Auto-load models on mount
3. **Validation**: Risk profiles are validated when available profiles change
4. **Sorting**: Holdings are sorted by percentage for better UX

## Error Handling

Components handle missing data gracefully:

- Missing investments default to "Unknown" asset class
- Missing models show all available profiles
- Missing MER data is handled in formatting
- Invalid balance ranges default to "under350k"
