import { useState, useEffect } from 'react';
import { useCharacters } from '@/hooks/useCards';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Search, X, ChevronDown, ChevronRight, Loader2 } from 'lucide-react';

interface CharacterPickerProps {
  selectedCharacters: string[];
  selectedFranchises: string[];
  onCharactersChange: (characters: string[]) => void;
  onFranchisesChange: (franchises: string[]) => void;
}

interface CharacterInfo {
  name: string;
  franchise?: string;
  cardCount: number;
  imageUrl: string;
}

export function CharacterPicker({
  selectedCharacters,
  selectedFranchises,
  onCharactersChange,
  onFranchisesChange,
}: CharacterPickerProps) {
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [expandedFranchises, setExpandedFranchises] = useState<Set<string>>(new Set());

  // Debounce search input by 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data, isLoading } = useCharacters(debouncedSearch);

  const handleRemoveCharacter = (characterName: string) => {
    onCharactersChange(selectedCharacters.filter((c) => c !== characterName));
  };

  const handleRemoveFranchise = (franchiseName: string) => {
    onFranchisesChange(selectedFranchises.filter((f) => f !== franchiseName));
  };

  const handleAddCharacter = (characterName: string) => {
    if (!selectedCharacters.includes(characterName)) {
      onCharactersChange([...selectedCharacters, characterName]);
    }
  };

  const handleAddFranchise = (franchiseName: string) => {
    if (!selectedFranchises.includes(franchiseName)) {
      onFranchisesChange([...selectedFranchises, franchiseName]);
    }
  };

  const toggleFranchiseExpanded = (franchiseName: string) => {
    setExpandedFranchises((prev) => {
      const next = new Set(prev);
      if (next.has(franchiseName)) {
        next.delete(franchiseName);
      } else {
        next.add(franchiseName);
      }
      return next;
    });
  };

  // Group characters by franchise for browse view
  const charactersByFranchise = data?.characters.reduce(
    (acc, char) => {
      const franchise = char.franchise || 'Unknown';
      if (!acc[franchise]) {
        acc[franchise] = [];
      }
      acc[franchise].push(char);
      return acc;
    },
    {} as Record<string, CharacterInfo[]>,
  );

  const hasSelections = selectedCharacters.length > 0 || selectedFranchises.length > 0;

  return (
    <div className="space-y-4">
      {/* Selected badges */}
      {hasSelections && (
        <div className="flex flex-wrap gap-2">
          {selectedFranchises.map((franchise) => (
            <Badge key={`franchise-${franchise}`} variant="secondary" className="gap-1">
              {franchise}
              <button
                type="button"
                onClick={() => handleRemoveFranchise(franchise)}
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {selectedCharacters.map((character) => (
            <Badge key={`character-${character}`} variant="default" className="gap-1">
              {character}
              <button
                type="button"
                onClick={() => handleRemoveCharacter(character)}
                className="ml-1 hover:bg-primary-foreground/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search characters..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Results */}
      <div className="max-h-96 overflow-y-auto rounded-md border bg-card">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : debouncedSearch ? (
          // Search results - flat list
          <div className="divide-y">
            {data?.characters.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                No characters found
              </div>
            ) : (
              data?.characters.map((character) => (
                <button
                  key={character.name}
                  type="button"
                  onClick={() => handleAddCharacter(character.name)}
                  disabled={selectedCharacters.includes(character.name)}
                  className={cn(
                    'flex w-full items-center gap-3 p-3 text-left transition-colors hover:bg-muted',
                    selectedCharacters.includes(character.name) &&
                      'opacity-50 cursor-not-allowed',
                  )}
                >
                  <img
                    src={character.imageUrl}
                    alt={character.name}
                    className="h-12 w-12 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{character.name}</div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {character.franchise && (
                        <Badge variant="outline" className="text-xs">
                          {character.franchise}
                        </Badge>
                      )}
                      <span>{character.cardCount} cards</span>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        ) : (
          // Franchise browser
          <div className="divide-y">
            {data?.franchises.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                No franchises found
              </div>
            ) : (
              data?.franchises.map((franchise) => {
                const isExpanded = expandedFranchises.has(franchise.name);
                const franchiseCharacters = charactersByFranchise?.[franchise.name] || [];

                return (
                  <div key={franchise.name}>
                    {/* Franchise header */}
                    <div className="flex items-center gap-2 p-3 bg-muted/50">
                      <button
                        type="button"
                        onClick={() => toggleFranchiseExpanded(franchise.name)}
                        className="flex items-center gap-2 flex-1 text-left hover:bg-muted rounded px-2 py-1 transition-colors"
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                        <span className="font-semibold">{franchise.name}</span>
                        <span className="text-sm text-muted-foreground">
                          ({franchise.characterCount} characters)
                        </span>
                      </button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => handleAddFranchise(franchise.name)}
                        disabled={selectedFranchises.includes(franchise.name)}
                        className="shrink-0"
                      >
                        Select franchise
                      </Button>
                    </div>

                    {/* Character list */}
                    {isExpanded && (
                      <div className="divide-y">
                        {franchiseCharacters.map((character) => (
                          <button
                            key={character.name}
                            type="button"
                            onClick={() => handleAddCharacter(character.name)}
                            disabled={selectedCharacters.includes(character.name)}
                            className={cn(
                              'flex w-full items-center gap-3 p-3 pl-12 text-left transition-colors hover:bg-muted',
                              selectedCharacters.includes(character.name) &&
                                'opacity-50 cursor-not-allowed',
                            )}
                          >
                            <img
                              src={character.imageUrl}
                              alt={character.name}
                              className="h-12 w-12 rounded object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate">{character.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {character.cardCount} cards
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
