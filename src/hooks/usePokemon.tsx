import { useEffect, useState } from 'react';
import { type IAllPokemon, IPokemon } from '../interfaces/pokemon_interface.tsx';
import { httpClient, POKEMON_LIST_URL } from '../api/httpClient.tsx';

const usePokemon = () => {
  const [pokemon, setPokemon] = useState<IPokemon[]>([]);
  const [next, setNext] = useState<string>(POKEMON_LIST_URL);

  useEffect(() => {
    getPokemon();
  }, []);
  const getPokemon = async () => {
    if (next != null) {
      const resp = await httpClient.get<IAllPokemon>(next);
      if (resp?.data?.results) {
        setPokemon(resp.data.results);
      }
    }
  };

  return {
    pokemon,
  };
};

export default usePokemon;
