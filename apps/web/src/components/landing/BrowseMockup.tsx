import { INK_COLORS } from '@/lib/utils';

const SET_NAMES = ['The First Chapter', 'Rise of the Floodborn', 'Into the Inklands', 'Ursula\'s Return'];
const INK_ENTRIES = Object.entries(INK_COLORS);

export function BrowseMockup() {
  return (
    <div className="rounded-xl border border-magic/15 bg-card/80 p-4 backdrop-blur-sm shadow-[var(--shadow-glow-enchant)]">
      {/* Set filter chips */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {SET_NAMES.map((name) => (
          <span
            key={name}
            className="rounded-md border border-border bg-secondary/80 px-2 py-0.5 text-[10px] text-muted-foreground"
          >
            {name}
          </span>
        ))}
      </div>

      {/* Ink color dots */}
      <div className="mb-3 flex gap-2">
        {INK_ENTRIES.map(([name, ink]) => (
          <div
            key={name}
            className="h-4 w-4 rounded-full"
            style={{ backgroundColor: ink.bg, boxShadow: `0 0 6px ${ink.bg}50` }}
          />
        ))}
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-3 gap-2">
        {INK_ENTRIES.slice(0, 6).map(([name, ink], i) => (
          <div key={name} className="relative">
            <div
              className="aspect-[3/4] rounded-lg"
              style={{
                background: `linear-gradient(135deg, ${ink.bg}30, ${ink.bg}60)`,
                boxShadow: i === 2 ? `0 0 12px ${ink.bg}60` : undefined,
                border: i === 2 ? `1px solid ${ink.bg}80` : '1px solid rgba(42, 35, 85, 0.5)',
              }}
            />
            {/* Highlighted card gets a subtle shimmer line */}
            {i === 2 && (
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 via-transparent to-transparent" />
            )}
          </div>
        ))}
      </div>

      {/* Search bar hint */}
      <div className="mt-3 flex items-center gap-2 rounded-md border border-border bg-secondary/50 px-2 py-1">
        <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
        <div className="h-2 w-20 rounded bg-muted-foreground/20" />
      </div>
    </div>
  );
}
