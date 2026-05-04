# ☕ Café Direct Ordering System

A modern, full-stack web application for cafés to accept direct orders from customers using QR codes and WhatsApp integration. Built with React, Next.js, TypeScript, and Tailwind CSS.

## 🎯 Features

### Customer Features
- ✅ **QR Code Table Ordering** - Scan table-specific QR codes to start ordering
- ✅ **Menu Browsing** - Beautiful menu with categories (Starters, Main Course, Drinks)
- ✅ **Shopping Cart** - Add/remove items with quantity controls
- ✅ **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- ✅ **WhatsApp Integration** - One-click order placement via WhatsApp
- ✅ **Persistent Cart** - Cart data saved in browser storage
- ✅ **Table Tracking** - Automatic table number from QR code URL

### Admin Features
- 📊 **Analytics Dashboard** - View total orders, revenue, and popular items
- 📋 **Order Management** - Track all incoming orders
- 🎯 **Quick Stats** - Key metrics at a glance
- 🔧 **Menu Management** - Easy access to menu settings

## 🎨 Design Features

### Restaurant/Café Theme
- **Warm Color Palette**: Brown (#8b5a3c) and orange (#c67c4e) tones
- **Elegant Typography**: Clean, readable fonts optimized for restaurants
- **Professional Layout**: Card-based design with proper spacing
- **Hover Effects**: Smooth transitions on all interactive elements
- **Dark Mode Support**: Automatic light/dark mode switching

### Interactive Elements
- 🎯 Hover animations on cards and buttons
- 📱 Smooth transitions and shadows
- ✨ Scale effects on interactive elements
- 🎪 Emoji-based visual hierarchy

## 🚀 Quick Start

### Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd cafe-direct
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:3000`

## 📱 Usage

### For Customers

1. **Scan QR Code** - Scan a table's QR code using your phone
2. **Browse Menu** - View items in different categories
3. **Add to Cart** - Click "Add to Cart" on any item
4. **Manage Cart** - Adjust quantities or remove items
5. **Checkout** - Enter your details and click "Order via WhatsApp"
6. **Confirm** - Confirm order details in WhatsApp chat

### For Admin

1. **Access Dashboard** - Navigate to `/admin`
2. **View Statistics** - See key metrics and orders
3. **Generate QR Codes** - Create table-specific QR codes
4. **Manage Orders** - Track incoming orders
5. **Check Analytics** - Monitor sales and popular items

## 🏗️ Project Structure

```
.
├── app/
│   ├── page.tsx              # Home/Menu page
│   ├── cart/
│   │   └── page.tsx          # Cart & Checkout page
│   ├── admin/
│   │   └── page.tsx          # Admin Dashboard
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles & theme
├── components/
│   ├── header.tsx            # Top navigation
│   ├── menu-categories.tsx   # Category filter
│   ├── menu-item-card.tsx    # Menu item display
│   ├── cart-item.tsx         # Cart item component
│   └── qr-info.tsx           # QR information display
├── lib/
│   ├── types.ts              # TypeScript interfaces
│   ├── menu-data.ts          # Menu items database
│   └── utils.ts              # Utility functions
└── public/                   # Static assets
```

## 🎨 Color Scheme

### Light Mode
- **Primary**: #8b5a3c (Coffee Brown)
- **Accent**: #c67c4e (Warm Orange)
- **Secondary**: #d4a574 (Tan)
- **Background**: #fef6f1 (Warm Off-white)
- **Cards**: #ffffff (White)

### Dark Mode
- **Primary**: #d4a574 (Tan)
- **Accent**: #c67c4e (Warm Orange)
- **Background**: #1a1410 (Deep Brown)
- **Cards**: #2d2420 (Dark Brown)
- **Text**: #f5e6d3 (Light Cream)

## 🔧 Key Components

### Header
- Displays café name and table number
- Shows cart count with badge
- Sticky positioning for easy access

### Menu Categories
- Filter items by category (Starters, Main Course, Drinks)
- Smooth button transitions
- Active state highlighting

### Menu Item Card
- Emoji-based category icons
- Hover scale animation on image
- Clear price and description
- One-click "Add to Cart"

### Cart Item
- Quantity adjuster with +/- buttons
- Item price and total display
- Quick remove button
- Responsive layout

### Admin Dashboard
- Statistics cards with hover scale
- Recent orders table
- Table QR code generator
- Quick action buttons

## 💾 Data Storage

### localStorage
- **cafe-cart**: Persists shopping cart data
- **cafe-orders**: Stores order history (admin)

### In-Memory
- Menu items loaded from `lib/menu-data.ts`
- Real-time cart state management

## 📱 WhatsApp Integration

### Order Format
```
New Order from Café Direct

Customer Name: [Name]
Phone: [Number]
Table: [Number]

Items:
[Item 1] x[Qty]
[Item 2] x[Qty]

Total: ₹[Amount]
```

### Implementation
- Uses WhatsApp Web API (`wa.me`)
- Pre-fills order message with customer details
- One-click sharing to café WhatsApp

## 🎯 QR Code System

### URL Format
```
https://yourdomain.com/menu?table=TABLE_NUMBER
```

### Features
- Table number automatically extracted from URL
- Persisted throughout session
- Auto-filled in order details
- Easy to generate for each table

## 🌐 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms
- Next.js supports deployment to AWS, Netlify, Render, etc.
- Build command: `pnpm build`
- Start command: `pnpm start`

## 🎮 Interactive Features

### Hover States
- ✅ Buttons: Color change + shadow
- ✅ Cards: Shadow increase + scale
- ✅ Menu items: Image scale + shadow
- ✅ Cart items: Background color change
- ✅ Stats: Scale animation

### Button Functions
- ✅ "Add to Cart": Adds item with quantity
- ✅ Quantity +/-: Updates cart item count
- ✅ Remove: Deletes item from cart
- ✅ "Order via WhatsApp": Opens WhatsApp with pre-filled message
- ✅ Category filters: Switches menu view

### Form Validation
- ✅ Name & Phone required before checkout
- ✅ Cart must have items
- ✅ All inputs validated before WhatsApp redirect

## 📊 Testing

### Manual Testing Checklist
- [ ] Home page loads correctly
- [ ] Category filters work smoothly
- [ ] Add to cart updates count
- [ ] Hover effects visible on all buttons
- [ ] Cart page displays items correctly
- [ ] Quantity adjusters work
- [ ] Remove button deletes items
- [ ] WhatsApp link includes order details
- [ ] Table number persists
- [ ] Admin dashboard shows data
- [ ] Dark mode works smoothly
- [ ] Mobile responsive on all pages

## 🔒 Security Notes

### Current Implementation
- Client-side cart storage (for MVP)
- No sensitive data transmitted
- WhatsApp integration via public Web API

### Future Improvements
- Backend API for order persistence
- Database encryption
- Admin authentication
- HTTPS-only deployment
- Input sanitization

## 🎁 Bonus Features

- 🌙 Dark mode support
- 📱 Mobile-first responsive design
- ⚡ Fast load times (Turbopack optimization)
- 🎨 Beautiful gradient backgrounds
- 🔔 Order notifications (WhatsApp)
- 📊 Basic analytics dashboard

## 🚧 Future Enhancements

- [ ] Backend API with MongoDB
- [ ] User authentication
- [ ] Payment integration
- [ ] Real-time order tracking
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Order history
- [ ] Ratings & reviews
- [ ] Special deals section
- [ ] Table reservation system

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Support

For issues or feature requests, please create a GitHub issue or contact the development team.

---

**Made with ☕ for restaurants and cafés**
