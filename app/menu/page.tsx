'use client';

import { useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { menuItems } from '@/lib/menu-data';
import { ArrowLeft } from 'lucide-react';

function MenuContent() {
  const [activeCategory, setActiveCategory] = useState('All Menu');

  const categories = ['All Menu', 'Starters', 'Main Course', 'Drinks'];
  const filteredItems = activeCategory === 'All Menu' 
    ? menuItems 
    : menuItems.filter((item) => item.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#F5F5F0] text-[#0D2C22] font-sans selection:bg-[#0D2C22] selection:text-[#F5F5F0] pb-24">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F5F5F0]/95 backdrop-blur-md border-b border-[#0D2C22]/10 transition-all">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase hover:text-[#C9A050] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden md:inline">Home</span>
          </Link>
          <Link href="/" className="text-2xl md:text-3xl font-serif font-bold tracking-widest text-[#0D2C22] uppercase absolute left-1/2 -translate-x-1/2">
            Café Direct
          </Link>
          <div className="w-[72px]"></div> {/* Spacer for centering */}
        </div>
      </nav>

      <div className="pt-32 max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-[#C9A050] font-medium tracking-[0.2em] text-xs uppercase border-b border-[#C9A050] pb-1">Our Offerings</span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mt-6 mb-6 text-[#0D2C22]">
            A Menu for <span className="italic text-[#C9A050]">Every Palate</span>
          </h1>
          <p className="text-[#0D2C22]/70 max-w-2xl mx-auto leading-relaxed font-light">
            Every single dish on our thoughtfully curated menu is crafted with the utmost care and attention to detail, reflecting our unwavering commitment to quality, flavor, and exceptional dining experiences.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-3 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-[#0D2C22] text-[#F5F5F0] shadow-xl transform -translate-y-1'
                  : 'bg-white text-[#0D2C22] border border-[#0D2C22]/10 hover:border-[#C9A050] hover:text-[#C9A050]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
          {filteredItems.map((item) => (
            <div key={item.id} className="group flex flex-col sm:flex-row gap-6 items-start">
              {/* Image */}
              <div className="w-full sm:w-40 h-48 sm:h-40 aspect-square relative rounded-2xl overflow-hidden shrink-0 shadow-lg">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-[#0D2C22]/5 flex items-center justify-center">
                    <span className="text-4xl opacity-50">🍽️</span>
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-[#0D2C22] shadow-sm">
                  {item.category}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col pt-2 w-full">
                <div className="flex justify-between items-start gap-4 mb-3 pb-3 border-b border-[#0D2C22]/10 border-dashed">
                  <h3 className="text-2xl font-serif font-bold text-[#0D2C22] group-hover:text-[#C9A050] transition-colors leading-tight">
                    {item.name}
                  </h3>
                  <span className="text-xl font-serif italic font-bold text-[#C9A050] whitespace-nowrap">
                    ₹{item.price}
                  </span>
                </div>
                <p className="text-[#0D2C22]/80 leading-relaxed font-sans font-light text-sm md:text-[15px] mt-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F5F0]" />}>
      <MenuContent />
    </Suspense>
  );
}

