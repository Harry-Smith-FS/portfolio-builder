# Chart Components Usage Guide

This directory contains reusable SVG-based visualization components for the Portfolio Builder application.

## Components

### AllocationChart

A pie/donut chart component that visualizes asset class allocation distribution.

**Props:**
- `assetClassBreakdown` (Object): Asset class distribution data in format `{ className: percentage }`
  - Example: `{ 'AUSTRALIAN EQUITIES': 45, 'FIXED INCOME': 35, 'CASH': 20 }`
- `size` (number, optional): SVG size in pixels. Default: 300
- `showDonut` (boolean, optional): Render as donut chart (true) or pie chart (false). Default: true
- `showLegend` (boolean, optional): Display legend below chart. Default: true

**Usage Example:**

```jsx
import { AllocationChart } from './charts';

function MyComponent() {
  const breakdown = {
    'DIVERSIFIED': 50,
    'AUSTRALIAN EQUITIES': 30,
    'GLOBAL EQUITIES': 20
  };

  return (
    <AllocationChart
      assetClassBreakdown={breakdown}
      size={350}
      showDonut={true}
      showLegend={true}
    />
  );
}
```

**Features:**
- SVG-based for sharp rendering at any size
- Uses ASSET_CLASS_COLORS from config for consistent coloring
- Hover effects on segments
- Automatic label positioning within segments
- Legend with color indicators and percentages
- Supports both pie and donut chart variations

---

### AllocationBar

A horizontal stacked bar chart showing Growth vs Defensive asset allocation split.

**Props:**
- `growthPercent` (number): Growth allocation percentage (0-100). Default: 0
- `defensivePercent` (number): Defensive allocation percentage (0-100). Default: 0
- `showLabels` (boolean, optional): Display percentage labels on bar segments. Default: true
- `height` (string, optional): Tailwind height class for the bar. Default: 'h-8'

**Usage Example:**

```jsx
import { AllocationBar } from './charts';

function MyComponent() {
  return (
    <AllocationBar
      growthPercent={65}
      defensivePercent={35}
      showLabels={true}
    />
  );
}
```

**Features:**
- SVG-based for crisp rendering
- Responsive width (scales to container)
- Color-coded segments (Cyan for Growth, Purple for Defensive)
- Automatic percentage normalization
- Legend with color indicators
- Responsive label display (hides small segments)

---

## Integration with AccountPanel

These charts are ideal for displaying within the AccountPanel component to visualize portfolio metrics:

```jsx
import { AllocationChart, AllocationBar } from '../charts';
import { calculateAccountTotals } from '../../utils/calculations';

function AccountPanel({ account, investmentsData }) {
  const totals = calculateAccountTotals(
    account.allocations,
    account.balance,
    {},
    {},
    investmentsData
  );

  return (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <h3 className="text-sm font-semibold mb-3">Asset Class Allocation</h3>
        <AllocationChart
          assetClassBreakdown={totals.assetClassBreakdown}
          size={250}
          showDonut={true}
          showLegend={true}
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3">Growth vs Defensive</h3>
        <AllocationBar
          growthPercent={totals.totalGrowth}
          defensivePercent={totals.totalDefensive}
          showLabels={true}
        />
      </div>
    </div>
  );
}
```

---

## Color Palette

The components use the ASSET_CLASS_COLORS configuration from `src/data/config.js`:

- **DIVERSIFIED**: #0d9488 (Teal)
- **AUSTRALIAN EQUITIES**: #0891b2 (Cyan)
- **GLOBAL EQUITIES**: #6366f1 (Indigo)
- **FIXED INCOME**: #8b5cf6 (Purple)
- **CASH**: #94a3b8 (Slate)
- **TERM DEPOSIT**: #64748b (Dark Slate)
- **PROPERTY**: #f59e0b (Amber)
- **ALTERNATIVES**: #ec4899 (Pink)

---

## SVG Implementation Details

Both components are implemented as pure SVG elements with React, providing:

1. **Scalability**: Vector-based rendering scales perfectly to any size
2. **Performance**: Lightweight SVG rendering without external charting libraries
3. **Customization**: Easy to modify colors, sizes, and styling
4. **Consistency**: Matches the Portfolio Builder design system
5. **Accessibility**: Includes semantic labels and contrast ratios

### Arc Calculation (AllocationChart)

The pie/donut chart uses trigonometric calculations to:
- Convert percentages to angular slices
- Generate SVG arc paths using quadratic curves
- Calculate label positioning at optimal angles
- Support both filled and hollow center (donut mode)

### Bar Rendering (AllocationBar)

The stacked bar uses SVG rectangles with:
- Proportional width based on percentage values
- Automatic normalization of segments
- Responsive scaling via `preserveAspectRatio="none"`
- Text centering within segments

---

## Dependencies

- **React**: Used for component structure and state management
- **Tailwind CSS**: Used for legend styling and spacing
- **ASSET_CLASS_COLORS**: Imported from `src/data/config.js`

---

## Future Enhancements

Possible additions:
- Interactive tooltips on hover
- Click handlers for segment selection
- Animation on mount
- Comparison charts between accounts
- Time series visualizations
- Print-friendly styling
