# Account Management Components

This module contains modular React components for managing investment accounts and their holdings in the Portfolio Builder application.

## Components

### AccountCard
The main container component that displays a complete account with all its settings, holdings, and management controls.

**Props:**
- `account` (object): Account data object containing:
  - `id` (number): Unique account identifier
  - `name` (string): Account display name
  - `accountType` (string): 'accumulation' or 'pension'
  - `balance` (number): Account balance in dollars
  - `riskProfile` (string): Risk profile (conservative, balanced, growth, highGrowth)
  - `isESG` (boolean): Whether ESG investing is enabled
  - `allocations` (object): Investment allocations { investmentName: percentage }
- `onUpdate` (function): Callback when account is modified: `(updatedAccount) => void`
- `onRemove` (function): Callback when account is removed: `() => void`
- `canRemove` (boolean): Whether account can be removed (default: true)
- `investmentsData` (object): Investment metadata keyed by name
- `modelsData` (object): Portfolio model definitions for auto-allocation

**Features:**
- Account settings editor (type, balance, risk profile, ESG toggle)
- Real-time portfolio calculations (MER, growth/defensive split)
- Investment holdings list with inline percentage editing
- Add/remove investments from portfolio
- Load model allocations based on account settings
- Asset class allocation breakdown

### AccountHeader
Displays the account header with name input, type badge, ESG badge, and remove button.

**Props:**
- `name` (string): Account name
- `accountType` (string): 'accumulation' or 'pension'
- `isESG` (boolean): ESG flag
- `onNameChange` (function): Callback when name is edited
- `onRemove` (function): Callback for remove button
- `canRemove` (boolean): Whether remove button is shown

### AccountSummary
Shows portfolio totals including MER, growth/defensive percentages, allocation status, and asset class breakdown.

**Props:**
- `totalAllocation` (number): Total percentage allocation (0-100)
- `portfolioMER` (number): Portfolio weighted MER as decimal (e.g., 0.0051 for 0.51%)
- `growthPercentage` (number): Percentage allocated to growth assets
- `defensivePercentage` (number): Percentage allocated to defensive assets
- `assetClassBreakdown` (object): Allocation by asset class { className: percentage }

**Features:**
- Color-coded allocation status (green if 100%, amber if partial)
- Asset class breakdown with percentages
- Portfolio risk composition display

### HoldingRow
Displays a single investment holding with inline editing capabilities.

**Props:**
- `name` (string): Investment name
- `percentage` (number): Current allocation percentage
- `assetClass` (string): Asset class (DIVERSIFIED, AUSTRALIAN EQUITIES, etc.)
- `mer` (number): Management expense ratio as decimal
- `onUpdate` (function): Callback when percentage is updated: `(newPercentage) => void`
- `onRemove` (function): Callback when investment is removed

**Features:**
- Color-coded asset class indicator
- Inline percentage input with validation
- Quick-remove button
- MER and asset class display

### AccountActions
Control panel for account operations like loading models and adding investments.

**Props:**
- `availableInvestments` (array): List of investment names available for addition
- `currentAllocations` (object): Current account allocations
- `onAddInvestment` (function): Callback when investment is added
- `onLoadModel` (function): Callback for load model button
- `showAddButton` (boolean): Whether to show add investment section

**Features:**
- Load Model button for auto-allocation
- Investment dropdown (only shows unallocated investments)
- Add button for adding investments to portfolio

## Usage Example

```jsx
import { AccountCard } from './components/accounts';
import { INVESTMENTS, MODELS } from './data';

function App() {
  const [accounts, setAccounts] = React.useState([
    {
      id: 1,
      name: 'My Super',
      accountType: 'accumulation',
      balance: 500000,
      riskProfile: 'balanced',
      isESG: false,
      allocations: {}
    }
  ]);

  const handleAccountUpdate = (updatedAccount) => {
    setAccounts(accounts.map(a => a.id === updatedAccount.id ? updatedAccount : a));
  };

  const handleAccountRemove = (accountId) => {
    setAccounts(accounts.filter(a => a.id !== accountId));
  };

  return (
    <div>
      {accounts.map(account => (
        <AccountCard
          key={account.id}
          account={account}
          onUpdate={handleAccountUpdate}
          onRemove={() => handleAccountRemove(account.id)}
          canRemove={accounts.length > 1}
          investmentsData={INVESTMENTS}
          modelsData={MODELS}
        />
      ))}
    </div>
  );
}
```

## Styling

Components use Ford Scott brand colors and Tailwind CSS:

- **Primary Color**: `fs-teal` (teal-600: #0d9488)
- **Secondary Color**: `fs-gold` (gold-500: #f59e0b)
- **Text Color**: `fs-slate` (various shades)

All components support Tailwind's responsive design with `md:` breakpoints.

## Data Dependencies

### investmentsData
Should be structured as:
```js
{
  "Investment Name": {
    mer: 0.0051,        // MER as decimal
    growth: 0.6,        // Growth allocation 0-1
    defensive: 0.4,     // Defensive allocation 0-1
    assetClass: "DIVERSIFIED"
  }
}
```

### modelsData
Should be structured as:
```js
{
  "accumulation-under350k-standard": {
    "conservative": {
      "Investment Name": 95,  // Percentage allocation
      "CASH": 5
    },
    "balanced": { ... },
    "growth": { ... }
  }
}
```

## Utilities Used

- `calculateAccountTotals()` from `utils/calculations.js`: Computes MER and asset allocation
- `getModelAllocations()` from `utils/calculations.js`: Retrieves model allocations
- `getBalanceRange()` from `utils/calculations.js`: Determines balance tier
- `formatCurrency()`, `formatPercent()` from `utils/formatting.js`: Output formatting

## Color Scheme for Asset Classes

Colors are defined in `src/data/config.js`:
- DIVERSIFIED: Teal (#0d9488)
- AUSTRALIAN EQUITIES: Cyan (#0891b2)
- GLOBAL EQUITIES: Indigo (#6366f1)
- FIXED INCOME: Violet (#8b5cf6)
- CASH: Slate (#94a3b8)
- TERM DEPOSIT: Dark Slate (#64748b)
- PROPERTY: Amber (#f59e0b)
- ALTERNATIVES: Pink (#ec4899)

## Animation

Components use the `animate-fade-in` class for smooth entrance animations.
