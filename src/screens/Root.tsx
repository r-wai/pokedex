import React from 'react';
import { Outlet, Link} from 'react-router-dom';
import styled from 'styled-components';

const Root = () => {
  return (
    <Layout>
      <NavigationBar>
        <Title>Pokedex API</Title>
        <Link to='/pokedex'>Pokedex</Link>
        <Link to='/team-builder'>Team Builder</Link>
        </NavigationBar>
      <Outlet />
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavigationBar = styled.div`
  background-color: aliceblue;
`;

const Title = styled.h1`
font-family: 'PokemonSolid';
font-weight: normal;
font-size: 40px;
color: #ffcb05;
-webkit-text-stroke: 1px #2a75bb;
`;

export default Root;
