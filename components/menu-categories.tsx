'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface MenuCategoriesProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { name: 'Starters', icon: '🥗' },
  { name: 'Main Course', icon: '🍽️' },
  { name: 'Drinks', icon: '🥤' },
];

export function MenuCategories({ activeCategory, onCategoryChange }: MenuCategoriesProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-6 mb-12 justify-center md:justify-start">
      {categories.map((category) => (
        <Button
          key={category.name}
          onClick={() => onCategoryChange(category.name)}
          className={`whitespace-nowrap transition-all duration-300 font-semibold text-base px-6 py-3 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 ${
            activeCategory === category.name
              ? 'bg-gradient-to-r from-accent to-orange-500 text-white hover:shadow-xl'
              : 'border-2 border-accent/30 bg-card text-card-foreground hover:border-accent hover:bg-accent/5'
          }`}
        >
          <span className="text-xl mr-2">{category.icon}</span>
          {category.name}
        </Button>
      ))}
    </div>
  );
}
