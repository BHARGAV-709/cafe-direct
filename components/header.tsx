'use client';

import React from 'react';
import { ShoppingCart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface HeaderProps {
  cartCount: number;
  tableNumber?: string;
}

export function Header({ cartCount, tableNumber }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-border bg-card shadow-lg">
      <div className="container mx-auto px-4 py-5 flex items-center justify-between">
        {/* Logo Section */}
        <Link href={tableNumber ? `/?table=${tableNumber}` : '/'} className="flex-1">
          <div className="hover:opacity-80 transition-opacity duration-200">
            <h1 className="text-3xl font-serif font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ☕ Café Direct
            </h1>
            {tableNumber && (
              <p className="text-xs text-muted-foreground font-medium mt-1">Table {tableNumber}</p>
            )}
          </div>
        </Link>

        {/* Actions Section */}
        <div className="flex items-center gap-3 ml-auto">
          <div className="hidden sm:flex items-center gap-2 mr-2 border-r border-border pr-4">
            <Link href="/login">
              <Button variant="ghost" className="font-medium text-foreground hover:bg-muted/50 transition-colors">
                Log In
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" className="font-medium border-primary/20 hover:bg-primary/5 transition-colors">
                Sign Up
              </Button>
            </Link>
          </div>
          
          {/* Cart Button */}
          <Link href={tableNumber ? `/cart?table=${tableNumber}` : '/cart'}>
            <Button
              className="relative bg-gradient-to-r from-accent to-orange-500 hover:from-accent/90 hover:to-orange-600 text-white font-semibold text-base px-6 py-3 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <ShoppingCart className="w-6 h-6 mr-2" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-3 -right-3 bg-destructive text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center shadow-lg animate-pulse">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
