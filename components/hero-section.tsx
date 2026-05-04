import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  imageUrl?: string;
  imageAlt?: string;
}

export function HeroSection({
  title = 'Welcome to Café Direct',
  subtitle = 'Experience premium coffee and artisan pastries',
  buttonText = 'Order Now',
  buttonLink = '/menu',
  imageUrl = '/hero-cafe.jpg',
  imageAlt = 'Café interior',
}: HeroSectionProps) {
  return (
    <section className="pt-20 pb-12 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-primary mb-6">
                {title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                {subtitle}
              </p>
            </div>
            
            <Link href={buttonLink}>
              <Button className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-base">
                {buttonText}
              </Button>
            </Link>
          </div>

          {/* Image */}
          <div className="relative aspect-square md:aspect-auto md:h-96 lg:h-[500px]">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
