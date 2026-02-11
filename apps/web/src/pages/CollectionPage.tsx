import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { useCollectionView, useSetCardOwnership } from '@/hooks/useCollections';
import { CardGrid } from '@/components/cards/CardGrid';
import { CardDetailModal } from '@/components/cards/CardDetailModal';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, Pencil } from 'lucide-react';
import type { CollectionCardEntry } from '@lorcana/shared';

export function CollectionPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useCollectionView(id!);
  const ownershipMutation = useSetCardOwnership(id!);
  const [detailCard, setDetailCard] = useState<CollectionCardEntry | null>(null);

  if (isLoading || !data) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-magic" />
      </div>
    );
  }

  const handleToggleOwnership = (cardId: string, newCount: number) => {
    ownershipMutation.mutate({ cardId, count: newCount });
  };

  const handleChangeCount = (cardId: string, count: number) => {
    ownershipMutation.mutate({ cardId, count });
    setDetailCard((prev) =>
      prev && prev.uniqueId === cardId ? { ...prev, ownedCount: count } : prev,
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/dashboard">
          <Button variant="outline" size="icon" className="border-magic/20">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{data.collection.name}</h1>
          {data.collection.description && (
            <p className="text-sm text-muted-foreground">{data.collection.description}</p>
          )}
        </div>
        <Link to={`/collections/${id}/edit`}>
          <Button variant="outline" size="sm" className="border-magic/20">
            <Pencil className="mr-1.5 h-3.5 w-3.5" />
            Edit
          </Button>
        </Link>
      </div>

      <div className="rounded-lg border border-magic/15 bg-card p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            {data.ownedCards} / {data.totalCards} cards collected
          </span>
          <span className="font-medium text-enchant">{data.completionPercent}%</span>
        </div>
        <Progress value={data.completionPercent} />
      </div>

      <CardGrid
        cards={data.cards}
        onToggleOwnership={handleToggleOwnership}
        onOpenDetail={setDetailCard}
      />

      <CardDetailModal
        card={detailCard}
        open={!!detailCard}
        onClose={() => setDetailCard(null)}
        onChangeCount={handleChangeCount}
      />
    </div>
  );
}
