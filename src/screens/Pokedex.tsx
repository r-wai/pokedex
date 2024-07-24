import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { POKEMON_LIST_URL, client } from '../api/httpClient';
import PokemonTile from '../components/PokemonTile';
import { Pokemon, PokemonPages } from '../interfaces/pokemon_interface';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../components/SearchBar';
import PokemonList from '../components/PokemonList';

const Pokedex = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const LIMIT = 15;
  const [totalPokemon, setTotalPokemon] = useState<number>();
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  const queryParams = new URLSearchParams(location.search);
  const currPage = parseInt(queryParams.get('page') || '1', 10);
  const offset = (currPage - 1) * LIMIT;
  const changePageTo = (pageNum: number) => {
    navigate('/pokedex/?page=' + pageNum);
  };
  const pageURL = `${POKEMON_LIST_URL}?limit=${LIMIT}&offset=${offset}`;

  useEffect(() => {
    client.get<PokemonPages>(pageURL).then((resp) => {
      setPokemon(resp.data.results);
      setTotalPokemon(resp.data.count);
    });
  }, [offset]);

  const pages = Math.ceil((totalPokemon || 0) / LIMIT);

  return (
    <Layout>
      <h1>Pokédex</h1>
      <SearchBar/>
      <PokemonList count={totalPokemon || 0} next={null} previous={null} results={pokemon}/>
      <ButtonContainer>
        <StyledButton onClick={() => changePageTo(1)} disabled={currPage === 1}>
        <FontAwesomeIcon icon={faAnglesLeft} color='grey' />
        </StyledButton>
        <StyledButton
          onClick={() => changePageTo(currPage - 1)}
          disabled={currPage === 1}
        >
          <FontAwesomeIcon icon={faAngleLeft} color='grey'/>
        </StyledButton>
        <PageNumber>{currPage}</PageNumber>
        <StyledButton
          onClick={() => changePageTo(currPage + 1)}
          disabled={currPage === pages}
        >
          <FontAwesomeIcon icon={faAngleRight} color='grey'/>
        </StyledButton>
        <StyledButton
          onClick={() => changePageTo(pages)}
          disabled={currPage === pages}
        >
          <FontAwesomeIcon icon={faAnglesRight} color='grey' />
        </StyledButton>
      </ButtonContainer>
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 2rem;

  > h1 {
    font-size: 2rem;
    color: black;
    display: flex;

    @media (max-width: 768px) {
      font-size: 2rem;
      width: 90vw;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 3rem;
  justify-content: center;
`;

const StyledButton = styled.button`
  display: flex;
  outline: none;
  justify-content: center;
  color: black;
  background-color: white;
  margin: 0 10px;
  cursor: pointer;
  padding: 8px 16px;
  font-size: 1rem;
  border-radius: 4px;
  /* border: 1.5px solid #a9a9a9; */
  &:hover {
    background-color: #ddd;
    color: black;
  }
  &:disabled {
    color: #b9b9b9;
    cursor: not-allowed;
  }
`;

const PageNumber = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
  font-size: 1rem;
  color: white;
  background-color: #fff;
  color: #646464;
  padding: 8px 16px;
  border-radius: 12px;
`;

export default Pokedex;
