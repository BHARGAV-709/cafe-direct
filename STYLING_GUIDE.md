# Café Direct - Styling & Theme Guide

## Color Palette

### Primary Colors
- **Primary Brown**: `#8b5a3c` - Main brand color, used for buttons, headers, and accents
- **Accent Orange**: `#c67c4e` - Call-to-action buttons, highlights
- **Secondary Tan**: `#d4a574` - Secondary accents, hover states

### Neutral Colors
- **Background**: `#fef6f1` - Light, warm off-white
- **Card Background**: `#ffffff` - Pure white for cards
- **Muted**: `#e8ddd2` - Light gray for disabled states
- **Text Foreground**: `#2d2420` - Dark brown text

### Dark Mode
- **Dark Background**: `#1a1410` - Deep dark brown
- **Dark Card**: `#2d2420` - Slightly lighter dark brown
- **Dark Text**: `#f5e6d3` - Light cream text

## Interactive Elements

### Hover States
All interactive elements have smooth transitions with:
- `transition-all duration-300` for smooth animations
- Hover effects include shadow enhancement: `hover:shadow-lg`
- Color transitions: `hover:bg-primary/90`, `hover:scale-105`

### Button Styles
1. **Primary Buttons** (CTAs)
   - Background: Primary brown (`#8b5a3c`)
   - Hover: `hover:bg-primary/90` with shadow
   - Transition: `transition-all hover:shadow-md`

2. **Accent Buttons** (Quick actions)
   - Background: Accent orange (`#c67c4e`)
   - Hover: `hover:bg-accent/90` with enhanced shadow
   - Example: "Add to Cart", "Order via WhatsApp"

3. **Outline Buttons** (Secondary)
   - Border: Border color (`#e8ddd2`)
   - Hover: `hover:bg-muted` with smooth transition
   - Text: Inherit from foreground

4. **Ghost Buttons** (Subtle)
   - No background by default
   - Hover: `hover:bg-primary/20` for soft highlight
   - Used for quantity adjusters, secondary actions

### Card Interactions
- Base: `hover:shadow-lg transition-all duration-300`
- Menu items: `group-hover:scale-110` on images
- Stats cards: `hover:scale-105` for subtle zoom
- All cards have smooth transition animations

## Spacing & Layout

### Container
- Max width with `container mx-auto px-4`
- Padding: `py-8` for main sections

### Card Spacing
- Inner padding: `p-4` to `p-6`
- Gap between items: `gap-6` (1.5rem)
- Border radius: `rounded-lg` or `rounded-xl`

### Typography
- Headers: Bold, primary color
- Body text: Muted foreground with good line-height
- Labels: Small, medium weight, muted color

## Responsive Design

### Breakpoints
- Mobile first (default)
- `md:` for tablets (768px)
- `lg:` for desktops (1024px)

### Grid Examples
```
Grid Cols:
- Mobile: 1 column
- Tablet: 2 columns (md:grid-cols-2)
- Desktop: 3 columns (lg:grid-cols-3)
```

## Component Patterns

### Menu Item Card
- Image area: Emoji icon on gradient background
- Hover: Image scales up, shadow increases
- Footer: Accent-colored "Add to Cart" button

### Cart Item
- Horizontal layout with quantity controls
- Remove button (red) on right side
- Background: Card color with hover muted effect

### Header
- Sticky position with shadow
- Logo + table number on left
- Cart button with count badge on right

## Transitions & Animations

All transitions use `transition-all duration-300` for consistency:
- Button hovers: Color + shadow change
- Card hovers: Shadow + scale changes
- Input focus: Ring color change (primary)
- Badge colors: Soft opacity backgrounds

## Accessibility

- All buttons have clear hover states
- Text contrast: Dark text on light, light text on dark
- Icon + text combinations for clarity
- Focus states preserved from Tailwind defaults
- Aria labels on interactive elements

## Theme Implementation

The theme uses CSS custom properties (variables) in:
- `app/globals.css` - Root theme definition
- Both light and dark modes configured
- Easy to customize by updating CSS variables
- Seamless dark mode toggle support
