import React from 'react';
import { useContext } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import { StatusBar } from 'expo-status-bar';
import { ThemeContext } from 'styled-components/native';
import { MatchActionBar } from '~components';
import { getCards, getCurrentCardId } from '~store/selectors';

import SwipeBackButton from './components/SwipeBackButton';
import SwipeHandler, { swipeHandlerRef } from './components/SwipeHandler';
import { Swipe } from './components/SwipeHandler/hooks/useSwipeGesture';
import SwipeRequestFeedback from './components/SwipeRequestFeedback';
import { Container } from './styles';

export const useCustomBottomInset = () => {
  const insets = useSafeAreaInsets();
  return Math.max(20, insets.bottom + 5);
};

const MatchActionBarWrapper = () => {
  const currentCard = useSelector(getCurrentCardId);

  if (!currentCard) return null;

  return (
    <MatchActionBar
      onNope={() => swipeHandlerRef.current.gotoDirection(Swipe.Dislike)}
      onYep={() => swipeHandlerRef.current.gotoDirection(Swipe.Like)}
      onMaybe={() => swipeHandlerRef.current.gotoDirection(Swipe.Maybe)}
      animated
    />
  );
};

const SwipeHandlerWrapper = (card) => {
  return <SwipeHandler key={card.id} card={card} />;
};

const Matches = () => {
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const cards = useSelector(getCards);

  return (
    <Container style={{ marginBottom: bottomInset }}>
      <StatusBar style={themeContext.dark ? 'light' : 'dark'} />
      <Container>
        <SwipeBackButton />
        <SwipeRequestFeedback />
        {cards?.map(SwipeHandlerWrapper).reverse()}
      </Container>
      <MatchActionBarWrapper />
    </Container>
  );
};

export default Matches;
