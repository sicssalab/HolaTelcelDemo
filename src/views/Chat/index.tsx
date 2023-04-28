import React, { useReducer } from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RouteProp } from '@react-navigation/native';
import { SafeComponent } from '~components';
import { SceneName } from '~src/@types/SceneName';
import { RootStackParamList } from '~src/@types/react-navigation';

import { DateMessage, Send, Header, NextDay } from './components';
import Store, { INITIAL_STATE, reducers, Selectors } from './store';
import { Message, State } from './store/reducers';
import { Container, BottomPadding, Messages } from './styles';

const Empty = () => <NextDay message={{ createdAt: new Date() }} />;

export type IChat = RouteProp<RootStackParamList, SceneName.Chat>;

function Chat() {
  const [state, dispatch] = useReducer(reducers, INITIAL_STATE);

  const displayMessages = Selectors.getMessagesDisplay(state as State);

  const mockRequest = {
    data: displayMessages,
    loading: false,
    error: false,
  };

  const insets = useSafeAreaInsets();

  return (
    <Store.Provider value={{ state, dispatch }}>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <Header />
        <SafeComponent request={mockRequest}>
          <Messages
            inverted={!!mockRequest.data?.length}
            data={mockRequest.data}
            keyExtractor={(message: Message) => String(message._id)}
            ListFooterComponent={
              !mockRequest.data && <NextDay message={mockRequest.data[0]} />
            }
            ListEmptyComponent={<Empty />}
            renderItem={DateMessage}
          />
        </SafeComponent>
        <Send />
      </Container>
      <BottomPadding style={{ height: insets.bottom }} />
    </Store.Provider>
  );
}

export default Chat;
