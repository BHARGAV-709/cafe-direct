# ⚡ Quick Start Guide - Café Direct Minimalist Redesign

## View Your New Website

The website is ready! Open your browser to see:

### Pages
- **Homepage**: `http://localhost:3000`
  - Beautiful hero section
  - Feature cards
  - Menu preview
  - Footer with info

- **Menu Page**: `http://localhost:3000/menu`
  - Browse all items
  - Add to cart
  - Sticky cart sidebar
  - Order via WhatsApp

## The Dev Server is Already Running

No setup needed! The minimalist redesign is ready to go.

Just visit:
```
http://localhost:3000
```

You'll see the brand new, beautiful minimalist design! ✨

---

## 5-Minute Setup to Launch

### Step 1: Update Your Café Name & Info (1 min)
Edit **`app/page.tsx`** and change:
- Line ~45: Hero title
- Line ~49: Hero description  
- Line ~190-210: Footer with hours, location, contact

### Step 2: Replace Key Images (1 min)
Replace these in `/public/`:
- `hero-cafe.jpg` → Your café interior
- `pastries.jpg` → Your food/pastries
- Run: Save and refresh (changes appear in 2 seconds)

### Step 3: Update Menu Items (1 min)
Edit **`lib/menu-data.ts`**:
- Update item names, descriptions, prices
- Items are in the `menuItems` array
- Change `category` if needed (Starters/Main/Drinks)

### Step 4: Set WhatsApp Number (30 sec)
Edit **`app/menu/page.tsx`** Line ~17:
```typescript
const whatsappNumber = '919876543210'; // ← Change to YOUR number
```

### Step 5: Deploy (1 min)
```bash
# Push to GitHub
git add .
git commit -m "Updated café info"
git push origin main

# OR deploy directly to Vercel from v0 settings
```

---

## Test These Features

✅ **Homepage**
- Hero section with image loads
- Feature cards display nicely
- "Browse Menu" button works
- Footer shows your info

✅ **Menu Page**
- Category filters work (Starters/Main/Drinks)
- Items display with images
- Add to cart button works
- Cart counter updates

✅ **Shopping Cart**
- Items show in sidebar
- Quantity +/- controls work
- Remove button works
- Total calculates correctly
- WhatsApp button opens with pre-filled message

---

## File Locations

| File | What to Edit |
|------|-------------|
| `app/page.tsx` | Homepage text, headlines, footer |
| `app/menu/page.tsx` | WhatsApp number (line 17) |
| `lib/menu-data.ts` | Menu items, prices, descriptions |
| `app/globals.css` | Colors (change `:root` section) |
| `/public/*.jpg` | Replace images here |

---

## Customization Examples

### Change Hero Title
**File**: `app/page.tsx` (line ~45)
```typescript
<h1 className="...">
  Artisan Coffee,
  <br />
  Carefully Crafted
</h1>
// Change to your title
```

### Add New Menu Item
**File**: `lib/menu-data.ts`
```typescript
{
  id: '17',
  name: 'Cold Brew',
  description: 'Smooth and refreshing',
  price: 120,
  category: 'Drinks',
  image: '/food/cold-brew.jpg',
}
```

### Change Primary Color
**File**: `app/globals.css`
```css
:root {
  --primary: #1a1a1a;  /* Change this to your color */
  --accent: #c67c4e;
  /* ... other colors ... */
}
```

---

## Deployment Checklist

Before going live:
- [ ] Homepage text updated
- [ ] Images replaced (hero-cafe.jpg, pastries.jpg)
- [ ] Menu items customized
- [ ] WhatsApp number set
- [ ] Hours/location/contact updated
- [ ] Tested on mobile phone
- [ ] Tested on desktop
- [ ] All images under 200KB

---

## Common Tasks

**Change button colors**
→ Edit `app/globals.css` colors

**Add seasonal menu**
→ Edit `lib/menu-data.ts` items

**Update business hours**
→ Edit footer in `app/page.tsx`

**Change café name**
→ Edit navigation and footer

**Add new section to homepage**
→ Add `<section>` to `app/page.tsx`

---

## Need Help?

📖 **Read the full documentation**:
- `REDESIGN_SUMMARY.md` - Complete overview
- `DESIGN_REFERENCE.md` - Design specifications

🎨 **Design files**:
- Colors: `app/globals.css`
- Fonts: `app/layout.tsx`
- Components: `components/` folder

---

## Ready to Launch? 🚀

**Deployment options**:

1. **Vercel** (Recommended - 1 click)
   - Push to GitHub
   - Deploy from Vercel dashboard

2. **Netlify**
   - Connect GitHub repo
   - Auto-deploys on push

3. **Your own server**
   - Run `pnpm build && pnpm start`
   - Set NODE_ENV=production

---

**Status**: ✅ Production Ready
**Built with**: Next.js 16 + React 19 + Tailwind CSS v4
**Updated**: May 2026
