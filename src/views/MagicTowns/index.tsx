import React from 'react';
import { FlatList } from 'react-native';

import { SafeComponent } from '~components';
import Divider from '~components/Divider';

import { Header } from './components/Header';

import { Container } from './styles';

import { mockRequest } from './__mocks__';

function Component() {
  return (
    <Container>
      <SafeComponent request={mockRequest}>
        <Header />
        <Divider />
      </SafeComponent>
    </Container>
  );
}

export default Component;
