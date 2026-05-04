'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { CartItemComponent } from '@/components/cart-item';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CartItem } from '@/lib/types';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

function CartContent() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const tableNumber = searchParams.get('table') || '0';

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cafe-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const handleIncrement = (id: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id: string) => {
    setCart((prevCart) => {
      const item = prevCart.find((item) => item.id === id);
      if (item && item.quantity > 1) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prevCart.filter((item) => item.id !== id);
    });
  };

  const handleRemove = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cafe-cart', JSON.stringify(cart));
  }, [cart]);

  const handleWhatsAppOrder = () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Please enter your name and phone number');
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    const itemsList = cart.map((item) => `${item.name} x${item.quantity}`).join('\n');
    const message = `New Order from Café Direct\n\nCustomer Name: ${customerName}\nPhone: ${customerPhone}\nTable: ${tableNumber}\n\nItems:\n${itemsList}\n\nTotal: ₹${totalPrice}\n\nPlease confirm this order!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '9885629388';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <main className="min-h-screen bg-background">
      <Header cartCount={itemCount} tableNumber={tableNumber} />

      <div className="container mx-auto px-4 py-12">
        <Link href={`/?table=${tableNumber}`}>
          <Button
            className="mb-12 border-2 border-primary text-primary bg-transparent hover:bg-primary/10 transition-all duration-300 font-semibold px-6 py-3 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Menu
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-accent/30 bg-gradient-to-br from-card to-card/50 shadow-lg">
              <CardHeader className="border-b-2 border-accent/20 bg-gradient-to-r from-accent/5 to-primary/5 py-6">
                <CardTitle className="text-3xl font-serif text-card-foreground">🛒 Your Cart</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {cart.length > 0 ? (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <CartItemComponent
                        key={item.id}
                        item={item}
                        onIncrement={handleIncrement}
                        onDecrement={handleDecrement}
                        onRemove={handleRemove}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="text-7xl mb-4 animate-bounce">🛒</div>
                    <p className="text-2xl font-serif text-muted-foreground mb-6">Your cart is empty</p>
                    <Link href={`/?table=${tableNumber}`}>
                      <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95">
                        Browse Menu
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Checkout */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card className="border-2 border-secondary/30 bg-gradient-to-br from-card to-card/50 sticky top-24 shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="border-b-2 border-secondary/20 bg-gradient-to-r from-secondary/5 to-accent/5 py-5">
                <CardTitle className="text-2xl font-serif text-card-foreground">📋 Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3 pb-4 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Items</span>
                    <span className="font-semibold text-card-foreground">{itemCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold text-card-foreground">₹{totalPrice}</span>
                  </div>
                </div>
                <div className="flex justify-between text-xl">
                  <span className="font-bold text-card-foreground">Total</span>
                  <span className="font-bold text-primary text-2xl">₹{totalPrice}</span>
                </div>
              </CardContent>
            </Card>

            {/* Checkout Form */}
            {cart.length > 0 && (
              <Card className="border-2 border-accent/30 bg-gradient-to-br from-card to-card/50 shadow-lg">
                <CardHeader className="border-b-2 border-accent/20 bg-gradient-to-r from-accent/5 to-primary/5 py-5">
                  <CardTitle className="text-2xl font-serif text-card-foreground">👤 Your Details</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="border-border bg-input text-card-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="border-border bg-input text-card-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      Table Number
                    </label>
                    <div className="p-3 bg-muted rounded-lg text-card-foreground font-semibold">
                      Table {tableNumber}
                    </div>
                  </div>

                  <Button
                    onClick={handleWhatsAppOrder}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white transition-all duration-300 hover:shadow-2xl text-lg py-6 font-bold shadow-lg hover:scale-105 active:scale-95"
                  >
                    <span className="text-2xl mr-2">📱</span>
                    Order via WhatsApp
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    You will be redirected to WhatsApp to confirm your order
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function CartPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <CartContent />
    </Suspense>
  );
}
