# Common UI Components

This directory contains reusable UI components built with React and Tailwind CSS using the Ford Scott brand colors and typography.

## Components

### Button
A versatile button component with multiple variants and sizes.

```jsx
import { Button, Icons } from './common';

// Basic button
<Button>Click me</Button>

// With variant
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Delete</Button>

// With size
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// With icon
<Button icon={<Icons.Save />}>Save Portfolio</Button>

// Disabled
<Button disabled>Disabled</Button>
```

### Card
A container component for content sections with optional header and footer.

```jsx
import { Card } from './common';

// Simple card
<Card>
  <p>Card content here</p>
</Card>

// With title
<Card title="My Card" subtitle="Optional subtitle">
  <p>Card content</p>
</Card>

// With header and footer
<Card
  header={<div>Custom Header</div>}
  footer={<div>Custom Footer</div>}
>
  <p>Card content</p>
</Card>

// With variant
<Card variant="elevated">
  <p>Elevated card</p>
</Card>
```

### Badge
Component for status indicators and labels.

```jsx
import { Badge, Icons } from './common';

// Basic badge
<Badge>New</Badge>

// With variants
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Error</Badge>
<Badge variant="esg">ESG Focus</Badge>

// With icon
<Badge icon={<Icons.Leaf />} variant="esg">ESG</Badge>

// Different sizes
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
```

### Input, Textarea, Select, Checkbox
Form input components with validation and helper text.

```jsx
import { Input, Textarea, Select, Checkbox } from './common';

// Text input
<Input 
  label="Client Name"
  placeholder="Enter name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

// Input with error
<Input
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error="Invalid email format"
/>

// Textarea
<Textarea
  label="Notes"
  placeholder="Enter notes..."
  rows={4}
  value={notes}
  onChange={(e) => setNotes(e.target.value)}
/>

// Select
<Select
  label="Platform"
  value={platform}
  onChange={(e) => setPlatform(e.target.value)}
  options={[
    { value: 'hub24', label: 'HUB24' },
    { value: 'netwealth', label: 'Netwealth' },
  ]}
/>

// Checkbox
<Checkbox
  label="Enable ESG Focus"
  checked={isESG}
  onChange={(e) => setIsESG(e.target.checked)}
/>
```

### Tabs
Tab navigation component for organizing content.

```jsx
import { Tabs } from './common';

<Tabs
  tabs={[
    { id: 'tab1', label: 'Overview', content: <div>Content 1</div> },
    { id: 'tab2', label: 'Details', content: <div>Content 2</div> },
  ]}
  activeTab="tab1"
  onTabChange={(tabId) => console.log(tabId)}
/>

// With pills variant
<Tabs
  variant="pills"
  tabs={[
    { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
    { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
  ]}
/>
```

### Tooltip
Tooltip component for showing helpful information on hover.

```jsx
import { Tooltip } from './common';

<Tooltip content="Click to refresh data">
  <button>Refresh</button>
</Tooltip>

// With position
<Tooltip content="Helpful text" position="top">
  <button>Button</button>
</Tooltip>

<Tooltip content="Information" position="right" variant="light">
  <Icons.Info />
</Tooltip>
```

## Ford Scott Brand Colors

All components use the Ford Scott brand color palette:

- **fs-teal**: Primary color (#0d9488 at 600)
- **fs-gold**: Accent color (#f59e0b at 500)
- **fs-slate**: Neutral color (slate-700 at #334155)

These colors are defined in your Tailwind config and are available in all components.

## Typography

Components use the brand typography:
- **Headings**: DM Sans
- **Body**: Inter

## Responsive Design

All components are mobile-responsive and use Tailwind's responsive utilities. You can pass additional Tailwind classes via the `className` prop.

## Accessibility

Components follow accessibility best practices:
- Proper label associations for form inputs
- Keyboard navigation support
- ARIA attributes where appropriate
- Focus states for interactive elements
- Color contrast compliance
