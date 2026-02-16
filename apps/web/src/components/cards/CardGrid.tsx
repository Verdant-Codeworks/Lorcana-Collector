import { CardTile } from './CardTile';
import type { CollectionCardEntry } from '@illumineer-vault/shared';

interface CardGridProps {
  cards: CollectionCardEntry[];
  onToggleOwnership: (cardId: string, newCount: number) => void;
  onOpenDetail: (card: CollectionCardEntry) => void;
}

export function CardGrid({ cards, onToggleOwnership, onOpenDetail }: CardGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}
    >
      {cards.map((card) => (
        <CardTile
          key={card.uniqueId}
          card={card}
          onToggleOwnership={onToggleOwnership}
          onOpenDetail={onOpenDetail}
        />
      ))}
    </div>
  );
}
