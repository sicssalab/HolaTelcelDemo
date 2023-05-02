import React from 'react';

import { Container } from './styles';

import { mockRequest } from '~views/Entertainment/__mocks__';
import { FlatList } from 'react-native';
import { Preview } from '../Preview';
import mocksStory from "../../../../mocks/entretenimiento/mocksStory.json";

export const Header = () => {
  return (
    <Container>
      <FlatList
        data={mocksStory.data}
        renderItem={({ item, index }) => <Preview item={item} index={index} />}
        horizontal
        contentContainerStyle={{ paddingHorizontal: 7, paddingTop: 7 }}
      />
    </Container>
  );
};
