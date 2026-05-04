'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Minus, Plus, X } from 'lucide-react';
import { CartItem } from '@/lib/types';

interface CartItemComponentProps {
  item: CartItem;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
}

export function CartItemComponent({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemComponentProps) {
  return (
    <Card className="border-2 border-border bg-gradient-to-r from-card to-card/50 hover:shadow-lg hover:border-accent/50 transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-4">
          {/* Item Info */}
          <div className="flex-1 min-w-0">
            <h4 className="font-serif font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors line-clamp-1">
              {item.name}
            </h4>
            <p className="text-sm text-muted-foreground">{item.category}</p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-1 bg-gradient-to-r from-muted to-muted/50 rounded-full p-1 shadow-sm">
            <Button
              onClick={() => onDecrement(item.id)}
              className="h-8 w-8 p-0 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="w-8 text-center font-bold text-card-foreground select-none">
              {item.quantity}
            </span>
            <Button
              onClick={() => onIncrement(item.id)}
              className="h-8 w-8 p-0 rounded-full bg-accent/10 hover:bg-accent/20 text-accent transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Price */}
          <div className="text-right min-w-max">
            <p className="font-serif font-bold text-xl text-accent">₹{item.price * item.quantity}</p>
            <p className="text-xs text-muted-foreground">₹{item.price} each</p>
          </div>

          {/* Remove Button */}
          <Button
            onClick={() => onRemove(item.id)}
            className="h-9 w-9 p-0 rounded-full bg-destructive/10 hover:bg-destructive/20 text-destructive transition-all duration-200 hover:scale-110 active:scale-95 ml-2"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
