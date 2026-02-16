import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { InkBadge } from '@/components/ui/ink-badge';
import { Minus, Plus } from 'lucide-react';
import type { CollectionCardEntry } from '@illumineer-vault/shared';

interface CardDetailModalProps {
  card: CollectionCardEntry | null;
  open: boolean;
  onClose: () => void;
  onChangeCount: (cardId: string, count: number) => void;
}

export function CardDetailModal({ card, open, onClose, onChangeCount }: CardDetailModalProps) {
  if (!card) return null;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{card.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 sm:grid-cols-2">
          <img
            src={card.imageUrl}
            alt={card.name}
            className="w-full rounded-lg"
          />
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Set</div>
              <div>{card.setName}</div>
              <div className="text-muted-foreground">Color</div>
              <div><InkBadge color={card.color} selected /></div>
              <div className="text-muted-foreground">Type</div>
              <div>{card.type}</div>
              <div className="text-muted-foreground">Rarity</div>
              <div>{card.rarity}</div>
              <div className="text-muted-foreground">Cost</div>
              <div>{card.cost}</div>
              {card.strength != null && (
                <>
                  <div className="text-muted-foreground">Strength</div>
                  <div>{card.strength}</div>
                </>
              )}
              {card.willpower != null && (
                <>
                  <div className="text-muted-foreground">Willpower</div>
                  <div>{card.willpower}</div>
                </>
              )}
              {card.lore != null && (
                <>
                  <div className="text-muted-foreground">Lore</div>
                  <div>{card.lore}</div>
                </>
              )}
              <div className="text-muted-foreground">Inkable</div>
              <div>{card.inkable ? 'Yes' : 'No'}</div>
              <div className="text-muted-foreground">Artist</div>
              <div>{card.artist}</div>
            </div>

            {card.bodyText && (
              <p className="text-sm">{card.bodyText}</p>
            )}
            {card.flavorText && (
              <p className="text-sm italic text-muted-foreground">{card.flavorText}</p>
            )}

            <div className="flex items-center gap-3 pt-2">
              <span className="text-sm font-medium">Owned:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onChangeCount(card.uniqueId, Math.max(0, card.ownedCount - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-bold">{card.ownedCount}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onChangeCount(card.uniqueId, card.ownedCount + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
