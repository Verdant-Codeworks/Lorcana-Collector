import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCreateCollection } from '@/hooks/useCollections';
import { useCards } from '@/hooks/useCards';
import { FilterBuilder } from '@/components/collections/FilterBuilder';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import type { CollectionFilters } from '@lorcana/shared';

export function CollectionCreatePage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [filters, setFilters] = useState<CollectionFilters>({});
  const createMutation = useCreateCollection();
  const navigate = useNavigate();

  const { data: preview, isLoading: previewLoading } = useCards({
    sets: filters.sets,
    colors: filters.colors,
    types: filters.types,
    rarities: filters.rarities,
    classifications: filters.classifications,
    characterNames: filters.characterNames,
    franchises: filters.franchises,
    pageSize: 20,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await createMutation.mutateAsync({
      name,
      description: description || undefined,
      filters,
    });
    navigate(`/collections/${result.id}`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">New Collection</h1>

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
                {preview?.total ?? '...'} cards match
              </span>
            </div>

            {previewLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-5 w-5 animate-spin text-magic" />
              </div>
            ) : preview && preview.data.length > 0 ? (
              <div
                className="grid gap-2"
                style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))' }}
              >
                {preview.data.map((card) => (
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
            ) : (
              <div className="rounded-lg border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
                No matching cards to preview
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="enchanted" type="submit" disabled={!name || createMutation.isPending}>
            {createMutation.isPending ? 'Creating...' : 'Create Collection'}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate('/dashboard')}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
