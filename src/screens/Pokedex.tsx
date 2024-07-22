import React from 'react';
import usePokemon from "../hooks/usePokemon";
import PokemonList from "../components/PokemonList"
import { Container } from '@mui/material';

const Pokedex = () => {
  const { pokemon } = usePokemon();
  return(
    <Container>
      <PokemonList pokemon={pokemon}></PokemonList>
    </Container>
  );
};

export default Pokedex