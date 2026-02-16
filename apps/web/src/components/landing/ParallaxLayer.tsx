import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ParallaxLayerProps {
  children: ReactNode;
  scrollY: number;
  speed: number;
  reducedMotion?: boolean;
  className?: string;
}

export function ParallaxLayer({ children, scrollY, speed, reducedMotion, className }: ParallaxLayerProps) {
  const y = reducedMotion ? 0 : scrollY * speed;

  return (
    <div
      className={cn('pointer-events-none will-change-transform', className)}
      style={{ transform: `translateY(${y}px)` }}
    >
      {children}
    </div>
  );
}
