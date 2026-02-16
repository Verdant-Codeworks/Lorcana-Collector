import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ScrollReveal } from './ScrollReveal';

interface FeatureSectionProps {
  title: string;
  description: string;
  bullets: string[];
  mockup: ReactNode;
  reversed?: boolean;
  accentColor: 'enchant' | 'magic' | 'primary';
}

const glowMap = {
  enchant: 'bg-enchant/8',
  magic: 'bg-magic/8',
  primary: 'bg-primary/8',
};

export function FeatureSection({ title, description, bullets, mockup, reversed, accentColor }: FeatureSectionProps) {
  return (
    <section className="relative px-4 py-24">
      {/* Accent glow */}
      <div className={cn(
        'pointer-events-none absolute h-[400px] w-[400px] rounded-full blur-[120px]',
        glowMap[accentColor],
        reversed ? 'left-0 top-1/2 -translate-y-1/2' : 'right-0 top-1/2 -translate-y-1/2',
      )} />

      <div className={cn(
        'relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2',
        reversed && 'md:[&>*:first-child]:order-2',
      )}>
        {/* Text */}
        <ScrollReveal direction={reversed ? 'right' : 'left'}>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
            <ul className="space-y-2">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-0.5 text-primary">&#9670;</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        {/* Mockup */}
        <ScrollReveal direction={reversed ? 'left' : 'right'} delay={150}>
          {mockup}
        </ScrollReveal>
      </div>
    </section>
  );
}
