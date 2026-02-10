import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { CollectionCardEntry } from '@lorcana/shared';

interface CardTileProps {
  card: CollectionCardEntry;
  onToggleOwnership: (cardId: string, newCount: number) => void;
  onOpenDetail: (card: CollectionCardEntry) => void;
}

export function CardTile({ card, onToggleOwnership, onOpenDetail }: CardTileProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
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
        'group relative cursor-pointer overflow-hidden rounded-lg transition-all hover:scale-105',
        isOwned && 'hover:shadow-[var(--shadow-glow-purple)]',
      )}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      <div className="relative aspect-[3/4] w-full">
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse rounded-lg bg-secondary" />
        )}
        <img
          src={card.imageUrl}
          alt={card.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={cn(
            'absolute inset-0 h-full w-full rounded-lg object-cover transition-all duration-300',
            !imageLoaded ? 'opacity-0' : 'opacity-100',
            !isOwned && 'grayscale opacity-40',
          )}
        />
      </div>

      {isOwned && card.ownedCount > 1 && (
        <Badge className="absolute right-1 top-1 text-xs">
          x{card.ownedCount}
        </Badge>
      )}
    </div>
  );
}
