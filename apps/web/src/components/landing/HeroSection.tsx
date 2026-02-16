import { Link } from 'react-router';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ParallaxLayer } from './ParallaxLayer';

interface HeroSectionProps {
  scrollY: number;
  reducedMotion: boolean;
}

export function HeroSection({ scrollY, reducedMotion }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4">
      {/* Floating card silhouettes */}
      <ParallaxLayer scrollY={scrollY} speed={-0.08} reducedMotion={reducedMotion} className="absolute inset-0">
        <div className="absolute left-[10%] top-[15%] h-28 w-20 rotate-[-12deg] rounded-xl border border-magic/10 bg-magic/5" />
        <div className="absolute right-[12%] top-[20%] h-32 w-24 rotate-[8deg] rounded-xl border border-enchant/10 bg-enchant/5" />
        <div className="absolute left-[20%] bottom-[25%] h-24 w-18 rotate-[15deg] rounded-xl border border-primary/10 bg-primary/5" />
        <div className="absolute right-[18%] bottom-[20%] h-28 w-20 rotate-[-6deg] rounded-xl border border-magic/8 bg-magic/4" />
      </ParallaxLayer>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <img src="/logo.svg" alt="Illumineer Vault" className="h-16 animate-float" />
        <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
          Illumineer Vault
        </h1>
        <p className="max-w-md text-lg text-muted-foreground">
          Your personal Disney Lorcana collection tracker. Browse, collect, and complete your card sets.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button asChild variant="enchanted" size="lg">
            <Link to="/browse">Browse Cards</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/register">Get Started Free</Link>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Scroll to explore</span>
        <ChevronDown className="h-5 w-5 animate-bounce-subtle text-primary" />
      </div>
    </section>
  );
}
