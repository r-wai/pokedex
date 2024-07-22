import { createGlobalStyle } from 'styled-components';

import PokemonClassic from './fonts/Pokemon-Classic.ttf'
import PokemonSolid from './fonts/Pokemon-Solid.ttf'

export default createGlobalStyle`

@font-face {
    font-family: 'PokemonClassic';
    font-weight: normal;
    font-style: normal;
    font-display: swap;
    src: url(${PokemonClassic});
    src: url(${PokemonClassic}) format('truetype');
}

@font-face {
    font-family: 'PokemonSolid';
    font-weight: normal;
    font-style: normal;
    font-display: swap;
    src: url(${PokemonSolid});
    src: url(${PokemonSolid}) format('truetype');
}
`;