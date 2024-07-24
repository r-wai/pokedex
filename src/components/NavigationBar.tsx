import { Navbar, Nav, Container } from 'react-bootstrap';
import styled from 'styled-components';

const NavigationBar = () => {
  return (
    <div className="shadow p-3 mb-5 bg-white rounded">
      <Navbar sticky="top">
        <Container fluid>
          <Navbar.Brand href="/">
            <Logo src="src/assets/pokeball.png" width="50" height="50" />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav
              variant="underline"
              defaultActiveKey="/pokedex"
              activeKey={location.pathname}
            >
              <Nav.Item>
                <Nav.Link href="/pokedex">
                  <NavTab>Pokédex</NavTab>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/my-pokemon">
                  <NavTab>My Pokémon</NavTab>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

const NavTab = styled.h4`
  color: #696969;
`;
const Logo = styled.img`
`;

export default NavigationBar;
