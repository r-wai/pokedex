export interface Result {
  name: string;
  url: string;
}

export interface PokeListTile {
  id: number;
  name: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}

export interface PokemonProps {
  name: string | undefined;
}

export interface PokedexEntry {
  id: number;
  name: string;
  weight: number;
  height: number;
  types: string[];
  evolutions: number[];
  description: string;
  images: {
    full: string;
    sprite_front: string;
  };
}

export interface PokemonPages {
  count: number;
  next: string | null;
  previous: string | null;
  results: Result[];
}

export interface PokemonSearch {
  total: number;
  results: PokedexEntry[];
}
export interface TypeResult {
  pokemon: Result;
  slot: number;
}

export interface PokemonByType {
  pokemon: TypeResult[];
}