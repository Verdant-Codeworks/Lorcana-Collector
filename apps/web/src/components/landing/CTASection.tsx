import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from './ScrollReveal';

export function CTASection() {
  return (
    <section className="px-4 py-24">
      <ScrollReveal>
        <div className="mx-auto max-w-2xl rounded-2xl border border-magic/15 bg-card/90 p-8 text-center backdrop-blur-sm shadow-[var(--shadow-glow-mixed)] sm:p-12">
          <h2 className="mb-3 text-2xl font-bold sm:text-3xl">
            Start Tracking Your Collection
          </h2>
          <p className="mb-8 text-muted-foreground">
            Free to use. No ads. Built by fans, for fans.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild variant="enchanted" size="lg">
              <Link to="/register">Create Free Account</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/browse">Browse Cards</Link>
            </Button>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
