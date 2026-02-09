import { useSets, useCardFilters, useCards } from '@/hooks/useCards';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import type { CollectionFilters } from '@lorcana/shared';

interface FilterBuilderProps {
  filters: CollectionFilters;
  onChange: (filters: CollectionFilters) => void;
}

function MultiSelect({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}) {
  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <Badge
            key={opt}
            variant={selected.includes(opt) ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => toggle(opt)}
          >
            {opt}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export function FilterBuilder({ filters, onChange }: FilterBuilderProps) {
  const { data: sets } = useSets();
  const { data: cardFilters } = useCardFilters();
  const { data: preview } = useCards({
    sets: filters.sets,
    colors: filters.colors,
    types: filters.types,
    rarities: filters.rarities,
    classifications: filters.classifications,
    pageSize: 1,
  });

  if (!sets || !cardFilters) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <MultiSelect
        label="Sets"
        options={sets.map((s) => s.setId)}
        selected={filters.sets || []}
        onChange={(sets) => onChange({ ...filters, sets: sets.length ? sets : undefined })}
      />
      <MultiSelect
        label="Colors"
        options={cardFilters.colors}
        selected={filters.colors || []}
        onChange={(colors) => onChange({ ...filters, colors: colors.length ? colors : undefined })}
      />
      <MultiSelect
        label="Types"
        options={cardFilters.types}
        selected={filters.types || []}
        onChange={(types) => onChange({ ...filters, types: types.length ? types : undefined })}
      />
      <MultiSelect
        label="Rarities"
        options={cardFilters.rarities}
        selected={filters.rarities || []}
        onChange={(rarities) => onChange({ ...filters, rarities: rarities.length ? rarities : undefined })}
      />

      {preview && (
        <div className="rounded-md bg-secondary p-3 text-sm">
          <strong>{preview.total}</strong> cards match these filters
        </div>
      )}
    </div>
  );
}
