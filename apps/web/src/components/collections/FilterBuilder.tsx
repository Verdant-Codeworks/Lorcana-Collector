import { useSets, useCardFilters } from '@/hooks/useCards';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { cn, INK_ICONS } from '@/lib/utils';
import { CharacterPicker } from './CharacterPicker';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { CollectionFilters } from '@lorcana/shared';

interface FilterBuilderProps {
  filters: CollectionFilters;
  onChange: (filters: CollectionFilters) => void;
}

type SelectOption = string | { label: string; value: string };

function MultiSelect({
  options,
  selected,
  onChange,
}: {
  options: SelectOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
}) {
  const getValue = (opt: SelectOption) => (typeof opt === 'string' ? opt : opt.value);
  const getLabel = (opt: SelectOption) => (typeof opt === 'string' ? opt : opt.label);

  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => (
        <Badge
          key={getValue(opt)}
          variant={selected.includes(getValue(opt)) ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => toggle(getValue(opt))}
        >
          {getLabel(opt)}
        </Badge>
      ))}
    </div>
  );
}

function ColorSelect({
  colors,
  selected,
  onChange,
}: {
  colors: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}) {
  const toggle = (color: string) => {
    if (selected.includes(color)) {
      onChange(selected.filter((c) => c !== color));
    } else {
      onChange([...selected, color]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {colors.map((color) => {
        const isSelected = selected.includes(color);
        return INK_ICONS[color] ? (
          <button
            key={color}
            type="button"
            onClick={() => toggle(color)}
            className={cn(
              'flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-medium transition-all',
              isSelected
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-transparent text-muted-foreground opacity-50 hover:opacity-75',
            )}
          >
            <img src={INK_ICONS[color]} alt={color} className="h-5 w-5 object-contain" />
            {color}
          </button>
        ) : (
          <Badge
            key={color}
            variant={isSelected ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => toggle(color)}
          >
            {color}
          </Badge>
        );
      })}
    </div>
  );
}

function selectionCount(arr?: string[]) {
  return arr?.length ? ` (${arr.length})` : '';
}

export function FilterBuilder({ filters, onChange }: FilterBuilderProps) {
  const { data: sets } = useSets();
  const { data: cardFilters } = useCardFilters();

  if (!sets || !cardFilters) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-5 w-5 animate-spin text-magic" />
      </div>
    );
  }

  return (
    <Accordion type="multiple" defaultValue={['characters']}>
      <AccordionItem value="characters">
        <AccordionTrigger>
          Characters & Franchises
          {selectionCount([...(filters.characterNames || []), ...(filters.franchises || [])])}
        </AccordionTrigger>
        <AccordionContent>
          <CharacterPicker
            selectedCharacters={filters.characterNames || []}
            selectedFranchises={filters.franchises || []}
            onCharactersChange={(characterNames) =>
              onChange({ ...filters, characterNames: characterNames.length ? characterNames : undefined })
            }
            onFranchisesChange={(franchises) =>
              onChange({ ...filters, franchises: franchises.length ? franchises : undefined })
            }
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="sets">
        <AccordionTrigger>
          Sets{selectionCount(filters.sets)}
        </AccordionTrigger>
        <AccordionContent>
          <MultiSelect
            options={sets.map((s) => ({ label: s.name, value: s.setId }))}
            selected={filters.sets || []}
            onChange={(sets) => onChange({ ...filters, sets: sets.length ? sets : undefined })}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="colors">
        <AccordionTrigger>
          Ink Colors{selectionCount(filters.colors)}
        </AccordionTrigger>
        <AccordionContent>
          <ColorSelect
            colors={cardFilters.colors}
            selected={filters.colors || []}
            onChange={(colors) => onChange({ ...filters, colors: colors.length ? colors : undefined })}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="types">
        <AccordionTrigger>
          Types{selectionCount(filters.types)}
        </AccordionTrigger>
        <AccordionContent>
          <MultiSelect
            options={cardFilters.types}
            selected={filters.types || []}
            onChange={(types) => onChange({ ...filters, types: types.length ? types : undefined })}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="rarities">
        <AccordionTrigger>
          Rarities{selectionCount(filters.rarities)}
        </AccordionTrigger>
        <AccordionContent>
          <MultiSelect
            options={cardFilters.rarities}
            selected={filters.rarities || []}
            onChange={(rarities) => onChange({ ...filters, rarities: rarities.length ? rarities : undefined })}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
