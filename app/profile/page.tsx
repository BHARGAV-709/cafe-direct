'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, User, Mail, Phone, MapPin, Camera, Lock } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
  });
  const [image, setImage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch('/api/profile');
      if (res.ok) {
        const data = await res.json();
        setFormData(prev => ({
          ...prev,
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || '',
        }));
        setImage(data.image || '');
      }
    };
    if (status === 'authenticated') fetchProfile();
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage('');
    
    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, image }),
    });

    if (res.ok) {
      setMessage('Profile updated successfully!');
      setFormData(prev => ({...prev, password: ''}));
    } else {
      setMessage('Failed to update profile.');
    }
    setIsSaving(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (status === 'loading') return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <nav className="border-b border-border bg-background/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:text-[#C9A050] transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <h1 className="text-xl font-serif font-bold tracking-widest text-[#0D2C22] dark:text-white uppercase">My Profile</h1>
          <div className="w-24"></div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 pt-12">
        <form onSubmit={handleSubmit} className="space-y-8 bg-card p-8 rounded-2xl shadow-xl border border-border">
          <div className="flex flex-col items-center mb-8">
            <div className="relative group cursor-pointer">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#C9A050] bg-muted flex items-center justify-center text-4xl font-serif text-[#C9A050] relative shadow-lg">
                {image ? (
                  <img src={image} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span>{formData.name?.charAt(0)?.toUpperCase() || session?.user?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>
              <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            </div>
            <p className="text-sm text-muted-foreground mt-4 font-medium">Click to change profile picture</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2 text-[#0D2C22] dark:text-white"><User className="w-4 h-4 text-[#C9A050]"/> Full Name</label>
              <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-4 rounded-xl border border-border bg-background outline-none focus:border-[#C9A050] transition-colors" />
            </div>
            
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2 text-[#0D2C22] dark:text-white"><Mail className="w-4 h-4 text-[#C9A050]"/> Email Address</label>
              <input type="email" value={formData.email} disabled className="w-full p-4 rounded-xl border border-border bg-muted/50 outline-none opacity-70 cursor-not-allowed" />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2 text-[#0D2C22] dark:text-white"><Phone className="w-4 h-4 text-[#C9A050]"/> Phone Number</label>
              <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+1 234 567 8900" className="w-full p-4 rounded-xl border border-border bg-background outline-none focus:border-[#C9A050] transition-colors" />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2 text-[#0D2C22] dark:text-white"><MapPin className="w-4 h-4 text-[#C9A050]"/> Delivery Address</label>
              <textarea value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} rows={3} placeholder="123 Coffee Street, City..." className="w-full p-4 rounded-xl border border-border bg-background outline-none focus:border-[#C9A050] transition-colors resize-none" />
            </div>
            
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2 text-[#0D2C22] dark:text-white"><Lock className="w-4 h-4 text-[#C9A050]"/> New Password</label>
              <input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} placeholder="Leave blank to keep current password" className="w-full p-4 rounded-xl border border-border bg-background outline-none focus:border-[#C9A050] transition-colors" />
            </div>
          </div>

          {message && <p className={`text-center font-medium ${message.includes('success') ? 'text-green-600' : 'text-red-500'}`}>{message}</p>}

          <button type="submit" disabled={isSaving} className="w-full py-4 bg-[#C9A050] text-white font-bold tracking-widest uppercase rounded-xl hover:bg-[#0D2C22] transition-colors duration-300">
            {isSaving ? 'Saving Changes...' : 'Save Profile'}
          </button>
        </form>
      </main>
    </div>
  );
}
