import { Grid } from '@mui/material';
import { IPokemon } from '../interfaces/pokemon_interface';
import PokemonTile from './PokemonTile';

interface PokemonListProps {
  pokemon: IPokemon[];
}

const PokemonList = ({ pokemon }: PokemonListProps) => {
  return (
    <Grid container spacing={5}>
      {pokemon.length > 0
        ? pokemon.map((p) => {
            return (
                <Grid item xs={3}>
                    <PokemonTile key={p.name} pokemon={p}/>
                </Grid>
            );
          })
        : null}
    </ Grid>
  );
};

export default PokemonList;
