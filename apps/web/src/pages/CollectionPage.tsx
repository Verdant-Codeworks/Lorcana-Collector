import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router';
import { SEO } from '@/components/seo/SEO';
import { useCollectionView, useSetCardOwnership } from '@/hooks/useCollections';
import { CardGrid } from '@/components/cards/CardGrid';
import { CardListItem } from '@/components/cards/CardListItem';
import { CardDetailModal } from '@/components/cards/CardDetailModal';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LayoutGrid, List, Loader2, Pencil, ChevronDown, ChevronRight } from 'lucide-react';
import type { CollectionCardEntry } from '@illumineer-vault/shared';

interface SetGroup {
  setId: string;
  setName: string;
  cards: CollectionCardEntry[];
  ownedCount: number;
}

function parseSetSortKey(setId: string): number {
  const n = Number(setId);
  return Number.isFinite(n) ? n : 1000;
}

function parseCardNum(cardNum: string): number {
  const n = parseInt(cardNum, 10);
  return Number.isFinite(n) ? n : 9999;
}

export function CollectionPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useCollectionView(id!);
  const ownershipMutation = useSetCardOwnership(id!);
  const [detailCard, setDetailCard] = useState<CollectionCardEntry | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [collapsedSets, setCollapsedSets] = useState<Set<string>>(new Set());

  const setGroups = useMemo<SetGroup[]>(() => {
    if (!data) return [];

    const grouped = new Map<string, { setName: string; cards: CollectionCardEntry[] }>();
    for (const card of data.cards) {
      let group = grouped.get(card.setId);
      if (!group) {
        group = { setName: card.setName, cards: [] };
        grouped.set(card.setId, group);
      }
      group.cards.push(card);
    }

    const groups: SetGroup[] = [];
    for (const [setId, { setName, cards }] of grouped) {
      cards.sort((a, b) => parseCardNum(a.cardNum) - parseCardNum(b.cardNum));
      groups.push({
        setId,
        setName,
        cards,
        ownedCount: cards.filter((c) => c.ownedCount > 0).length,
      });
    }

    groups.sort((a, b) => parseSetSortKey(a.setId) - parseSetSortKey(b.setId));
    return groups;
  }, [data]);

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

  const toggleCollapsed = (setId: string) => {
    setCollapsedSets((prev) => {
      const next = new Set(prev);
      if (next.has(setId)) next.delete(setId);
      else next.add(setId);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <SEO title={data.collection.name} noindex />
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
        <div className="flex items-center gap-2">
          <div className="flex rounded-md border border-border">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              className="h-8 w-8 rounded-r-none"
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              className="h-8 w-8 rounded-l-none"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Link to={`/collections/${id}/edit`}>
            <Button variant="outline" size="sm" className="border-magic/20">
              <Pencil className="mr-1.5 h-3.5 w-3.5" />
              Edit
            </Button>
          </Link>
        </div>
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

      <div className="space-y-6">
        {setGroups.map((group) => {
          const isCollapsed = collapsedSets.has(group.setId);
          const pct = group.cards.length > 0
            ? Math.round((group.ownedCount / group.cards.length) * 100)
            : 0;

          return (
            <section key={group.setId}>
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-lg border border-border bg-card/80 px-4 py-3 text-left transition-colors hover:bg-secondary/50"
                onClick={() => toggleCollapsed(group.setId)}
              >
                {isCollapsed
                  ? <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  : <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                }
                <span className="flex-1 font-semibold">{group.setName}</span>
                <span className="text-xs text-muted-foreground">
                  {group.ownedCount}/{group.cards.length}
                </span>
                <span className="w-10 text-right text-xs font-medium text-enchant">{pct}%</span>
              </button>

              {!isCollapsed && (
                <div className="mt-3">
                  {viewMode === 'grid' ? (
                    <CardGrid
                      cards={group.cards}
                      onToggleOwnership={handleToggleOwnership}
                      onOpenDetail={setDetailCard}
                    />
                  ) : (
                    <div className="space-y-1">
                      {group.cards.map((card) => (
                        <CardListItem
                          key={card.uniqueId}
                          card={card}
                          onToggleOwnership={handleToggleOwnership}
                          onOpenDetail={setDetailCard}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </section>
          );
        })}
      </div>

      <CardDetailModal
        card={detailCard}
        open={!!detailCard}
        onClose={() => setDetailCard(null)}
        onChangeCount={handleChangeCount}
      />
    </div>
  );
}
