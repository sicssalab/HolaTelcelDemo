import React from 'react';
import { Text } from '~components';
import { useNavigation } from '@react-navigation/native';
import { Container, Picture, Content } from './styles';
import { SceneName } from '~src/@types/SceneName';
import { User } from '~src/@types/User';

export const Preview = ({ item, index }) => {
  const navigation = useNavigation();
  
  return (
    <Container
      onPress={() => navigation.navigate(SceneName.Story, { user: item })}>
      <Picture source={{ uri: item.srcPreview }} />
      <Content>
        <Text fontSize='small' fontWeight='semiBold' numberOfLines={1}>
          {item.name}
        </Text>
      </Content>
    </Container>
  );
};
