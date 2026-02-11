import { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useCollectionView, useUpdateCollection } from '@/hooks/useCollections';
import { useInfiniteCards } from '@/hooks/useCards';
import { FilterBuilder } from '@/components/collections/FilterBuilder';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import type { CollectionFilters } from '@lorcana/shared';

export function CollectionEditPage() {
  const { id } = useParams<{ id: string }>();
  const { data: viewData, isLoading: viewLoading } = useCollectionView(id!);
  const updateMutation = useUpdateCollection();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [filters, setFilters] = useState<CollectionFilters>({});
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (viewData && !initialized) {
      setName(viewData.collection.name);
      setDescription(viewData.collection.description ?? '');
      setFilters(viewData.collection.filters ?? {});
      setInitialized(true);
    }
  }, [viewData, initialized]);

  const {
    data: preview,
    isLoading: previewLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteCards({
    sets: filters.sets,
    colors: filters.colors,
    types: filters.types,
    rarities: filters.rarities,
    classifications: filters.classifications,
    characterNames: filters.characterNames,
    franchises: filters.franchises,
    pageSize: 40,
  });

  const sentinelRef = useRef<HTMLDivElement>(null);
  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(handleIntersect, { rootMargin: '200px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, [handleIntersect]);

  const allCards = preview?.pages.flatMap((p) => p.data) ?? [];
  const total = preview?.pages[0]?.total;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateMutation.mutateAsync({
      id: id!,
      data: { name, description: description || undefined, filters },
    });
    navigate(`/collections/${id}`);
  };

  if (viewLoading || !viewData) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-magic" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Collection</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Collection Name</Label>
            <Input
              id="name"
              placeholder="e.g. The First Chapter Complete Set"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Input
              id="description"
              placeholder="Describe this collection..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          {/* Left: Filters */}
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="mb-3 text-sm text-muted-foreground">
              Select which cards should be included. Leave empty to include all cards.
            </p>
            <FilterBuilder filters={filters} onChange={setFilters} />
          </div>

          {/* Right: Live preview */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-enchant/10 border border-enchant/20 px-3 py-1 text-xs font-semibold text-enchant">
                {total ?? '...'} cards match
              </span>
            </div>

            {previewLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-5 w-5 animate-spin text-magic" />
              </div>
            ) : allCards.length > 0 ? (
              <>
                <div
                  className="grid gap-2"
                  style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))' }}
                >
                  {allCards.map((card) => (
                    <div key={card.uniqueId} className="overflow-hidden rounded-lg">
                      <img
                        src={card.imageUrl}
                        alt={card.name}
                        loading="lazy"
                        className="aspect-[3/4] w-full rounded-lg object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div ref={sentinelRef} className="flex justify-center py-4">
                  {isFetchingNextPage && <Loader2 className="h-5 w-5 animate-spin text-magic" />}
                </div>
              </>
            ) : (
              <div className="rounded-lg border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
                No matching cards to preview
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="enchanted" type="submit" disabled={!name || updateMutation.isPending}>
            {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate(`/collections/${id}`)}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
