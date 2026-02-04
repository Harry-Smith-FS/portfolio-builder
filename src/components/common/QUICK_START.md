# Quick Start Guide - Common UI Components

## Installation

All components are already created and ready to use in `/src/components/common/`

## Basic Usage

### Import Components
```jsx
import { 
  Button, 
  Card, 
  Badge, 
  Input, 
  Textarea, 
  Select, 
  Checkbox,
  Tabs,
  Tooltip,
  Icons 
} from './components/common';
```

## Common Patterns

### Form with Validation
```jsx
function MyForm() {
  const [formData, setFormData] = useState({
    name: '',
    platform: '',
    notes: '',
    esgFocus: false
  });
  const [errors, setErrors] = useState({});

  return (
    <Card title="Form Title">
      <div className="space-y-4">
        <Input
          label="Client Name"
          placeholder="Enter name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
        />

        <Select
          label="Platform"
          options={[
            { value: 'hub24', label: 'HUB24' },
            { value: 'netwealth', label: 'Netwealth' }
          ]}
          value={formData.platform}
          onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
        />

        <Textarea
          label="Notes"
          placeholder="Enter notes..."
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
        />

        <Checkbox
          label="Enable ESG Focus"
          checked={formData.esgFocus}
          onChange={(e) => setFormData({ ...formData, esgFocus: e.target.checked })}
        />

        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </div>
    </Card>
  );
}
```

### Card with Header and Footer
```jsx
<Card
  title="Account Information"
  footer={
    <div className="flex gap-2 justify-end">
      <Button variant="ghost">Cancel</Button>
      <Button variant="primary">Save</Button>
    </div>
  }
>
  {/* Your content here */}
</Card>
```

### Button Variants
```jsx
<div className="flex gap-2">
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="danger">Delete</Button>
</div>
```

### Status Badges
```jsx
<div className="flex gap-2">
  <Badge variant="success">Active</Badge>
  <Badge variant="warning">Pending</Badge>
  <Badge variant="danger">Error</Badge>
  <Badge variant="esg" icon={<Icons.Leaf />}>ESG Focus</Badge>
</div>
```

### Tabs for Organization
```jsx
<Tabs
  tabs={[
    { id: 'accounts', label: 'Accounts', content: <AccountsList /> },
    { id: 'settings', label: 'Settings', content: <SettingsPanel /> },
    { id: 'history', label: 'History', content: <HistoryPanel /> }
  ]}
  onTabChange={(tabId) => console.log('Active tab:', tabId)}
/>
```

### Button with Icon
```jsx
<Button 
  variant="primary" 
  size="lg"
  icon={<Icons.Save />}
>
  Save Portfolio
</Button>
```

### Input with Icon
```jsx
<Input
  label="Search"
  placeholder="Search portfolios..."
  icon={<Icons.Search />}
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
```

### Tooltip for Help Text
```jsx
<Tooltip content="Click to refresh data from Supabase">
  <Button icon={<Icons.Refresh />}>
    Refresh
  </Button>
</Tooltip>
```

## Component Props at a Glance

### Button
```jsx
<Button
  variant="primary|secondary|ghost|danger|success"
  size="sm|md|lg"
  disabled={false}
  icon={<Icons.Save />}
  onClick={handleClick}
  className="additional-classes"
>
  Button Text
</Button>
```

### Card
```jsx
<Card
  title="Card Title"
  subtitle="Optional subtitle"
  variant="default|outlined|elevated"
  header={<CustomHeader />}
  footer={<CustomFooter />}
  className="additional-classes"
>
  Card content
</Card>
```

### Badge
```jsx
<Badge
  variant="default|success|warning|danger|info|esg|teal|gold"
  size="sm|md|lg"
  icon={<Icons.Leaf />}
  className="additional-classes"
>
  Badge Text
</Badge>
```

### Input
```jsx
<Input
  type="text|email|number|password"
  label="Field Label"
  placeholder="Enter value..."
  value={value}
  onChange={handler}
  error="Error message"
  helperText="Helper text"
  icon={<Icons.Search />}
  disabled={false}
  className="additional-classes"
/>
```

### Textarea
```jsx
<Textarea
  label="Field Label"
  placeholder="Enter text..."
  value={value}
  onChange={handler}
  rows={4}
  error="Error message"
  helperText="Helper text"
  disabled={false}
  className="additional-classes"
/>
```

### Select
```jsx
<Select
  label="Field Label"
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' }
  ]}
  value={value}
  onChange={handler}
  placeholder="Select an option..."
  error="Error message"
  disabled={false}
  className="additional-classes"
/>
```

### Checkbox
```jsx
<Checkbox
  label="Check this option"
  checked={checked}
  onChange={handler}
  disabled={false}
  className="additional-classes"
/>
```

### Tabs
```jsx
<Tabs
  tabs={[
    { id: 'tab1', label: 'Tab 1', content: <Content1 /> },
    { id: 'tab2', label: 'Tab 2', content: <Content2 /> }
  ]}
  activeTab="tab1"
  variant="default|pills"
  onTabChange={(tabId) => handleChange(tabId)}
  className="additional-classes"
/>
```

### Tooltip
```jsx
<Tooltip
  content="Helpful text"
  position="top|bottom|left|right"
  variant="dark|light"
  delay={200}
  className="additional-classes"
>
  <Button>Hover me</Button>
</Tooltip>
```

## Icons Available

Use `Icons` from the common components:
- `Icons.Save` - Save icon
- `Icons.Trash` - Delete/trash icon
- `Icons.Plus` - Add/plus icon
- `Icons.Refresh` - Refresh icon
- `Icons.Download` - Download icon
- `Icons.Upload` - Upload icon
- `Icons.Check` - Checkmark icon
- `Icons.X` - Close/X icon
- `Icons.Leaf` - Leaf (ESG) icon
- `Icons.Share` - Share icon
- `Icons.FolderOpen` - Folder icon
- `Icons.ChevronDown` - Dropdown arrow
- `Icons.AlertTriangle` - Warning icon

## Styling

All components use Tailwind CSS classes. You can add custom styles using the `className` prop:

```jsx
<Button className="w-full uppercase">
  Full Width Button
</Button>

<Card className="shadow-lg">
  Custom Card
</Card>
```

## Responsive Design

Components are mobile-responsive by default. Add responsive classes as needed:

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
</div>
```

## Accessibility

All components follow WCAG AA standards:
- Proper label associations
- Keyboard navigation
- Focus states
- Semantic HTML
- Color contrast

## Tips & Best Practices

1. **Use semantic variants** - Choose button variants that convey meaning (danger for destructive, success for positive)
2. **Group related inputs** - Use `Card` to group related form fields
3. **Add helper text** - Use the `helperText` prop on inputs to guide users
4. **Use icons meaningfully** - Always include text labels with icons for clarity
5. **Test accessibility** - Use keyboard navigation to test your implementations
6. **Consistent spacing** - Use Tailwind's gap and space utilities for consistent layouts

## File Locations

- Component library: `/src/components/common/`
- Usage examples: `/src/components/common/USAGE.md`
- Detailed docs: `/src/components/common/COMPONENT_SUMMARY.md`
- This guide: `/src/components/common/QUICK_START.md`

## Questions?

Refer to:
1. `QUICK_START.md` (this file) - Quick reference
2. `USAGE.md` - Detailed usage examples
3. `COMPONENT_SUMMARY.md` - Complete component documentation
4. Individual `.jsx` files - Source code with JSDoc comments
