export interface MenuItem {
  id: string;
  name: string;
  category: 'Starters' | 'Main Course' | 'Drinks';
  price: number;
  description: string;
  image?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  items: CartItem[];
  totalPrice: number;
  customerName: string;
  customerPhone: string;
  tableNumber: string;
  timestamp: Date;
}
