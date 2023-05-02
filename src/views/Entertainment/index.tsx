import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeComponent } from '~components';
import { SceneName } from '~src/@types/SceneName';
//import { FeedPost } from '~views/PostFeed';
import { mockEntertainment } from '~views/PostFeed/__mocks__';
import { mockRequest } from './__mocks__';
import mocksStory from "../../mocks/entretenimiento/mocksStory.json";
import { Header } from './components/Header';
import { Container } from './styles';
import ListGlobalPost from '~components/ui/ListGlobalPost';
import mocksEntretenimiento from "../../mocks/entretenimiento/mocksEntretenimiento.json";

function Component() {
  const navigation = useNavigation();

  const onNavigateClick = (item) => {
    navigation.navigate(SceneName.GroupProfile, { id: item.id }); // Asegúrate de que "Profile" sea el nombre correcto de la ruta de navegación
  };

  return (
    <Container>
      <SafeComponent request={mocksStory}>
        <Header />
      </SafeComponent>
      <ListGlobalPost items={mocksEntretenimiento.data} onNavigateClick={onNavigateClick} />
    </Container>
  );
}

export default Component;
