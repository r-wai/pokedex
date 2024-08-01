import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  POKEMON_LIST_URL,
  POKEMON_SEARCH_URL,
  POKEMON_TYPE_URL,
  client,
} from '../api/httpClient';
import {
  Result,
  PokemonPages,
  PokedexEntry,
  PokemonSearch,
  PokemonByType,
  TypeResult,
} from '../interfaces/pokemon_interface';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from '@fortawesome/free-solid-svg-icons';
import PokemonList from '../components/PokemonList';
import NotFound from '../components/NotFound';

const Pokedex = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [totalPokemon, setTotalPokemon] = useState<number>();
  const [pokemon, setPokemon] = useState<Result[]>([]);
  const [searchPokemons, setSearchPokemons] = useState<PokedexEntry[]>([]);
  const types = [
    'bug',
    'dark',
    'dragon',
    'electric',
    'fairy',
    'fighting',
    'fire',
    'flying',
    'ghost',
    'grass',
    'ground',
    'ice',
    'normal',
    'poison',
    'psychic',
    'rock',
    'steel',
    'water',
  ];

  const LIMIT = 15;
  const queryParams = new URLSearchParams(location.search);
  const currPage = parseInt(queryParams.get('page') || '1', 10);
  const offset = (currPage - 1) * LIMIT;
  const changePageTo = (pageNum: number) => {
    navigate('/?page=' + pageNum);
  };

  const pageURL = `${POKEMON_LIST_URL}?limit=${LIMIT}&offset=${offset}`;
  const pages = Math.ceil((totalPokemon || 0) / LIMIT);

  useEffect(() => {
    client.get<PokemonPages>(pageURL).then((resp) => {
      setPokemon(resp.data.results);
      setTotalPokemon(resp.data.count);
    });
  }, [offset]);

  const typeToResult = (t: TypeResult) => {
    const result: Result = {
      name: t.pokemon.name,
      url: t.pokemon.url,
    };
    return result;
  };

  const pokedexEntryToResult = (pd: PokedexEntry) => {
    if (pd.name.toLowerCase() === 'deoxys') {
      pd.name.concat('-normal');
    } else if (pd.id === 29) {
      pd.name = 'nidoran-f';
    } else if (pd.id === 32) {
      pd.name = 'nidoran-m';
    }
    const result: Result = {
      name: pd.name.toLowerCase().replace(/'/, ''),
      url: `${POKEMON_LIST_URL}/${pd.id}/`,
    };
    return result;
  };

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const typeName = event.currentTarget.value.trim().toLowerCase();
    if (types.indexOf(typeName) > -1) {
      client
        .get<PokemonByType>(`${POKEMON_TYPE_URL}${typeName}`)
        .then((resp) => {
          setPokemon(resp.data.pokemon?.map((i) => typeToResult(i)));
          setTotalPokemon(resp.data.pokemon.length);
        });
    } else {
      client.get<PokemonPages>(pageURL).then((resp) => {
        setPokemon(resp.data.results);
        setTotalPokemon(resp.data.count);
      });
    }
    return;
  };

  const handleSearch =
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.currentTarget.value.trim() === '') {
        client.get<PokemonPages>(pageURL).then((resp) => {
          setPokemon(resp.data.results);
        });
        return;
      }
      client
        .get<PokemonSearch>(
          `${POKEMON_SEARCH_URL}q=${event.target.value.toLowerCase()}`,
        )
        .then((response) => {
          setPokemon(searchPokemons?.map((p) => pokedexEntryToResult(p)));
          setSearchPokemons(response.data.results);
        });
    };

  return (
    <Layout>
      <h1>Pokédex</h1>
      <Search>
        <div className="input">
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search by name or #"
          ></input>
        </div>
      </Search>
      <Filter>
        <input
          list="data"
          placeholder="Filter by type"
          onChange={handleFilter}
        />
        <datalist id="data">
          {types.map((i) => {
            return <option>{i}</option>;
          })}
        </datalist>
      </Filter>
      <PokemonList
        count={totalPokemon || 0}
        next={null}
        previous={null}
        results={pokemon}
      />
      <ButtonContainer>
        <StyledButton onClick={() => changePageTo(1)} disabled={currPage === 1}>
          <FontAwesomeIcon icon={faAnglesLeft} color="grey" />
        </StyledButton>
        <StyledButton
          onClick={() => changePageTo(currPage - 1)}
          disabled={currPage === 1}
        >
          <FontAwesomeIcon icon={faAngleLeft} color="grey" />
        </StyledButton>
        <PageNumber>{currPage}</PageNumber>
        <StyledButton
          onClick={() => changePageTo(currPage + 1)}
          disabled={currPage === pages}
        >
          <FontAwesomeIcon icon={faAngleRight} color="grey" />
        </StyledButton>
        <StyledButton
          onClick={() => changePageTo(pages)}
          disabled={currPage === pages}
        >
          <FontAwesomeIcon icon={faAnglesRight} color="grey" />
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

const Search = styled.form`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  color: #000000;

  .input {
    display: flex;
    justify-content: left;
    width: 60vh;

    > input {
      cursor: text;
      padding-left: 2%;
      text-align: left;
      width: 60vh;
      height: 45px;
      color: #24292e;
      border-radius: 5px;
      border: 1px solid #bababa;

      @media (max-width: 768px) {
        width: 60vh;
      }
    }
  }
`;

const Filter = styled.form`
  display: flex;
  align-items: right;
  justify-content: right;
  color: #000000;

  .input {
    display: flex;
    justify-content: right;
    width: 60vh;

    > input {
      cursor: pointer;
      width: 60vh;
      height: 45px;
      color: #24292e;
      border-radius: 5px;
      border: 1px solid #bababa;

      @media (max-width: 768px) {
        width: 60vh;
      }
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
