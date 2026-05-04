/**
 * Café Direct Configuration
 * Customize your café details and settings here
 */

export const cafeConfig = {
  // Café Information
  name: '☕ Café Direct',
  displayName: 'Café Direct',
  tagline: 'Order directly from your favorite café',
  description: 'Browse our delicious menu and order directly to your table',

  // Contact Information
  whatsappNumber: '9885629388', // Set this to your WhatsApp business number (e.g., +1234567890)
  email: 'hello@cafedirect.com',
  phone: '+91 9XXX XXX XXX',

  // Operating Hours
  operatingHours: {
    monday: '08:00 - 22:00',
    tuesday: '08:00 - 22:00',
    wednesday: '08:00 - 22:00',
    thursday: '08:00 - 22:00',
    friday: '08:00 - 23:00',
    saturday: '09:00 - 23:00',
    sunday: '09:00 - 21:00',
  },

  // Currency Settings
  currency: '₹',
  currencyName: 'INR',

  // Delivery & Service Info
  minOrderValue: 200,
  deliveryTime: '15-20 minutes',
  serviceType: 'Table Ordering',

  // Theme Colors (matching the CSS variables in globals.css)
  colors: {
    primary: '#8b5a3c',
    accent: '#c67c4e',
    secondary: '#d4a574',
    background: '#fef6f1',
    card: '#ffffff',
  },

  // Default Table Settings
  totalTables: 20,
  defaultTableNumber: '1',

  // Features
  features: {
    enableQROrdering: true,
    enableWhatsAppOrders: true,
    enableAnalytics: true,
    enableDarkMode: true,
    enableNotifications: false,
  },

  // Notification Settings
  notifications: {
    enableOrderNotifications: true,
    enablePromotions: false,
    orderSoundAlert: true,
  },

  // Payment Settings (for future integration)
  payments: {
    acceptsCash: true,
    acceptsCard: true,
    acceptsUPI: false,
    enableOnlinePayment: false,
  },

  // Category Configuration
  categories: ['Starters', 'Main Course', 'Drinks'] as const,

  // Admin Settings
  admin: {
    defaultPassword: 'password', // CHANGE THIS IN PRODUCTION!
    sessionTimeout: 30, // minutes
  },

  // Localization
  locale: 'en-IN',
  timezone: 'Asia/Kolkata',
};

// Helper function to get WhatsApp link
export function getWhatsAppLink(message: string): string {
  const number = cafeConfig.whatsappNumber || '1234567890';
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

// Helper function to format currency
export function formatCurrency(amount: number): string {
  return `${cafeConfig.currency}${amount}`;
}

// Helper function to generate table URL
export function getTableOrderUrl(tableNumber: string): string {
  if (typeof window === 'undefined') {
    return `https://yourdomain.com/menu?table=${tableNumber}`;
  }
  return `${window.location.origin}/menu?table=${tableNumber}`;
}

// Helper function to get QR code URL
export function getQRCodeUrl(tableNumber: string): string {
  const url = getTableOrderUrl(tableNumber);
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
}

// Order message template
export function generateOrderMessage(
  customerName: string,
  customerPhone: string,
  tableNumber: string,
  items: Array<{ name: string; quantity: number }>,
  total: number
): string {
  const itemsList = items.map((item) => `${item.name} x${item.quantity}`).join('\n');

  return `New Order from ${cafeConfig.displayName}

Customer Details:
Name: ${customerName}
Phone: ${customerPhone}
Table: ${tableNumber}

Order Items:
${itemsList}

Order Total: ${formatCurrency(total)}

⏰ Ordered at: ${new Date().toLocaleTimeString('en-IN')}

Please confirm and prepare this order!`;
}

// Export for use in components
export const config = cafeConfig;
