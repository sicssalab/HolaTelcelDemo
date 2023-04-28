import React from 'react';

import { Text } from '~components';

import { Title, Container } from './styles';

import { mockRequest } from '~views/Messages/__mocks__';

export const Header = () => {
  return (
    <Container>
      <Title>
        <Text fontSize='h3' fontWeight='bold'>Pueblos Mágicos</Text>
      </Title>
    </Container>
  );
};
