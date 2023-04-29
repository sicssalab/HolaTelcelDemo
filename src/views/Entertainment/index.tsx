import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeComponent } from '~components';
import { SceneName } from '~src/@types/SceneName';
//import { FeedPost } from '~views/PostFeed';
import { mockEntertainment } from '~views/PostFeed/__mocks__';
import { mockRequest } from './__mocks__';
import { Header } from './components/Header';
import { Container } from './styles';
import ListGlobalPost from '~components/ui/ListGlobalPost';

function Component() {
  const navigation = useNavigation();

  const onNavigateClick = (item) => {
    navigation.navigate(SceneName.GroupProfile, { id: item.id }); // Asegúrate de que "Profile" sea el nombre correcto de la ruta de navegación
  };

  return (
    <Container>
      <SafeComponent request={mockRequest}>
        <Header />
      </SafeComponent>
      {/* <FeedPost postContent={mockEntertainment.data} /> */}
      <ListGlobalPost items={mockEntertainment.data} onNavigateClick={onNavigateClick} />
    </Container>
  );
}

export default Component;
