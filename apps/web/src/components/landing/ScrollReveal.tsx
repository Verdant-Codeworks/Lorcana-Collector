import type { ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'left' | 'right' | 'up';
  delay?: number;
  className?: string;
}

export function ScrollReveal({ children, direction = 'up', delay = 0, className }: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal();

  const animationClass = {
    up: 'animate-fade-in-up',
    left: 'animate-fade-in-left',
    right: 'animate-fade-in-right',
  }[direction];

  return (
    <div
      ref={ref}
      className={cn(
        'opacity-0',
        isVisible && animationClass,
        className,
      )}
      style={{ animationDelay: isVisible ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  );
}
