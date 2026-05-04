# Café Direct - Design Reference Guide

## Visual Hierarchy

### Typography Sizes
```
H1 (Headings)     → 48px-112px    (Playfair Display, Bold)
H2 (Section)      → 32px-64px     (Playfair Display, Bold)
H3 (Cards)        → 20px-32px     (Playfair Display, Bold)
Body              → 16px-18px     (Poppins, Regular)
Small             → 12px-14px     (Poppins, Regular)
```

### Line Heights
```
Headings          → 1.2 (tight)
Body Text         → 1.5-1.6 (relaxed)
```

### Letter Spacing
```
All Text          → 0.3px
Headings          → -0.5px (negative for tightness)
```

---

## Color Usage

### Primary Palette
```
Primary (#1a1a1a)
├─ Headings
├─ Body text
├─ Button backgrounds
└─ Active states

Accent (#c67c4e)
├─ CTA buttons
├─ Hover states
├─ Highlights
└─ Feature icons

Secondary (#8b7355)
├─ Icon backgrounds
├─ Accent elements
└─ Subtle highlights

Background (#fafaf8)
├─ Page background
├─ Card backgrounds
└─ Clean white

Muted (#e5e3e0)
├─ Subtle backgrounds
├─ Disabled states
└─ Secondary info

Border (#ebe9e6)
├─ Card borders
├─ Dividers
└─ Subtle separation
```

---

## Spacing System

### Padding
```
xs → 4px
sm → 8px
md → 16px
lg → 24px
xl → 32px
2xl → 48px
```

### Gaps
```
Small cards    → 8px
Medium spacing → 16px
Large spacing  → 24px
Section gap    → 48px
```

### Margins
```
Between sections → 80px-128px
Card spacing     → 32px
Text spacing     → 16px-24px
```

---

## Component Styles

### Buttons

**Primary Button**
```css
Background: #1a1a1a
Text: White
Padding: 12px 32px
Border: None
Hover: #1a1a1a/90
Transition: 300ms ease-out
```

**Secondary Button**
```css
Background: White
Text: #1a1a1a
Border: 1px solid #1a1a1a
Padding: 12px 32px
Hover: #1a1a1a/5
```

**Accent Button (CTA)**
```css
Background: #c67c4e
Text: White
Padding: 12px 32px
Hover: #c67c4e/90
```

### Cards

**Menu Item Card**
```css
Background: White
Border: None
Shadow: None
Image: 192px height
Padding: 24px
Border-bottom: 1px solid #ebe9e6
Hover: Image scale 105%
```

**Feature Card**
```css
Background: White
Border: 1px solid #ebe9e6
Padding: 32px 24px
Icon: 48px × 48px
Icon background: Primary/Accent/Secondary
```

### Navigation Bar
```css
Background: White/95 + backdrop blur
Border-bottom: 1px solid #ebe9e6
Fixed: Top 0
Z-index: 50
Height: 64px
```

---

## Layout Patterns

### Hero Section
```
Grid: 1 col (mobile) → 2 col (desktop)
Gap: 48px-64px
Content: 1/2 width
Image: 1/2 width, full height
```

### Feature Grid
```
Mobile:  1 column
Tablet:  2 columns
Desktop: 3 columns
Gap: 48px
```

### Menu Grid
```
Mobile:  1 column
Tablet:  2 columns
Desktop: 2 columns (with sidebar)
Gap: 32px
```

### Section Layout
```
Max-width: 80rem (1280px)
Padding: 24px (mobile) → 24px (desktop)
Vertical spacing: 80px-128px
```

---

## Interactive Elements

### Hover States
```
Text links        → 70% opacity
Card borders      → Darken by 20%
Images            → Scale 105%
Buttons           → 10% opacity change
Icon boxes        → Scale 105%
```

### Transitions
```
All elements      → 300ms ease-out
Fast interaction  → 200ms ease-out
Smooth scroll     → 500ms ease
```

### Active States
```
Buttons           → Scale 95% (on click)
Links             → Underline
Navigation items  → Underline + color change
Filters           → Background color change
```

---

## Images

### Image Specifications

**Hero Image**
```
Aspect Ratio: 1:1 (mobile) → 16:9 (desktop)
Min-height: 400px
Object-fit: cover
File size: < 200KB (optimized)
Format: JPG
```

**Menu Item Images**
```
Aspect Ratio: 16:9 or 4:3
Height: 192px-240px
Object-fit: cover
File size: < 100KB (optimized)
Format: JPG
```

**Section Images**
```
Aspect Ratio: 1:1
Height: 400px-500px
Object-fit: cover
File size: < 200KB (optimized)
```

---

## Dark Mode

### Dark Theme Colors
```
Background:       #0f0f0f
Card:             #1a1a1a
Text:             #f5f5f5
Text Secondary:   #999999
Border:           #2a2a2a
Muted:            #333333

Primary (inverted): #ffffff
Accent:           #c67c4e (unchanged)
```

---

## Responsive Breakpoints

```
Mobile:           0px - 640px
Tablet:           641px - 1024px
Desktop:          1025px - 1280px
Large Desktop:    1281px+
```

### Adjustments
```
Padding:          24px (mobile) → 32px (desktop)
Gap:              16px (mobile) → 32px (desktop)
Font size:        14px (mobile) → 16px (desktop)
Headings:         36px (mobile) → 48px+ (desktop)
```

---

## Accessibility

### Color Contrast
```
Primary text on white     → 17:1 ✅
Primary on accent        → 4.5:1 ✅
Secondary on white       → 6:1 ✅
```

### Font Sizes
```
Body minimum: 16px
Links: 18px minimum touch target
Buttons: 44px × 44px minimum
```

### Keyboard Navigation
```
Tab order: Logical
Focus indicators: Visible
All buttons: Keyboard accessible
```

---

## Best Practices

### Do's ✅
- Use generous whitespace
- Stick to 2 font families
- Maintain consistent spacing
- Use the color palette
- Keep animations subtle
- Prioritize readability
- Test on mobile first
- Use quality images
- Follow the grid system

### Don'ts ❌
- Don't add rounded corners (radius: 0)
- Don't mix 3+ colors
- Don't use gradients
- Don't add excessive shadows
- Don't use decorative elements
- Don't clutter layouts
- Don't forget accessibility
- Don't use low-quality images
- Don't break the spacing system

---

## CSS Custom Properties

```css
/* Colors */
--primary: #1a1a1a;
--accent: #c67c4e;
--secondary: #8b7355;
--background: #fafaf8;
--card: #ffffff;
--muted: #e5e3e0;
--border: #ebe9e6;

/* Fonts */
--font-serif: 'Playfair Display';
--font-sans: 'Poppins';
--font-accent: 'Lora';

/* Spacing */
--radius: 0rem;  /* No rounded corners */
```

---

## Component Snippets

### Section Wrapper
```html
<section class="py-20 md:py-32">
  <div class="max-w-7xl mx-auto px-6">
    <!-- Content -->
  </div>
</section>
```

### Feature Card
```html
<div class="space-y-4">
  <div class="w-12 h-12 bg-primary text-white flex items-center justify-center">
    <Icon />
  </div>
  <h3 class="text-xl font-serif font-bold">Title</h3>
  <p class="text-muted-foreground">Description</p>
</div>
```

### Button
```html
<button class="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-medium">
  Label
</button>
```

### Text Section
```html
<div>
  <h2 class="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
    Heading
  </h2>
  <p class="text-lg text-muted-foreground leading-relaxed">
    Description
  </p>
</div>
```

---

## Animation Guidelines

### Transitions
- Duration: 300ms default
- Easing: ease-out
- Properties: transform, opacity, color

### Hover Effects
- Image: scale(1.05)
- Button: opacity 90%
- Card: subtle shadow change

### No Heavy Animations
- Keep it minimal
- Avoid distracting effects
- Focus on usability
- Prefer CSS over JS

---

## Export Format

When creating new images:
1. **Format**: JPG (for compression)
2. **Size**: Max 200KB per image
3. **Resolution**: 1200px wide minimum
4. **Quality**: High (85-90% JPG quality)
5. **Optimization**: Compress before upload

---

## Implementation Checklist

- [ ] Update all text content
- [ ] Replace all images
- [ ] Update menu items
- [ ] Test on mobile
- [ ] Test on tablet
- [ ] Test on desktop
- [ ] Check dark mode
- [ ] Verify accessibility
- [ ] Test WhatsApp integration
- [ ] Deploy to production

---

This design reference ensures consistency across your Café Direct website!
