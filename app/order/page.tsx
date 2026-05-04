'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MenuItem, CartItem } from '@/lib/types';
import { menuItems } from '@/lib/menu-data';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, X, Plus, Minus, ShoppingCart, Menu as MenuIcon } from 'lucide-react';

const categoryConfig: Record<string, { emoji: string, time: string }> = {
  'Starters': { emoji: '🥗', time: '12 PM - 4 PM' },
  'Main Course': { emoji: '🍝', time: '12 PM - 10 PM' },
  'Drinks': { emoji: '🍹', time: 'All Day' },
};

function OrderContent() {
  const [activeCategory, setActiveCategory] = useState('Starters');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const searchParams = useSearchParams();
  const tableNumber = searchParams.get('table') || '1';

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cafe-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cafe-cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(itemId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) {
      alert('Please add items to your cart');
      return;
    }

    const orderItems = cart
      .map((item) => `${item.name} x${item.quantity} - ₹${item.price * item.quantity}`)
      .join('\n');
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const message = `Hi Café Direct,\n\nI would like to order the following items for Table ${tableNumber}:\n\n${orderItems}\n\nTotal: ₹${total}\n\nPlease confirm my order. Thank you!`;

    const whatsappNumber = '9885629388';
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  const filteredItems = menuItems.filter((item) => item.category === activeCategory);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const categories = ['Starters', 'Main Course', 'Drinks'];

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500/30">
      {/* Floating Pill Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#111111]/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center justify-between w-[92%] max-w-3xl shadow-2xl">
        <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition-colors flex-shrink-0">
          <ArrowLeft className="w-5 h-5 text-white/80" />
        </Link>
        <h1 className="text-xl md:text-2xl font-serif tracking-[0.2em] text-white uppercase px-4 truncate">
          Order Now
        </h1>
        <button
          onClick={() => setShowCart(!showCart)}
          className="relative p-2 hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
        >
          <ShoppingCart className="w-5 h-5 text-white/80" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </nav>

      <div className="pt-32 max-w-6xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 relative">
          
          {/* Main Menu Area */}
          <div className="xl:col-span-2 relative">
            {/* Glowing Container */}
            <div className="relative rounded-[2rem] bg-black border border-white/5 shadow-[0_0_80px_rgba(50,100,255,0.07)] p-4 sm:p-8 md:p-12 overflow-hidden">
              
              {/* Subtle background gradients inside container */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-48 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

              <div className="relative z-10">
                {/* Category Filters (Pill style) */}
                <div className="mb-12 flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-6 py-3 rounded-full whitespace-nowrap transition-all duration-300 font-medium text-sm tracking-wide ${
                        activeCategory === category
                          ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                          : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-white/10 gap-2">
                  <h2 className="text-3xl font-serif tracking-widest text-white uppercase flex items-center gap-3">
                    <span className="text-2xl">{categoryConfig[activeCategory]?.emoji}</span>
                    {activeCategory}
                  </h2>
                  <span className="text-sm font-sans text-white/50 tracking-wider">
                    {categoryConfig[activeCategory]?.time}
                  </span>
                </div>

                {/* Menu Items List */}
                <div className="space-y-4">
                  {filteredItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="group relative flex flex-col sm:flex-row sm:items-center p-4 bg-[#111111]/60 hover:bg-[#1a1a1a] border border-white/5 rounded-2xl transition-all duration-300 backdrop-blur-sm"
                    >
                      {/* Left: Small square image */}
                      <div className="flex items-center gap-4 mb-4 sm:mb-0 sm:mr-4">
                        {item.image ? (
                          <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-xl bg-[#222]">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        ) : (
                          <div className="w-20 h-20 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                            <span className="text-2xl">🍽️</span>
                          </div>
                        )}
                        
                        {/* Mobile Info (visible on small screens alongside image) */}
                        <div className="sm:hidden flex-1 min-w-0">
                          <h3 className="text-lg font-sans font-semibold text-white/90 truncate">{item.name}</h3>
                          <div className="inline-flex items-center justify-center px-3 py-1 mt-2 rounded-lg bg-white/5 border border-white/10">
                            <span className="text-white/90 font-sans font-medium text-sm">₹{item.price}</span>
                          </div>
                        </div>
                      </div>

                      {/* Center: Desktop Info */}
                      <div className="hidden sm:block flex-1 min-w-0 pr-4">
                        <h3 className="text-xl font-sans font-medium text-white/90 truncate">{item.name}</h3>
                        <p className="text-sm text-white/40 line-clamp-2 mt-1.5 leading-relaxed font-light">{item.description}</p>
                      </div>

                      {/* Mobile Description */}
                      <p className="sm:hidden text-sm text-white/40 line-clamp-2 mb-4 font-light leading-relaxed">{item.description}</p>

                      {/* Right: Price & Add Button */}
                      <div className="shrink-0 flex items-center sm:flex-col sm:items-end justify-between sm:justify-center gap-3">
                        <div className="hidden sm:flex px-4 py-2 rounded-xl bg-white/5 border border-white/10 items-center justify-center">
                          <span className="text-white/90 font-sans font-medium">₹{item.price}</span>
                        </div>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(item);
                          }}
                          variant="ghost"
                          className="w-full sm:w-auto h-10 px-6 rounded-xl bg-white text-black hover:bg-gray-200 transition-colors font-medium"
                        >
                          Add to Order
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Cart Sidebar (Desktop: Sticky, Mobile: Modal/Drawer style if showCart is true) */}
          <div className={`xl:block ${showCart ? 'block' : 'hidden'} relative z-40`}>
            {/* Mobile backdrop */}
            {showCart && (
              <div 
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 xl:hidden"
                onClick={() => setShowCart(false)}
              />
            )}
            
            <div className={`
              ${showCart ? 'fixed inset-y-0 right-0 w-full sm:w-96 p-4 z-40 animate-slideInRight' : 'sticky top-32'}
            `}>
              <div className="bg-[#111111] border border-white/10 rounded-[2rem] p-6 sm:p-8 h-full xl:h-auto max-h-[calc(100vh-2rem)] flex flex-col shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-serif tracking-widest text-white uppercase">Your Order</h3>
                  {showCart && (
                    <button onClick={() => setShowCart(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors xl:hidden">
                      <X className="w-5 h-5 text-white/60" />
                    </button>
                  )}
                </div>

                {cart.length > 0 ? (
                  <div className="flex-1 overflow-hidden flex flex-col">
                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center gap-3 pb-4 border-b border-white/5">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-sans font-medium text-white/90 text-sm truncate">{item.name}</h4>
                            <p className="text-xs text-white/40 mt-1">₹{item.price}</p>
                          </div>
                          <div className="flex items-center gap-3 bg-white/5 rounded-full px-2 py-1 border border-white/5 shrink-0">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:text-white text-white/60 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-4 text-center font-medium text-sm text-white/90">{item.quantity}</span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:text-white text-white/60 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Totals & Checkout */}
                    <div className="pt-6 mt-4 border-t border-white/10 space-y-4 shrink-0">
                      <div className="flex justify-between text-sm text-white/60">
                        <span>Subtotal</span>
                        <span>₹{cartTotal}</span>
                      </div>
                      <div className="flex justify-between text-lg font-serif tracking-wide text-white">
                        <span>Total</span>
                        <span>₹{cartTotal}</span>
                      </div>
                      <Button
                        onClick={handleWhatsAppOrder}
                        className="w-full bg-white hover:bg-gray-200 text-black rounded-xl py-6 font-semibold tracking-wide mt-2 transition-colors"
                      >
                        Order via WhatsApp
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center py-12 opacity-50">
                    <ShoppingCart className="w-12 h-12 text-white/40 mb-4" />
                    <p className="text-white/60 font-sans text-sm">Your cart is empty</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
      <OrderContent />
    </Suspense>
  );
}
