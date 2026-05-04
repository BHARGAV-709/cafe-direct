'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Check } from 'lucide-react';

export default function FeaturesPage() {
  const [hoverStates, setHoverStates] = useState<{ [key: string]: boolean }>({});

  const toggleHover = (key: string) => {
    setHoverStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <Button variant="outline" size="sm" className="mb-4 border-border hover:bg-muted">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-primary">Features & Interactive Elements</h1>
          <p className="text-sm text-muted-foreground mt-1">Test all hover effects and button functionality</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Interactive Buttons Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6">Button Variations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Primary Button */}
            <Card className="border-border bg-card">
              <CardHeader className="border-b border-border pb-3">
                <CardTitle className="text-base">Primary Button</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Brown background with hover shadow effect
                </p>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all hover:shadow-md">
                  Primary Action
                </Button>
                <div className="mt-4 text-xs text-muted-foreground p-3 bg-muted rounded">
                  ✓ Hover Effect: Color fade + Shadow<br/>
                  ✓ Transition: Smooth (300ms)<br/>
                  ✓ State: Active with feedback
                </div>
              </CardContent>
            </Card>

            {/* Accent Button */}
            <Card className="border-border bg-card">
              <CardHeader className="border-b border-border pb-3">
                <CardTitle className="text-base">Accent Button (CTA)</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Orange background for call-to-action
                </p>
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground transition-all hover:shadow-lg">
                  Add to Cart
                </Button>
                <div className="mt-4 text-xs text-muted-foreground p-3 bg-muted rounded">
                  ✓ Hover Effect: Stronger Shadow<br/>
                  ✓ Use: Primary CTAs<br/>
                  ✓ Animation: Scale + Shadow
                </div>
              </CardContent>
            </Card>

            {/* Outline Button */}
            <Card className="border-border bg-card">
              <CardHeader className="border-b border-border pb-3">
                <CardTitle className="text-base">Outline Button</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Border-based secondary action
                </p>
                <Button variant="outline" className="border-border hover:bg-muted transition-colors">
                  Secondary Action
                </Button>
                <div className="mt-4 text-xs text-muted-foreground p-3 bg-muted rounded">
                  ✓ Hover Effect: Background color<br/>
                  ✓ Use: Secondary actions<br/>
                  ✓ Animation: Color fade
                </div>
              </CardContent>
            </Card>

            {/* Ghost Button */}
            <Card className="border-border bg-card">
              <CardHeader className="border-b border-border pb-3">
                <CardTitle className="text-base">Ghost Button</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Subtle background action
                </p>
                <Button variant="ghost" className="hover:bg-primary/20 transition-colors">
                  Subtle Action
                </Button>
                <div className="mt-4 text-xs text-muted-foreground p-3 bg-muted rounded">
                  ✓ Hover Effect: Soft highlight<br/>
                  ✓ Use: Quantity controls<br/>
                  ✓ Animation: Gentle fade-in
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Card Hover Effects */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6">Card Hover Effects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                className="border-border bg-card hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105"
              >
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">☕</div>
                  <h3 className="font-bold text-card-foreground mb-2">Card {i}</h3>
                  <p className="text-sm text-muted-foreground">
                    Hover to see shadow + scale effect
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Effects:</strong> Enhanced shadow (hover:shadow-lg) + subtle scale (hover:scale-105)
            </p>
          </div>
        </div>

        {/* Color Variations */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6">Color Theme</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="border-border bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
              <CardContent className="p-6 text-center">
                <div className="font-bold mb-2">Primary</div>
                <div className="text-sm font-mono">#8b5a3c</div>
              </CardContent>
            </Card>
            <Card className="border-border bg-gradient-to-br from-accent to-accent/80 text-accent-foreground">
              <CardContent className="p-6 text-center">
                <div className="font-bold mb-2">Accent</div>
                <div className="text-sm font-mono">#c67c4e</div>
              </CardContent>
            </Card>
            <Card className="border-border bg-gradient-to-br from-secondary to-secondary/80">
              <CardContent className="p-6 text-center text-secondary-foreground">
                <div className="font-bold mb-2">Secondary</div>
                <div className="text-sm font-mono">#d4a574</div>
              </CardContent>
            </Card>
            <Card className="border-border bg-gradient-to-br from-muted to-muted/80">
              <CardContent className="p-6 text-center">
                <div className="font-bold mb-2 text-muted-foreground">Muted</div>
                <div className="text-sm font-mono text-muted-foreground">#e8ddd2</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Interactive States */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6">Interactive States</h2>
          <Card className="border-border bg-card">
            <CardContent className="p-8 space-y-6">
              <div>
                <h3 className="font-bold text-card-foreground mb-3">Input Focus State</h3>
                <input
                  type="text"
                  placeholder="Click to see focus effect"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-input text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  ✓ Ring color changes to primary<br/>
                  ✓ Smooth transition animation
                </p>
              </div>

              <div>
                <h3 className="font-bold text-card-foreground mb-3">Badge Styles</h3>
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    Primary Badge
                  </Badge>
                  <Badge className="bg-accent/20 text-accent border-accent/30">
                    Accent Badge
                  </Badge>
                  <Badge variant="secondary">Secondary Badge</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  ✓ Color-coded status indicators<br/>
                  ✓ Soft opacity backgrounds
                </p>
              </div>

              <div>
                <h3 className="font-bold text-card-foreground mb-3">Hover Counter</h3>
                <Button
                  onClick={() => toggleHover('counter')}
                  className={`transition-all ${
                    hoverStates['counter']
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-primary/20'
                  }`}
                >
                  {hoverStates['counter'] ? '✓ Hovered!' : 'Try Hovering'}
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  ✓ Visual feedback on interaction<br/>
                  ✓ Color state changes
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Checklist */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6">Functionality Checklist</h2>
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Menu page loads correctly',
                  'Category filters work smoothly',
                  'Add to cart button responds',
                  'Cart count updates',
                  'Cart page displays items',
                  'Quantity +/- buttons work',
                  'Remove button deletes items',
                  'WhatsApp integration active',
                  'Table number persists',
                  'Responsive design works',
                  'Hover effects visible',
                  'Dark mode supported',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 rounded hover:bg-muted transition-colors">
                    <Check className="w-5 h-5 text-accent" />
                    <span className="text-sm text-card-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-4 py-8">
          <h3 className="text-2xl font-bold text-primary">Ready to Order?</h3>
          <p className="text-muted-foreground">Visit the menu and start browsing our delicious items</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all hover:shadow-md">
                📱 Visit Menu
              </Button>
            </Link>
            <Link href="/admin">
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground transition-all hover:shadow-md">
                📊 Admin Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
