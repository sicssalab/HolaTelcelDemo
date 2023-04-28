import { Header } from './components';
import { Container } from './styles';
import { Platform } from 'react-native';
import { StoryFeed } from './components/StoryFeed';

function Story({route}) {
  
  return (
      <Container behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <Header />
        <StoryFeed 
        item={route.params.user}
        />
      </Container>
  );
}

export default Story;
