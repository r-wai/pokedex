import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { client, POKEMON_LIST_URL } from '../api/httpClient';
import { PokedexEntry, PokemonProps } from '../interfaces/pokemon_interface';
// import PokemonProfile from '../components/PokemonProfile';
import { useParams } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iterate = (array: any[], key: string) => {
  const newArray = array?.map((item, index) => {
    if (index + 1 === array.length) {
      return item[key].name;
    }
    return item[key].name + ', ';
  });
  return newArray;
};

const Pokemon = () => {
  const [pokemon, setPokemon] = useState<PokedexEntry>();
  const { pokemonName } = useParams();

  useEffect(() => {
    if (pokemonName != null) {
      client
        .get<PokedexEntry>(`${POKEMON_LIST_URL}/${pokemonName}`)
        .then(async (response) => {
          setPokemon(response.data);
        });
    }
  }, []);

  return (
    <Container>
      {/* <Header>
        <BackButton onClick={() => history.goBack()}>
          <img src={BackIcon} alt="Back button" width="48px" height="48px" />
        </BackButton>
      </Header> */}
      {!pokemon ? (
        <div>
          <img src="src/assets/ditto.png" width="200" height="200" />
          <h3>
            Sorry, we couldn't find that Pokémon. Please check if you typed the
            name or id correctly.
          </h3>
        </div>
      ) : (
        <Card>
          <CharacterContainer>
            <img
              src={pokemon?.sprites?.other['official-artwork'].front_default}
              width={200}
              height={200}
            />
            <p>
              {pokemon?.name.replace(/-/g, ' ')} #{pokemon?.id}
            </p>
          </CharacterContainer>

          <TexContainer>
            <Text>Weight: {pokemon?.weight} lbs</Text>
            <Text>Height: {pokemon?.height} ft</Text>
            <Text>Types: {iterate(pokemon?.types, 'type')}</Text>
          </TexContainer>

          {/* <StatsContainer>
            <h3>Stats</h3>
            <br />
            {pokemons?.stats.map((stat) => (
              <Stat percentage={stat.base_stat ?? 0} key={stat.stat.name}>
                <p>
                  {stat.stat.name} - {stat.base_stat}
                </p>
                <div className="progress">
                  <div className="bar" />
                </div>
              </Stat>
            ))}
          </StatsContainer> */}
        </Card>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  overflow-y: auto;
  text-align: center;
`;

const Card = styled.div`
  width: 35vw;
  color: #fff;
  background-color: #333333;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  text-transform: capitalize;
  margin-top: 20px;
  text-align: center;

  margin-bottom: 3rem;

  @media (max-width: 1024px) {
    width: 50vw;
    text-align: center;
  }
  @media (max-width: 768px) {
    width: 90vw;
    text-align: center;
  }
`;

const CharacterContainer = styled.div`
  text-align: center;
  margin-bottom: 8px;
  padding: 10px;
  width: 30vw;
  > p {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
  }
`;

const TexContainer = styled.div`
  padding: 12px;
  text-align: center;
`;

const Text = styled.div`
  margin: 0 0 15px 0;
  font-size: 1.6rem;
  text-align: center;
  font-weight: bold;
`;

const BackButton = styled.button`
  background-color: transparent;
`;

const Header = styled.header`
  width: 60vw;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 10rem auto 0;

  @media (max-width: 1024px) {
    margin-top: 5rem;
    width: 80vw;
  }

  @media (max-width: 768px) {
    width: 90vw;
  }
`;

export default Pokemon;
