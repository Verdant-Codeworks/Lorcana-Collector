import { Link } from 'react-router';
import { useCollections, useDeleteCollection } from '@/hooks/useCollections';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import type { CollectionWithStats } from '@lorcana/shared';

function CollectionCard({ collection }: { collection: CollectionWithStats }) {
  const deleteMutation = useDeleteCollection();

  return (
    <Link
      to={`/collections/${collection.id}`}
      className="group block rounded-lg border border-border bg-card p-4 transition-all hover:border-magic/40 hover:shadow-[var(--shadow-glow-purple)]"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold group-hover:text-primary transition-colors">{collection.name}</h3>
          {collection.description && (
            <p className="mt-1 text-sm text-muted-foreground">{collection.description}</p>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (confirm('Delete this collection?')) {
              deleteMutation.mutate(collection.id);
            }
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            {collection.ownedCards} / {collection.totalCards} cards
          </span>
          <span className="font-medium text-enchant">{collection.completionPercent}%</span>
        </div>
        <Progress value={collection.completionPercent} />
      </div>
    </Link>
  );
}

export function DashboardPage() {
  const { data: collections, isLoading } = useCollections();

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-magic" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Collections</h1>
        <Link to="/collections/new">
          <Button variant="enchanted">
            <Plus className="h-4 w-4" />
            New Collection
          </Button>
        </Link>
      </div>

      {!collections?.length ? (
        <div className="rounded-lg border border-dashed border-magic/30 bg-card/50 py-12 text-center">
          <p className="text-muted-foreground">No collections yet</p>
          <Link to="/collections/new">
            <Button variant="outline" className="mt-4">
              <Plus className="h-4 w-4" />
              Create your first collection
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((col) => (
            <CollectionCard key={col.id} collection={col} />
          ))}
        </div>
      )}
    </div>
  );
}
