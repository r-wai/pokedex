import axios from 'axios';

export const POKEMON_BASE_URL = "https://pokeapi.co/api/v2";
export const POKEMON_LIST_URL = "https://pokeapi.co/api/v2/pokemon";
export const httpClient = axios.create();