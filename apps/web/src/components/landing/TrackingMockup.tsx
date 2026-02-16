import { ChevronDown } from 'lucide-react';
import { INK_COLORS } from '@/lib/utils';

const CARDS = [
  { owned: true, qty: 2, ink: 'Amber' },
  { owned: true, qty: 1, ink: 'Amethyst' },
  { owned: true, qty: 3, ink: 'Ruby' },
  { owned: false, qty: 0, ink: 'Emerald' },
  { owned: true, qty: 1, ink: 'Sapphire' },
  { owned: false, qty: 0, ink: 'Steel' },
  { owned: true, qty: 1, ink: 'Amber' },
  { owned: false, qty: 0, ink: 'Amethyst' },
  { owned: true, qty: 2, ink: 'Ruby' },
  { owned: true, qty: 1, ink: 'Emerald' },
  { owned: false, qty: 0, ink: 'Sapphire' },
  { owned: true, qty: 1, ink: 'Steel' },
];

export function TrackingMockup() {
  return (
    <div className="rounded-xl border border-magic/15 bg-card/80 p-4 backdrop-blur-sm shadow-[var(--shadow-glow-sm)]">
      {/* Set group header */}
      <div className="mb-3 flex items-center justify-between rounded-lg border border-border bg-secondary/60 px-3 py-2">
        <div className="flex items-center gap-2">
          <ChevronDown className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">The First Chapter</span>
        </div>
        <span className="text-xs text-enchant">8/12</span>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-4 gap-2">
        {CARDS.map((card, i) => {
          const ink = INK_COLORS[card.ink];
          return (
            <div key={i} className="relative">
              <div
                className="aspect-[3/4] rounded-md"
                style={{
                  background: card.owned
                    ? `linear-gradient(135deg, ${ink.bg}40, ${ink.bg}70)`
                    : `linear-gradient(135deg, ${ink.bg}10, ${ink.bg}15)`,
                  border: card.owned
                    ? `1px solid ${ink.bg}60`
                    : '1px solid rgba(42, 35, 85, 0.3)',
                  opacity: card.owned ? 1 : 0.4,
                }}
              />
              {card.owned && card.qty > 1 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                  {card.qty}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
