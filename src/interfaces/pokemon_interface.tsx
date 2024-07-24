export interface Pokemon {
  name: string;
  url: string;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
  };
}

export interface Type {
  type: {
    name: string;
  };
}

export interface PokedexEntry {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  stats: Stat[];
  types: Type[];
}

export interface PokemonProps {
  name: string | undefined;
}

export interface PokemonPages {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}