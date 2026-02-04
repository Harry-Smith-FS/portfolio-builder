# Portfolio Components - Quick Start Guide

## Installation

All components are already in your project. Just import them:

```jsx
import {
  DeltaIndicator,
  ComparisonSummary,
  VolatilityMeter,
  ValidationWarnings,
  GrowthDefensiveBar
} from '@/components/portfolio';
```

## Quick Examples

### 1. Show a single metric change
```jsx
<DeltaIndicator
  current={65.5}
  baseline={60}
  format="percent"
/>
```
Result: Shows "5.5% ↑" in green

### 2. Display portfolio comparison
```jsx
<ComparisonSummary
  current={{ totalAllocation: 100, weightedMER: 0.0065, totalGrowth: 70, totalDefensive: 30, totalFees: 1300 }}
  baseline={{ totalAllocation: 100, weightedMER: 0.0085, totalGrowth: 65, totalDefensive: 35, totalFees: 1700 }}
/>
```
Result: Side-by-side metric banner with changes

### 3. Show risk level
```jsx
<VolatilityMeter
  growthAllocation={70}
  defensiveAllocation={30}
/>
```
Result: "Growth" risk level with 7/10 volatility score

### 4. Check portfolio validity
```jsx
<ValidationWarnings
  allocations={{ "Investment A": 60, "Investment B": 40 }}
  portfolioMER={0.0068}
  hasInvestments={true}
  verbose={false}
/>
```
Result: Green checkmark if valid, warnings if not

### 5. Show allocation split
```jsx
<GrowthDefensiveBar
  growth={70}
  defensive={30}
  colorScheme="teal"
/>
```
Result: Colored bar showing 70% growth / 30% defensive

## Common Patterns

### Complete Account Summary
```jsx
const { totalAllocation, weightedMER, totalGrowth, totalDefensive, totalFees } =
  calculateAccountTotals(allocations, balance, investments);

return (
  <div className="space-y-4">
    <ValidationWarnings allocations={allocations} portfolioMER={weightedMER} hasInvestments={true} />
    <VolatilityMeter growthAllocation={totalGrowth} defensiveAllocation={totalDefensive} />
    <GrowthDefensiveBar growth={totalGrowth} defensive={totalDefensive} />
  </div>
);
```

### Compact Dashboard
```jsx
<ComparisonSummary current={metrics} baseline={baseline} compact={true} />
<GrowthDefensiveBar growth={metrics.totalGrowth} defensive={metrics.totalDefensive} />
```

### Detailed Validation
```jsx
<ValidationWarnings
  allocations={allocations}
  portfolioMER={metrics.weightedMER}
  totalFees={metrics.totalFees}
  hasInvestments={Object.keys(allocations).length > 0}
  verbose={true}  // Shows full checklist instead of badge
/>
```

## Key Props

### DeltaIndicator
- `current` - Current value
- `baseline` - Baseline value to compare
- `format` - 'percent' | 'currency' | 'number'

### ComparisonSummary
- `current` - Object with metrics
- `baseline` - Object with metrics
- `compact` - true for condensed layout

### VolatilityMeter
- `growthAllocation` - Growth % (0-100)
- `defensiveAllocation` - Defensive % (0-100)
- `detailed` - true for full description

### ValidationWarnings
- `allocations` - Object { name: percentage }
- `portfolioMER` - Decimal (e.g., 0.0065)
- `hasInvestments` - Boolean
- `verbose` - true for checklist, false for badge

### GrowthDefensiveBar
- `growth` - Growth % (0-100)
- `defensive` - Defensive % (0-100)
- `colorScheme` - 'default' | 'teal' | 'gradient'
- `detailed` - true for full description

## Color Schemes

### GrowthDefensiveBar schemes:
- `default`: Blue growth / Purple defensive
- `teal`: Teal variants (brand colors)
- `gradient`: Green→Blue growth / Orange→Red defensive

### DeltaIndicator colors (automatic):
- Green for positive changes
- Red for negative changes
- Gray for no change

## Troubleshooting

**Components not displaying?**
- Check Tailwind CSS is configured with `fs-teal-*` and `fs-slate-*` colors
- Verify Icons component is imported correctly
- Ensure all props are provided

**Values not formatting correctly?**
- Use `calculateAccountTotals()` from utils to ensure correct metric calculation
- Pass metrics in correct format (MER as decimal: 0.0065, not 6.5)

**Styling looks wrong?**
- Ensure Tailwind CSS is properly configured
- Check brand color definitions in tailwind.config.js

## Integration Example

```jsx
import React from 'react';
import { calculateAccountTotals } from '@/utils/calculations';
import {
  ComparisonSummary,
  VolatilityMeter,
  ValidationWarnings,
  GrowthDefensiveBar
} from '@/components/portfolio';

function AccountPanel({ account, investments }) {
  const metrics = calculateAccountTotals(
    account.allocations,
    account.balance,
    investments
  );

  return (
    <div className="space-y-6">
      <h2>{account.name}</h2>

      <ValidationWarnings
        allocations={account.allocations}
        portfolioMER={metrics.weightedMER}
        hasInvestments={Object.keys(account.allocations).length > 0}
      />

      <div className="grid grid-cols-2 gap-6">
        <VolatilityMeter
          growthAllocation={metrics.totalGrowth}
          defensiveAllocation={metrics.totalDefensive}
        />
        <GrowthDefensiveBar
          growth={metrics.totalGrowth}
          defensive={metrics.totalDefensive}
        />
      </div>
    </div>
  );
}

export default AccountPanel;
```

## Need More Help?

1. See **README.md** for detailed prop documentation
2. Check **EXAMPLES.jsx** for 6 complete working examples
3. Review **COMPONENT-MIGRATION-SUMMARY.md** for architecture overview

---

**Happy building!** 🚀
