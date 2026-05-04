'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Coffee, Mail, Lock, ArrowRight, ChevronLeft } from 'lucide-react';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: '/',
    });

    if (res?.error) {
      setError('Invalid email or password');
      setIsLoading(false);
    } else if (res?.url) {
      router.push(res.url);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    await signIn(provider.toLowerCase(), { callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 relative bg-background">
      {/* Background Image - Mobile & Desktop Left */}
      <div className="hidden md:block relative h-full w-full">
        <Image
          src="/hero-cafe.jpg"
          alt="Café interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]" />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-12 text-white">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity w-fit">
            <div className="bg-white/20 p-2 rounded-full backdrop-blur-md">
              <ChevronLeft className="w-5 h-5" />
            </div>
            <span className="font-medium">Back to home</span>
          </Link>
          
          <div className="max-w-md animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight">
              Welcome back to <br />
              Café Direct
            </h1>
            <p className="text-lg text-white/90 font-sans">
              Sign in to access your saved orders, track loyalty points, and enjoy a seamless coffee experience.
            </p>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 md:px-16 lg:px-24 h-full relative z-10 bg-background/95 md:bg-background">
        
        {/* Mobile Back Button */}
        <Link href="/" className="md:hidden absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Home</span>
        </Link>

        <div className="w-full max-w-sm mx-auto space-y-8 animate-fadeIn" style={{ animationDelay: '100ms' }}>
          
          <div className="text-center md:text-left">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-6 md:hidden">
              <Coffee className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-serif font-bold tracking-tight mb-2">Sign in</h2>
            <p className="text-muted-foreground">
              Enter your email below to log into your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input 
                    name="email"
                    id="email" 
                    type="email" 
                    placeholder="m@example.com" 
                    className="pl-10 py-6 bg-muted/50 border-transparent focus:border-primary focus:bg-background transition-colors"
                    required 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline font-medium">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input 
                    name="password"
                    id="password" 
                    type="password" 
                    className="pl-10 py-6 bg-muted/50 border-transparent focus:border-primary focus:bg-background transition-colors"
                    required 
                  />
                </div>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button 
              type="submit"  
              className="w-full py-6 text-base font-semibold group bg-primary hover:bg-primary/90 text-primary-foreground btn-glow"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button 
              type="button"
              variant="outline" 
              className="w-full py-6 bg-background hover:bg-muted/50"
              onClick={() => handleSocialLogin('Google')}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </Button>
            <Button 
              type="button"
              variant="outline" 
              className="w-full py-6 bg-background hover:bg-muted/50"
              onClick={() => handleSocialLogin('Facebook')}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
              Facebook
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-semibold text-primary hover:underline transition-all">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
