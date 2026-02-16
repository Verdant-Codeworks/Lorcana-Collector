import { Link } from 'react-router';
import { Footer } from '@/components/layout/Footer';

export function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background overflow-hidden">
      {/* Ambient inkwell glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-magic/8 blur-[120px]" />
        <div className="absolute left-1/3 top-1/3 h-[300px] w-[300px] rounded-full bg-enchant/6 blur-[100px]" />
        <div className="absolute right-1/3 bottom-1/3 h-[200px] w-[200px] rounded-full bg-primary/8 blur-[80px]" />
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-lg space-y-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <img src="/logo.svg" alt="Illumineer Vault" className="h-12" />
            <p className="text-lg text-muted-foreground">
              Your personal Disney Lorcana collection tracker
            </p>
          </div>

          <div className="rounded-lg border border-magic/15 bg-card/90 p-6 backdrop-blur-sm shadow-[var(--shadow-glow-mixed)]">
            <ul className="space-y-3 text-sm text-muted-foreground text-left">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-primary">&#9670;</span>
                <span>Browse the complete Lorcana card catalog with powerful filters</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-primary">&#9670;</span>
                <span>Track your collection and see what you own at a glance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-primary">&#9670;</span>
                <span>Create collections by character, franchise, release set, and more</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/browse"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
            >
              Browse Cards
            </Link>
            <Link
              to="/login"
              className="inline-flex h-10 items-center justify-center rounded-md border border-magic/20 bg-card/80 px-6 text-sm font-medium text-foreground shadow-sm hover:bg-card transition-colors"
            >
              Sign In
            </Link>
          </div>

          <p className="text-xs text-muted-foreground">
            Create a free account to start building your collection
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
