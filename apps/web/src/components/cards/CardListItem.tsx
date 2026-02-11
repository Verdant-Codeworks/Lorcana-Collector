import { Badge } from '@/components/ui/badge';
import { InkBadge } from '@/components/ui/ink-badge';
import { cn } from '@/lib/utils';
import type { CollectionCardEntry } from '@lorcana/shared';

interface CardListItemProps {
  card: CollectionCardEntry;
  onToggleOwnership: (cardId: string, newCount: number) => void;
  onOpenDetail: (card: CollectionCardEntry) => void;
}

export function CardListItem({ card, onToggleOwnership, onOpenDetail }: CardListItemProps) {
  const isOwned = card.ownedCount > 0;

  const handleClick = () => {
    if (!isOwned) {
      onToggleOwnership(card.uniqueId, 1);
    } else {
      onOpenDetail(card);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOwned) {
      onToggleOwnership(card.uniqueId, card.ownedCount - 1);
    }
  };

  return (
    <div
      className={cn(
        'flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-card/50 px-3 py-2 transition-colors hover:bg-secondary/50',
        !isOwned && 'opacity-50',
      )}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      <img
        src={card.imageUrl}
        alt={card.name}
        loading="lazy"
        className={cn(
          'h-12 w-9 rounded object-cover',
          !isOwned && 'grayscale',
        )}
      />
      <span className="w-10 shrink-0 text-xs text-muted-foreground">#{card.cardNum}</span>
      <span className="min-w-0 flex-1 truncate text-sm font-medium">{card.name}</span>
      <InkBadge color={card.color} selected />
      <span className="hidden w-20 text-xs text-muted-foreground sm:block">{card.rarity}</span>
      <span className="hidden w-8 text-center text-xs text-muted-foreground md:block">{card.cost}</span>
      {isOwned ? (
        <Badge className="w-10 justify-center text-xs">x{card.ownedCount}</Badge>
      ) : (
        <span className="w-10 text-center text-xs text-muted-foreground">-</span>
      )}
    </div>
  );
}
