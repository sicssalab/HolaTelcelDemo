import React, { useCallback, useContext } from 'react';
import { Dimensions } from 'react-native';
import {
  ActivityIndicator,
  Linking,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from 'styled-components/native';
import RadioIconActive from '~assets/icons/stream/podcasts-active.svg';
import RadioIcon from '~assets/icons/stream/podcasts.svg';
import SearchIcon from '~assets/icons/general/search.svg';
import Text from '~components/Text';
import LogoHola from '~images/HolaTelcel.svg';
import { SceneName } from '~src/@types/SceneName';

import { Container, SearchIconWrapper, LogoWrapper, LeftSide, RightSide } from './styles';

const TOP_HEIGHT = 60;
const screenWidth = Dimensions.get('window').width;

export const useTopHeaderStyle = () => {
  const { top } = useSafeAreaInsets();

  return {
    paddingTop: top,
    height: top + TOP_HEIGHT,
  };
};

const INDICATOR_WIDTH = 30;

function TopHeader() {
  const themeContext = useContext(ThemeContext);
  const style = useTopHeaderStyle();
  const navigation = useNavigation();

  const backToHome = useCallback(() => {
    navigation.navigate(SceneName.Home, { screen: SceneName.Entertainment });
  }, []);

  return (
    <Container style={[style]}>
      <LeftSide>
        <LogoWrapper>
          <Image
            source={require('~images/HolaTelcel.png')}
            style={{
              flex: 1,
              width: undefined,
              height: undefined,
              resizeMode: 'contain',
            }}
          />
        </LogoWrapper>
      </LeftSide>
      <RightSide>
        <SearchIconWrapper>
          <SearchIcon fill={themeContext.colors.text} />
        </SearchIconWrapper>
        <TouchableOpacity activeOpacity={1} onPress={backToHome}>
          <RadioIcon fill={themeContext.colors.text} />
        </TouchableOpacity>
      </RightSide>
    </Container>
  );
}

export default TopHeader;
