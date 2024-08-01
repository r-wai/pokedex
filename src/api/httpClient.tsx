import axios from 'axios';

export const POKEMON_LIST_URL = "https://pokeapi.co/api/v2/pokemon";
export const POKEMON_IMAGE_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
export const POKEMON_SPRITE_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
export const POKEMON_SEARCH_URL = "http://localhost:3001/v2/pokemon?";
export const POKEMON_TYPE_URL = "https://pokeapi.co/api/v2/type/";
export const client = axios.create();