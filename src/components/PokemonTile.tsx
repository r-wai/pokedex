import { Box, Card, CardContent } from '@mui/material';
import { IPokemon } from '../interfaces/pokemon_interface';
import styled from 'styled-components';

interface PokemonTileProps {
  pokemon: IPokemon;
}

const PokemonTile = ({ pokemon }: PokemonTileProps) => {
  return (
    <Card>
      <CardContent>
        <Box>
            <Name>{pokemon.name}</Name>
        </Box>
      </CardContent>
    </Card>
  );
};

const Name = styled.div`
font-family: 'PokemonClassic';
font-weight: normal;
`;

export default PokemonTile;
