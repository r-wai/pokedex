import { PokedexEntry, PokemonProps } from '../interfaces/pokemon_interface';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { client, POKEMON_LIST_URL } from '../api/httpClient';
import { Link } from 'react-router-dom';

const PokemonTile = ({ name: url }: PokemonProps) => {
  const [pokemon, setPokemon] = useState<PokedexEntry | null>(null);
  const POKEDEX_URL = `${POKEMON_LIST_URL}/${url}`;

  useEffect(() => {
    client.get(POKEDEX_URL).then((response) => {
      setPokemon(response.data);
    });
  }, []);
  
  return (
    <>
        {pokemon?.sprites.other['official-artwork'].front_default && (
            <Link to={"/"+pokemon?.name}>
                <Tile>
                    <img 
                    src={pokemon?.sprites?.other['official-artwork'].front_default}
                    width={150}
                    height={150}
                    />
                    <p>
                        {pokemon?.name.replace(/-/g, " ")}
                    </p>
                    <p>
                       #{pokemon?.id}
                    </p>
                </Tile>
            </Link>
        )

        }
    </>
  );
};


const Tile = styled.div`
  cursor: pointer;
  display: inline-block;
  text-align: center;
  color: #000000;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  text-transform: capitalize;
  width: 30vw;
  font-size: 1rem;
  background: #eaeaea;

  &:hover {
    opacity: 0.6;
  }

  @media (max-width: 1024px) {
    width: 30vw;
  }
  @media (max-width: 768px) {
    width: 40vw;
    font-size: 1.5rem;
  }
  > img {
    align: left;
  }

  > p {
    background: fixed;
    margin-bottom: 0rem;
    color: #a7a7a7;
  }
`;

export default PokemonTile;
