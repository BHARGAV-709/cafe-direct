'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Heart } from 'lucide-react';
import { MenuItem } from '@/lib/types';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

export function MenuItemCard({ item, onAddToCart }: MenuItemCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(item);
    setTimeout(() => setIsAdding(false), 600);
  };

  return (
    <Card className="overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 border-border bg-card cursor-pointer group h-full flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-square bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300">
            {item.category === 'Drinks' ? '🥤' : item.category === 'Starters' ? '🥗' : '🍽️'}
          </div>
        )}
        
        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all duration-200 hover:scale-110 shadow-md"
        >
          <Heart
            className={`w-5 h-5 transition-colors duration-200 ${
              isFavorite ? 'fill-destructive stroke-destructive' : 'stroke-primary'
            }`}
          />
        </button>

        {/* Category Badge */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
          <span className="text-white text-xs font-semibold">{item.category}</span>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-4 flex-grow flex flex-col">
        <h3 className="font-serif font-bold text-lg text-card-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {item.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
          {item.description}
        </p>
        <div className="flex items-baseline justify-between">
          <span className="text-3xl font-bold text-accent">₹{item.price}</span>
        </div>
      </CardContent>

      {/* Button */}
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300 font-semibold py-2 shadow-md hover:shadow-lg ${
            isAdding ? 'scale-95 opacity-80' : 'hover:scale-105'
          }`}
        >
          <Plus className="w-5 h-5 mr-2" />
          {isAdding ? 'Added!' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
}
