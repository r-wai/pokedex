import { PokeListTile, PokemonProps } from '../interfaces/pokemon_interface';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { client, POKEMON_LIST_URL } from '../api/httpClient';
import { Modal } from 'react-bootstrap';
import PokemonProfile from './PokemonProfile';

const PokemonTile = ({ name: url }: PokemonProps) => {
  const [pokemon, setPokemon] = useState<PokeListTile | null>(null);

  useEffect(() => {
    client.get<PokeListTile>(`${POKEMON_LIST_URL}/${url}`).then((response) => {
      setPokemon(response.data);
    });
  }, []);

  const [showProfile, setShowProfile] = useState(false);

  const handleProfileClose = () => setShowProfile(false);
  const handleProfileShow = () => setShowProfile(true);

  const pokeName = pokemon?.name.replace(/-/g, ' ');
  const pokeSprite = pokemon?.sprites.other['official-artwork'].front_default;
  const pokeID = String(pokemon?.id).padStart(4, '0');

  return (
    <div key={pokemon?.id}>
      {pokeSprite && (
        <Tile onClick={handleProfileShow} >
          <img src={pokeSprite} width={150} height={150} />
          <p>{pokeName}</p>
          <p>#{pokeID}</p>
        </Tile>
      )}
      <Modal
        size="lg"
        show={showProfile}
        onHide={handleProfileClose}
        animation={false}
        centered
        key={pokemon?.id}
      >
        <PokemonProfile key={pokemon?.id} name={pokemon?.id.toString()}/>
      </Modal>
    </div>
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

  > p {
    background: fixed;
    margin-bottom: 0.25rem;
    color: #a7a7a7;
  }
`;

export default PokemonTile;
