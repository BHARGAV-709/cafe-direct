'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Instagram, Facebook, Twitter, MapPin, Phone, Mail, Star, Moon, Sun, User as UserIcon, LogOut } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bookingStatus, setBookingStatus] = useState('');
  const { data: session, status } = useSession();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBookingStatus('Submitting...');
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      date: formData.get('date'),
      time: formData.get('time'),
      guests: formData.get('guests'),
    };

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setBookingStatus('Table booked successfully!');
        (e.target as HTMLFormElement).reset();
      } else {
        setBookingStatus('Failed to book table. Try again.');
      }
    } catch (err) {
      setBookingStatus('An error occurred.');
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border transition-all">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          {/* Left Links */}
          <div className="flex-1 flex items-center gap-8 hidden md:flex">
            <Link href="#our-story" className="text-xs font-semibold tracking-[0.2em] uppercase hover:text-[#C9A050] transition-colors">Our Story</Link>
            <Link href="#gallery" className="text-xs font-semibold tracking-[0.2em] uppercase hover:text-[#C9A050] transition-colors">Gallery</Link>
            <Link href="#book-table" className="text-xs font-semibold tracking-[0.2em] uppercase hover:text-[#C9A050] transition-colors">Book Table</Link>
          </div>

          {/* Center Logo */}
          <Link href="/" className="text-3xl font-serif font-bold tracking-widest text-[#0D2C22] dark:text-white uppercase text-center flex-1">
            Café Direct
          </Link>

          {/* Right Links */}
          <div className="flex-1 flex items-center justify-end gap-8 hidden md:flex">
            <Link href="/menu" className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A050] hover:text-[#0D2C22] dark:hover:text-white transition-colors">Menu</Link>
            
            {status === 'authenticated' && session.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <div className="w-10 h-10 rounded-full bg-[#C9A050] flex items-center justify-center text-white font-serif font-bold cursor-pointer hover:opacity-90 transition-opacity overflow-hidden">
                    {session.user.image ? (
                       <img src={session.user.image} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                       <span>{session.user.name?.charAt(0).toUpperCase() || 'U'}</span>
                    )}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-2 p-2">
                  <DropdownMenuItem onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="cursor-pointer flex items-center gap-3">
                    {mounted && theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    <span>{mounted && theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer flex items-center gap-3">
                    <UserIcon className="w-4 h-4" />
                    <span>My Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer flex items-center gap-3 text-red-500 focus:text-red-500">
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login" className="text-xs font-semibold tracking-[0.2em] uppercase hover:text-[#C9A050] transition-colors">Log In</Link>
                <Link href="/register" className="px-6 py-2.5 border border-[#0D2C22] dark:border-white text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#0D2C22] dark:hover:bg-white hover:text-white dark:hover:text-[#0D2C22] transition-colors">Sign Up</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border py-6 px-6 flex flex-col gap-6 shadow-xl">
            <Link href="/menu" onClick={() => setIsMenuOpen(false)} className="text-sm font-semibold tracking-[0.2em] uppercase text-[#C9A050]">Menu</Link>
            <Link href="#our-story" onClick={() => setIsMenuOpen(false)} className="text-sm font-semibold tracking-[0.2em] uppercase">Our Story</Link>
            <Link href="#gallery" onClick={() => setIsMenuOpen(false)} className="text-sm font-semibold tracking-[0.2em] uppercase">Gallery</Link>
            <Link href="#book-table" onClick={() => setIsMenuOpen(false)} className="text-sm font-semibold tracking-[0.2em] uppercase">Book Table</Link>
            <div className="h-px bg-border w-full my-2"></div>
            
            {status === 'authenticated' && session.user ? (
              <>
                <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="text-sm font-semibold tracking-[0.2em] uppercase flex items-center gap-2">
                  <UserIcon className="w-4 h-4" /> Profile
                </Link>
                <button onClick={() => { setTheme(theme === 'dark' ? 'light' : 'dark'); setIsMenuOpen(false); }} className="text-sm font-semibold tracking-[0.2em] uppercase text-left flex items-center gap-2">
                  {mounted && theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />} {mounted && theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                </button>
                <button onClick={() => { signOut(); setIsMenuOpen(false); }} className="text-sm font-semibold tracking-[0.2em] uppercase text-left text-red-500 flex items-center gap-2">
                  <LogOut className="w-4 h-4" /> Log Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsMenuOpen(false)} className="text-sm font-semibold tracking-[0.2em] uppercase">Log In</Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)} className="text-sm font-semibold tracking-[0.2em] uppercase">Sign Up</Link>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden pt-20">
        <Image
          src="/hero-cafe.jpg"
          alt="Café Direct Interior"
          fill
          className="object-cover scale-105 animate-[slowZoom_20s_ease-in-out_infinite_alternate]"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4 flex flex-col items-center">
          <h2 className="text-[#C9A050] font-serif italic text-3xl md:text-5xl mb-6 tracking-wide drop-shadow-lg">Experience the Art of</h2>
          <h1 className="text-5xl md:text-[6rem] lg:text-[8rem] leading-none font-serif font-bold text-[#F5F5F0] uppercase tracking-[0.1em] mb-12 drop-shadow-2xl">
            Fine Dining
          </h1>
          <Link href="/menu">
            <button className="px-10 py-4 bg-[#C9A050] text-white text-sm font-medium tracking-[0.2em] uppercase hover:bg-[#F5F5F0] hover:text-[#0D2C22] transition-colors duration-500 shadow-xl">
              Explore Our Menu
            </button>
          </Link>
        </div>
      </section>

      {/* Our Story Section (Dark Forest Green) */}
      <section id="our-story" className="py-24 md:py-32 bg-[#0D2C22] text-[#F5F5F0] relative overflow-hidden">
        {/* Background typographic watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] md:text-[20rem] font-serif font-bold opacity-[0.03] pointer-events-none whitespace-nowrap">
          LEGACY
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-[#C9A050] font-serif italic text-2xl mb-4">Our Story</h3>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-8 leading-tight">A Journey of Flavors & Tradition</h2>
            <p className="text-[#F5F5F0]/70 leading-relaxed font-light mb-6 text-lg">
              At Café Direct, we blend heritage with culinary innovation. What began as a humble roastery has blossomed into a destination for gastronomes who appreciate the finer details of dining.
            </p>
            <p className="text-[#F5F5F0]/70 leading-relaxed font-light mb-10 text-lg">
              Every dish we serve is a narrative of carefully sourced ingredients, masterfully prepared to offer an unforgettable experience. Welcome to a place where time slows down and taste takes center stage.
            </p>
            <Link href="#gallery" className="inline-block text-[#C9A050] uppercase tracking-[0.2em] text-xs font-bold border-b-2 border-[#C9A050] pb-2 hover:text-white hover:border-white transition-all duration-300">
              Discover More
            </Link>
          </div>
          <div className="order-1 md:order-2 relative h-[400px] md:h-[600px] rounded-t-[100px] overflow-hidden shadow-2xl">
            {/* Fallback pattern if image is missing */}
            <div className="absolute inset-0 bg-[#0A221A]" />
            <Image
              src="/pastries.jpg"
              alt="Culinary Excellence"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* Featured Pillars Section */}
      <section className="py-24 md:py-32 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h3 className="text-[#C9A050] font-serif italic text-2xl mb-4">The Experience</h3>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0D2C22]">Pillars of Excellence</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {/* Pillar 1 */}
            <div className="group">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-[#0D2C22] text-[#C9A050] rounded-full group-hover:-translate-y-2 transition-transform duration-300">
                <span className="font-serif italic text-2xl">01</span>
              </div>
              <h4 className="text-2xl font-serif font-bold mb-4">Premium Sourcing</h4>
              <p className="text-[#0D2C22]/70 leading-relaxed font-light">
                We traverse the globe to bring you the finest coffee beans and authentic Indian spices, ensuring quality in every sip and bite.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="group">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-[#0D2C22] text-[#C9A050] rounded-full group-hover:-translate-y-2 transition-transform duration-300">
                <span className="font-serif italic text-2xl">02</span>
              </div>
              <h4 className="text-2xl font-serif font-bold mb-4">Masterful Craft</h4>
              <p className="text-[#0D2C22]/70 leading-relaxed font-light">
                Our chefs and baristas are artisans of their trade, dedicated to perfecting traditional recipes with modern techniques.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="group">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-[#0D2C22] text-[#C9A050] rounded-full group-hover:-translate-y-2 transition-transform duration-300">
                <span className="font-serif italic text-2xl">03</span>
              </div>
              <h4 className="text-2xl font-serif font-bold mb-4">Elegant Ambiance</h4>
              <p className="text-[#0D2C22]/70 leading-relaxed font-light">
                Step into a world of sophisticated design, warm lighting, and impeccable service that elevates your dining experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Action Banner */}
      <section className="py-24 bg-[#0D2C22] text-center px-6">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#F5F5F0] mb-8">Ready for an Unforgettable Meal?</h2>
        <Link href="/menu">
          <button className="px-10 py-4 bg-[#C9A050] text-white text-sm font-medium tracking-[0.2em] uppercase hover:bg-white hover:text-[#0D2C22] transition-colors duration-500">
            View The Menu
          </button>
        </Link>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-white text-[#0D2C22] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#C9A050] font-medium tracking-[0.2em] text-xs uppercase border-b border-[#C9A050] pb-1">What They Say</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mt-6 mb-4">What Our Customers<br />Say About Us</h2>
            <div className="flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`w-3 h-3 ${i % 2 === 0 ? 'bg-[#C9A050]' : 'border border-[#C9A050]'} transform rotate-45`}></div>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left Image */}
            <div className="lg:w-5/12 relative">
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-full rounded-tr-none border-[12px] border-[#F5F5F0] shadow-2xl z-10">
                <Image src="/pastries.jpg" alt="Chef tasting food" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#C9A050]/20 rounded-full blur-[80px]"></div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#0D2C22]/20 rounded-full blur-[80px]"></div>
            </div>

            {/* Right Reviews Grid */}
            <div className="lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-8 gap-y-12 mt-12 lg:mt-0">
              {/* Review 1 */}
              <div className="bg-[#F5F5F0] rounded-3xl p-8 pt-10 shadow-lg relative mt-6 sm:mt-0 hover:-translate-y-2 transition-transform duration-300">
                <div className="absolute -top-8 left-8 w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md">
                  <div className="w-full h-full bg-[#0D2C22] flex items-center justify-center text-[#C9A050] font-serif italic text-xl">MD</div>
                </div>
                <div className="flex justify-end mb-4 text-[#C9A050]">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <h4 className="font-serif font-bold text-xl mb-3">Mark Darwin</h4>
                <p className="text-sm font-light leading-relaxed text-[#0D2C22]/80">"Italian food here really feels like heaven i would like to give it a 10 on 10"</p>
              </div>

              {/* Review 2 */}
              <div className="bg-[#F5F5F0] rounded-3xl p-8 pt-10 shadow-lg relative mt-6 sm:mt-0 hover:-translate-y-2 transition-transform duration-300">
                <div className="absolute -top-8 left-8 w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md">
                  <div className="w-full h-full bg-[#0D2C22] flex items-center justify-center text-[#C9A050] font-serif italic text-xl">JN</div>
                </div>
                <div className="flex justify-end mb-4 text-[#C9A050]">
                  {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-current' : ''}`} />)}
                </div>
                <h4 className="font-serif font-bold text-xl mb-3">Joseph Novel</h4>
                <p className="text-sm font-light leading-relaxed text-[#0D2C22]/80">"Amazing food service with proper management of staff and menu"</p>
              </div>

              {/* Review 3 */}
              <div className="bg-[#F5F5F0] rounded-3xl p-8 pt-10 shadow-lg relative mt-6 sm:mt-0 hover:-translate-y-2 transition-transform duration-300">
                <div className="absolute -top-8 left-8 w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md">
                  <div className="w-full h-full bg-[#0D2C22] flex items-center justify-center text-[#C9A050] font-serif italic text-xl">KK</div>
                </div>
                <div className="flex justify-end mb-4 text-[#C9A050]">
                  {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-current' : ''}`} />)}
                </div>
                <h4 className="font-serif font-bold text-xl mb-3">Kishore Kumar</h4>
                <p className="text-sm font-light leading-relaxed text-[#0D2C22]/80">"Chicken grilled is what made me a fan of this restaurant every sunday it has become must to try".</p>
              </div>

              {/* Review 4 */}
              <div className="bg-[#F5F5F0] rounded-3xl p-8 pt-10 shadow-lg relative mt-6 sm:mt-0 hover:-translate-y-2 transition-transform duration-300">
                <div className="absolute -top-8 left-8 w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md">
                  <div className="w-full h-full bg-[#0D2C22] flex items-center justify-center text-[#C9A050] font-serif italic text-xl">SB</div>
                </div>
                <div className="flex justify-end mb-4 text-[#C9A050]">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <h4 className="font-serif font-bold text-xl mb-3">Somyadeep Bhowmik</h4>
                <p className="text-sm font-light leading-relaxed text-[#0D2C22]/80">"DineNDelight might soon be able to compete with other restaurant chains as like Kentucky"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <span className="text-[#C9A050] font-medium tracking-[0.2em] text-xs uppercase border-b border-[#C9A050] pb-1">Visual Journey</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0D2C22] mt-6 mb-4">Our Gallery</h2>
          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`w-3 h-3 ${i % 2 === 0 ? 'bg-[#C9A050]' : 'border border-[#C9A050]'} transform rotate-45`}></div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 max-w-[1600px] mx-auto">
          <div className="relative aspect-square rounded-2xl overflow-hidden group">
            <Image src="/pastries.jpg" alt="Gallery 1" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Instagram className="text-white w-8 h-8" />
            </div>
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden group">
            <Image src="/hero-cafe.jpg" alt="Gallery 2" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Instagram className="text-white w-8 h-8" />
            </div>
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden group">
            <Image src="/pastries.jpg" alt="Gallery 3" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Instagram className="text-white w-8 h-8" />
            </div>
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden group">
            <Image src="/hero-cafe.jpg" alt="Gallery 4" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Instagram className="text-white w-8 h-8" />
            </div>
          </div>
        </div>
      </section>

      {/* Booking Table Section */}
      <section id="book-table" className="py-24 bg-[#0D2C22] text-[#F5F5F0] relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10 bg-[url('/hero-cafe.jpg')] bg-cover bg-center mix-blend-overlay"></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h3 className="text-[#C9A050] font-serif italic text-2xl mb-4">Reservations</h3>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-10">Book A Table</h2>
          <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-md shadow-2xl">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left" onSubmit={handleBooking}>
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-widest text-[#C9A050] mb-2 font-medium">Your Name</label>
                <input id="name" name="name" type="text" placeholder="John Doe" required className="w-full bg-transparent border-b border-white/20 pb-2 outline-none focus:border-[#C9A050] transition-colors placeholder:text-white/50" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-[#C9A050] mb-2 font-medium">Phone Number</label>
                <input id="phone" name="phone" type="tel" placeholder="+1 234 567 8900" required className="w-full bg-transparent border-b border-white/20 pb-2 outline-none focus:border-[#C9A050] transition-colors placeholder:text-white/50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-xs uppercase tracking-widest text-[#C9A050] mb-2 font-medium">Date</label>
                  <input id="date" name="date" type="date" required className="w-full bg-transparent border-b border-white/20 pb-2 outline-none focus:border-[#C9A050] transition-colors [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
                </div>
                <div>
                  <label htmlFor="time" className="block text-xs uppercase tracking-widest text-[#C9A050] mb-2 font-medium">Time</label>
                  <input id="time" name="time" type="time" required className="w-full bg-transparent border-b border-white/20 pb-2 outline-none focus:border-[#C9A050] transition-colors [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
                </div>
              </div>
              <div>
                <label htmlFor="guests" className="block text-xs uppercase tracking-widest text-[#C9A050] mb-2 font-medium">Guests</label>
                <select id="guests" name="guests" required defaultValue="" className="w-full bg-transparent border-b border-white/20 pb-2 outline-none focus:border-[#C9A050] transition-colors text-white [&>option]:text-[#0D2C22] appearance-none cursor-pointer">
                  <option value="" disabled className="hidden">Select Guests</option>
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4">4 People</option>
                  <option value="5">5 People</option>
                  <option value="6">6 People</option>
                  <option value="6+">6+ People</option>
                </select>
              </div>
              <div className="md:col-span-2 mt-4 text-center">
                {bookingStatus && <p className="mb-4 text-[#C9A050] text-sm">{bookingStatus}</p>}
                <button type="submit" className="w-full py-4 bg-[#C9A050] text-white text-sm font-medium tracking-[0.2em] uppercase hover:bg-white hover:text-[#0D2C22] transition-colors duration-500 rounded-none">
                  Confirm Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A221A] text-[#F5F5F0] pt-20 pb-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="md:col-span-1">
              <h2 className="text-3xl font-serif font-bold tracking-widest uppercase mb-6 text-[#C9A050]">Café Direct</h2>
              <p className="text-[#F5F5F0]/60 font-light leading-relaxed mb-6">
                A sanctuary of taste, offering a luxurious blend of artisan coffee and authentic Indian cuisine.
              </p>
              <div className="flex gap-4">
                <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#C9A050] hover:border-[#C9A050] transition-colors"><Instagram className="w-4 h-4" /></a>
                <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#C9A050] hover:border-[#C9A050] transition-colors"><Facebook className="w-4 h-4" /></a>
                <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#C9A050] hover:border-[#C9A050] transition-colors"><Twitter className="w-4 h-4" /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-serif text-lg font-bold mb-6 tracking-wider">Explore</h4>
              <ul className="space-y-4">
                <li><Link href="/menu" className="text-[#F5F5F0]/60 hover:text-[#C9A050] transition-colors font-light">Our Menu</Link></li>
                <li><Link href="#our-story" className="text-[#F5F5F0]/60 hover:text-[#C9A050] transition-colors font-light">Our Story</Link></li>
                <li><Link href="#gallery" className="text-[#F5F5F0]/60 hover:text-[#C9A050] transition-colors font-light">Gallery</Link></li>
                <li><Link href="/order" className="text-[#F5F5F0]/60 hover:text-[#C9A050] transition-colors font-light">Order Online</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-serif text-lg font-bold mb-6 tracking-wider">Contact</h4>
              <ul className="space-y-4 font-light text-[#F5F5F0]/60">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C9A050] shrink-0 mt-1" />
                  <span className="text-sm">Plot no.30/C, Sy No.83/1, Tower - 2, Orbit Building,<br />TSIIC, Raidurgam, Penmaktha,<br />Serilingampalle (M), Hyderabad,<br />Telangana 500032</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#C9A050] shrink-0" />
                  <span className="text-sm">+91 6303439658</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#C9A050] shrink-0" />
                  <span className="text-sm">bhargavganta7@gmail.com</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-serif text-lg font-bold mb-6 tracking-wider">Newsletter</h4>
              <p className="text-[#F5F5F0]/60 font-light mb-4">Subscribe to receive updates on exclusive events and seasonal menus.</p>
              <div className="flex">
                <label htmlFor="newsletter" className="sr-only">Email address</label>
                <input
                  id="newsletter"
                  type="email"
                  placeholder="Your email address"
                  className="bg-white/5 border border-white/10 px-4 py-3 w-full text-sm outline-none focus:border-[#C9A050] transition-colors"
                />
                <button aria-label="Subscribe" className="bg-[#C9A050] px-4 py-3 text-white font-bold hover:bg-white hover:text-[#0D2C22] transition-colors">
                  →
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[#F5F5F0]/40 text-sm font-light">
            <p>&copy; {new Date().getFullYear()} Café Direct. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Global styling for custom animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes slowZoom {
          0% { transform: scale(1.05); }
          100% { transform: scale(1.15); }
        }
      `}} />
    </main>
  );
}
