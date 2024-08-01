import { Modal, Container, Row, Col, Button } from 'react-bootstrap';
import {
  PokedexEntry,
  PokemonProps,
  PokemonSearch,
} from '../interfaces/pokemon_interface';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { client, POKEMON_IMAGE_URL, POKEMON_SEARCH_URL, POKEMON_SPRITE_URL } from '../api/httpClient';

const PokemonProfile = ({ name: url }: PokemonProps) => {
  const [pokemon, setPokemon] = useState<PokedexEntry | null>(null);

  useEffect(() => {
    client
      .get<PokemonSearch>(`${POKEMON_SEARCH_URL}q=${url}`)
      .then((response) => {
        setPokemon(response.data.results[0]);
      });
  }, [url]);

  const pokeID = String(pokemon?.id).padStart(4, '0');

  const pokeTypes = pokemon?.types.map((type) => {
    return type + '\n';
  });

  const handleClick = (event: React.FormEvent) => {
    event.preventDefault();
  }

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          <Name>
            <strong>
              <img src={`${POKEMON_SPRITE_URL}${url}.png`} width={75} height={75} />
              {pokemon?.name + ' '}
            </strong>

            <text>#{pokeID}</text>
          </Name>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col xs={6} md={4}>
              <img src={`${POKEMON_IMAGE_URL}${url}.png`} width={250} height={250} />
            </Col>
            <Col xs={12} md={8}>
              <Description>
                <h5>Description</h5>
                <p>{pokemon?.description}</p>
                <Row>
                  <Col xs={4} md={3}>
                    <h6>Height</h6>
                    <p>{pokemon?.height}m</p>
                  </Col>
                  <Col xs={4} md={3}>
                    <h6>Weight</h6>
                    <p>{pokemon?.weight}kg</p>
                  </Col>
                  <Col xs={4} md={3}>
                    <h6>Type</h6>
                    <Types>
                      {(pokeTypes?.length || 0) > 0
                        ? pokeTypes?.map((i) => {
                            return <img src={'src/assets/' + i + '.png'} />;
                          })
                        : null}
                    </Types>
                  </Col>
                </Row>
              </Description>
            </Col>

            <Button variant="secondary" onClick={handleClick}>Add to team</Button>
          </Row>
        </Container>
      </Modal.Body>
    </>
  );
};

const Name = styled.div`
  text-transform: capitalize;
  margin: -0.5rem;
  > text {
    color: #7b7b7b;
    font-size: medium;
    font-style: italic;
  }
`;

const Description = styled.div`
  > h6 {
    text-align: left;
  }
`;

const Types = styled.div`
  > img {
    padding-right: 5%;
    width: auto;
    height: 18px;
  }
`;

export default PokemonProfile;
