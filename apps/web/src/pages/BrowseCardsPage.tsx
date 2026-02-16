import { useState } from 'react';
import { useCards, useSets, useCardFilters } from '@/hooks/useCards';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { InkBadge } from '@/components/ui/ink-badge';
import { Button } from '@/components/ui/button';
import { Loader2, Search } from 'lucide-react';
import type { CardQueryDto } from '@illumineer-vault/shared';

export function BrowseCardsPage() {
  const [query, setQuery] = useState<CardQueryDto>({ pageSize: 40 });
  const [search, setSearch] = useState('');
  const { data, isLoading } = useCards(query);
  const { data: sets } = useSets();
  const { data: filters } = useCardFilters();

  const toggleFilter = (key: 'sets' | 'colors' | 'types' | 'rarities', value: string) => {
    const current = query[key] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setQuery({ ...query, [key]: updated.length ? updated : undefined, page: 1 });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery({ ...query, search: search || undefined, page: 1 });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Browse Cards</h1>

      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search cards..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button type="submit">Search</Button>
      </form>

      <div className="space-y-3">
        {sets && (
          <div className="flex flex-wrap gap-1.5">
            {sets.map((s) => (
              <Badge
                key={s.setId}
                variant={query.sets?.includes(s.setId) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => toggleFilter('sets', s.setId)}
              >
                {s.name}
              </Badge>
            ))}
          </div>
        )}
        {filters && (
          <div className="flex flex-wrap gap-1.5">
            {filters.colors.map((c) => (
              <InkBadge
                key={c}
                color={c}
                selected={query.colors?.includes(c) || false}
                onClick={() => toggleFilter('colors', c)}
              />
            ))}
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-magic" />
        </div>
      ) : data ? (
        <>
          <p className="text-sm text-muted-foreground">{data.total} cards found</p>
          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}
          >
            {data.data.map((card) => (
              <div key={card.uniqueId} className="overflow-hidden rounded-lg transition-all hover:shadow-[var(--shadow-glow-purple)]">
                <img
                  src={card.imageUrl}
                  alt={card.name}
                  loading="lazy"
                  className="aspect-[3/4] w-full rounded-lg object-cover"
                />
              </div>
            ))}
          </div>
          {data.totalPages > 1 && (
            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                disabled={data.page <= 1}
                onClick={() => setQuery({ ...query, page: data.page - 1 })}
              >
                Previous
              </Button>
              <span className="flex items-center text-sm text-muted-foreground">
                Page {data.page} of {data.totalPages}
              </span>
              <Button
                variant="outline"
                disabled={data.page >= data.totalPages}
                onClick={() => setQuery({ ...query, page: data.page + 1 })}
              >
                Next
              </Button>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}
