import styled from 'styled-components';
import { PokemonPages } from '../interfaces/pokemon_interface';
import PokemonTile from './PokemonTile';
const PokemonList = ({ results }: PokemonPages) => {
  return (
    <PokemonGrid>
      {results?.length > 0 ? (
        results.map((i) => {
          return <PokemonTile key={i.name} name={i.name} />;
        })
      ) : (
        <div>
          <img src="src/assets/ditto.png" width="200" height="200" />
          <h3>
            Sorry, we couldn't find that Pokémon. Please check if you typed the
            name or id correctly.
          </h3>
        </div>
      )}
    </PokemonGrid>
  );
};

const PokemonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default PokemonList;
