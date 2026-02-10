import { cn, getInkStyle, INK_COLORS } from '@/lib/utils';
import { Badge } from './badge';

interface InkBadgeProps {
  color: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function InkBadge({ color, selected = false, onClick, className }: InkBadgeProps) {
  const isKnownInk = color in INK_COLORS;

  if (!isKnownInk) {
    return (
      <Badge
        variant={selected ? 'default' : 'outline'}
        className={cn('cursor-pointer', className)}
        onClick={onClick}
      >
        {color}
      </Badge>
    );
  }

  return (
    <div
      role="button"
      onClick={onClick}
      style={getInkStyle(color, selected)}
      className={cn(
        'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-all cursor-pointer',
        className,
      )}
    >
      {color}
    </div>
  );
}
