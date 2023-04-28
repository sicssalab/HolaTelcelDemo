import React from 'react';
import { SafeComponent } from '~components';
import { Header } from './components/Header';
import { Container } from './styles';

import { mockRequest } from './__mocks__';
import { mockEntertainment } from '~views/PostFeed/__mocks__';

import { FeedPost } from '~views/PostFeed';


function Component() {
  return (
    <Container>
      <SafeComponent request={mockRequest}>
        <Header/>
      </SafeComponent>
      <FeedPost postContent={mockEntertainment.data}/>
    </Container>
  );
}

export default Component;
