import { Progress } from '@/components/ui/progress';

const COLLECTIONS = [
  { name: 'Complete Master Set', cards: 42, total: 204, percent: 21 },
  { name: 'Amber Characters', cards: 18, total: 36, percent: 50 },
  { name: 'Enchanted Cards', cards: 7, total: 24, percent: 29 },
];

export function CollectionsMockup() {
  return (
    <div className="space-y-3">
      {COLLECTIONS.map((col) => (
        <div
          key={col.name}
          className="rounded-xl border border-magic/15 bg-card/80 p-4 backdrop-blur-sm shadow-[var(--shadow-glow-purple)]"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">{col.name}</span>
            <span className="text-xs text-enchant">{col.percent}%</span>
          </div>
          <Progress value={col.percent} className="mb-1.5" />
          <span className="text-[11px] text-muted-foreground">
            {col.cards}/{col.total} cards
          </span>
        </div>
      ))}
    </div>
  );
}
