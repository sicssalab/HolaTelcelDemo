import React from 'react';
import { Text } from '~components';
import { Title, Container } from './styles';

export const Header = () => {
  return (
    <Container>
      <Title>
        <Text fontSize='h3' fontWeight='bold'>Pueblos Mágicos</Text>
      </Title>
      <Text style={{textAlign: "center", marginBottom: 20}}>Actualmente existe 32 pueblos mágicos listados a continuación en orden alfabetico</Text>
    </Container>
  );
};
