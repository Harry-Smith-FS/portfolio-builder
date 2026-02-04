# Portfolio Components

Helper components for portfolio analytics and validation. These components display portfolio metrics, comparisons, and validation status.

## Components

### DeltaIndicator

Shows the change between current and baseline values with directional indicators.

**Props:**
- `current` (number): Current value - default: 0
- `baseline` (number): Baseline value to compare against - default: 0
- `label` (string): Text label to display - default: 'Change'
- `format` (string): Format type ('percent', 'currency', 'number') - default: 'percent'
- `size` (string): Size variant ('small', 'default', 'large') - default: 'default'
- `showIcon` (boolean): Show up/down arrow icon - default: true
- `threshold` (number): Minimum change to show as positive/negative - default: 0.01

**Example:**
```jsx
<DeltaIndicator
  current={65.5}
  baseline={60.0}
  label="vs baseline"
  format="percent"
  size="default"
/>
```

**Features:**
- Color-coded output (green for increase, red for decrease, gray for neutral)
- Multiple format options for different value types
- Customizable size variants
- Configurable threshold for rounding small changes

---

### ComparisonSummary

Banner component displaying side-by-side comparison of key portfolio metrics.

**Props:**
- `current` (object): Current portfolio metrics object
  - `totalAllocation`: Total allocation percentage
  - `weightedMER`: Portfolio MER (as decimal)
  - `totalGrowth`: Growth allocation percentage
  - `totalDefensive`: Defensive allocation percentage
  - `totalFees`: Estimated annual fees
- `baseline` (object): Baseline portfolio metrics (same structure)
- `showLabels` (boolean): Show metric labels - default: true
- `compact` (boolean): Use compact layout - default: false

**Example:**
```jsx
<ComparisonSummary
  current={{
    totalAllocation: 100,
    weightedMER: 0.0065,
    totalGrowth: 70,
    totalDefensive: 30,
    totalFees: 1300
  }}
  baseline={{
    totalAllocation: 100,
    weightedMER: 0.0085,
    totalGrowth: 65,
    totalDefensive: 35,
    totalFees: 1700
  }}
  compact={false}
/>
```

**Features:**
- Teal-themed design matching brand colors
- Delta indicators for each metric
- Compact mode for space-constrained layouts
- Automatic metric formatting (currency, percentages)

---

### VolatilityMeter

Visual meter displaying expected volatility based on growth allocation.

**Props:**
- `growthAllocation` (number): Growth asset allocation percentage - default: 0
- `defensiveAllocation` (number): Defensive asset allocation percentage - default: 0
- `showLabel` (boolean): Show component label - default: true
- `detailed` (boolean): Show detailed view with description - default: false

**Example:**
```jsx
<VolatilityMeter
  growthAllocation={70}
  defensiveAllocation={30}
  detailed={true}
/>
```

**Risk Levels:**
- **Conservative** (< 30% growth): Low volatility, capital preservation focus
- **Balanced** (30-50% growth): Moderate volatility, balanced approach
- **Growth** (50-80% growth): Higher volatility, growth-focused
- **High Growth** (> 80% growth): High volatility, aggressive approach

**Features:**
- 10-point volatility scale
- Visual bar chart representation
- Risk level classification
- Detailed descriptions of each risk profile
- Compact view for dashboard displays

---

### ValidationWarnings

Validation checklist component for portfolio configuration.

**Props:**
- `allocations` (object): Investment allocations { name: percentage } - default: {}
- `targetAllocation` (number): Target total allocation percentage - default: 100
- `merCap` (number): Maximum recommended MER (as decimal) - default: 0.015
- `portfolioMER` (number): Current portfolio MER (as decimal) - default: 0
- `totalFees` (number): Total annual fees in dollars - default: 0
- `hasInvestments` (boolean): Whether portfolio has investments - default: false
- `minAllocationPerInvestment` (number): Minimum allocation percentage - default: 1
- `verbose` (boolean): Show detailed validation view - default: false

**Example:**
```jsx
<ValidationWarnings
  allocations={{
    "Investment A": 60,
    "Investment B": 40
  }}
  targetAllocation={100}
  merCap={0.015}
  portfolioMER={0.0068}
  totalFees={1300}
  hasInvestments={true}
  verbose={true}
/>
```

**Validation Checks:**
- No investments added (error)
- Total allocation mismatch (error/warning)
- MER exceeds recommended cap (warning)
- Low diversification (warning)
- Zero allocations present (info)

**Features:**
- Three severity levels: error, warning, info
- Compact status badge mode
- Detailed view with pass/fail breakdown
- Actionable descriptions for each check
- Color-coded visual feedback

---

### GrowthDefensiveBar

Visual representation of growth vs defensive asset allocation as a stacked bar.

**Props:**
- `growth` (number): Growth allocation percentage - default: 0
- `defensive` (number): Defensive allocation percentage - default: 0
- `label` (string): Component label - default: 'Asset Allocation'
- `detailed` (boolean): Show detailed view - default: false
- `showPercentages` (boolean): Show percentage values - default: true
- `colorScheme` (string): Color scheme ('default', 'teal', 'gradient') - default: 'default'
- `height` (string): Bar height (Tailwind class) - default: 'h-3'

**Example:**
```jsx
<GrowthDefensiveBar
  growth={70}
  defensive={30}
  label="Current Allocation"
  detailed={true}
  colorScheme="teal"
/>
```

**Color Schemes:**
- **default**: Blue (growth) / Purple (defensive)
- **teal**: Teal variants (brand colors)
- **gradient**: Gradient from green→blue / orange→red

**Features:**
- Horizontal stacked bar visualization
- Automatic normalization to 100%
- Compact and detailed view modes
- Multiple color scheme options
- Legend with color indicators
- Risk assessment descriptions

---

## Usage Examples

### Complete Portfolio Summary
```jsx
import {
  DeltaIndicator,
  ComparisonSummary,
  VolatilityMeter,
  ValidationWarnings,
  GrowthDefensiveBar
} from '@/components/portfolio';

function PortfolioView({ currentPortfolio, baselinePortfolio }) {
  return (
    <div className="space-y-6">
      {/* Comparison Overview */}
      <ComparisonSummary
        current={currentPortfolio.metrics}
        baseline={baselinePortfolio.metrics}
      />

      {/* Risk & Allocation */}
      <div className="grid grid-cols-2 gap-6">
        <VolatilityMeter
          growthAllocation={currentPortfolio.metrics.totalGrowth}
          defensiveAllocation={currentPortfolio.metrics.totalDefensive}
          detailed={true}
        />

        <GrowthDefensiveBar
          growth={currentPortfolio.metrics.totalGrowth}
          defensive={currentPortfolio.metrics.totalDefensive}
          detailed={true}
          colorScheme="teal"
        />
      </div>

      {/* Validation */}
      <ValidationWarnings
        allocations={currentPortfolio.allocations}
        portfolioMER={currentPortfolio.metrics.weightedMER}
        totalFees={currentPortfolio.metrics.totalFees}
        hasInvestments={Object.keys(currentPortfolio.allocations).length > 0}
        verbose={true}
      />
    </div>
  );
}
```

### Compact Dashboard View
```jsx
function PortfolioDashboard({ portfolio }) {
  return (
    <div className="space-y-4">
      {/* Quick Status Check */}
      <ValidationWarnings
        allocations={portfolio.allocations}
        portfolioMER={portfolio.metrics.weightedMER}
        hasInvestments={Object.keys(portfolio.allocations).length > 0}
        verbose={false}
      />

      {/* Quick Metrics */}
      <div className="grid grid-cols-3 gap-2">
        <div className="text-center">
          <div className="text-sm font-semibold">{portfolio.metrics.totalGrowth.toFixed(1)}%</div>
          <div className="text-xs text-gray-600">Growth</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-semibold">{(portfolio.metrics.weightedMER * 100).toFixed(2)}%</div>
          <div className="text-xs text-gray-600">MER</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-semibold">${(portfolio.metrics.totalFees || 0).toLocaleString()}</div>
          <div className="text-xs text-gray-600">Annual Fees</div>
        </div>
      </div>

      {/* Quick Allocation View */}
      <GrowthDefensiveBar
        growth={portfolio.metrics.totalGrowth}
        defensive={portfolio.metrics.totalDefensive}
        colorScheme="teal"
      />
    </div>
  );
}
```

---

## Integration with Calculations

These components work with utilities from `src/utils/calculations.js`:

```jsx
import { calculateAccountTotals } from '@/utils/calculations';
import { ValidationWarnings, ComparisonSummary } from '@/components/portfolio';

function AccountPanel({ allocations, balance, investments }) {
  const metrics = calculateAccountTotals(allocations, balance, investments);

  return (
    <div className="space-y-4">
      <ValidationWarnings
        allocations={allocations}
        portfolioMER={metrics.weightedMER}
        totalFees={metrics.totalFees}
        hasInvestments={Object.keys(allocations).length > 0}
      />

      <ComparisonSummary
        current={metrics}
        baseline={{
          totalAllocation: 100,
          weightedMER: 0.008,
          totalGrowth: 65,
          totalDefensive: 35,
          totalFees: 2000
        }}
      />
    </div>
  );
}
```

---

## Tailwind CSS Classes Used

These components rely on Tailwind CSS with custom brand colors defined in `tailwind.config.js`:
- `fs-teal-*` (brand primary colors)
- `fs-slate-*` (neutral colors)
- `bg-*`, `text-*` (standard Tailwind)
- `rounded-*`, `p-*`, `gap-*`, etc. (spacing & layout)

Ensure your Tailwind config includes these custom color definitions.

---

## Accessibility

All components include:
- Semantic HTML structure
- Color not the only indicator (icons, text used)
- Proper contrast ratios
- ARIA labels where appropriate
- Keyboard-accessible interactive elements

---

## Performance Notes

- Components use React.memo for optimization where beneficial
- Avoid re-rendering large metric objects on every update
- Consider memoizing calculations outside components
- Use lazy loading for detailed views if rendering many components

---

## Related Components

- `src/utils/calculations.js` - Portfolio metric calculations
- `src/components/common/Icons.jsx` - Icon components used throughout
- `src/components/charts/` - Detailed chart components
- `src/components/accounts/` - Account-level components
