import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCreateCollection } from '@/hooks/useCollections';
import { FilterBuilder } from '@/components/collections/FilterBuilder';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { CollectionFilters } from '@lorcana/shared';

export function CollectionCreatePage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [filters, setFilters] = useState<CollectionFilters>({});
  const createMutation = useCreateCollection();
  const navigate = useNavigate();

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
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">New Collection</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
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

        <div className="space-y-2">
          <Label>Card Filters</Label>
          <p className="text-sm text-muted-foreground">
            Select which cards should be included in this collection.
            Leave empty to include all cards.
          </p>
          <FilterBuilder filters={filters} onChange={setFilters} />
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={!name || createMutation.isPending}>
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
