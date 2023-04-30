import React, { useCallback, useContext, useState } from 'react';
import {
  Image,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from 'styled-components/native';
//import RadioIconActive from '~assets/icons/stream/podcasts-active.svg';
import RadioIcon from '~assets/icons/stream/podcasts.svg';
import SearchIcon from '~assets/icons/general/search.svg';
import { SceneName } from '~src/@types/SceneName';
import { Container, SearchIconWrapper, LogoWrapper, LeftSide, RightSide } from './styles';
import ModalRadio from '~components/ModalRadio/ModalRadio';

const TOP_HEIGHT = 60;

export const useTopHeaderStyle = () => {
  const { top } = useSafeAreaInsets();

  return {
    paddingTop: top,
    height: top + TOP_HEIGHT,
  };
};

function TopHeader() {
  const themeContext = useContext(ThemeContext);
  const style = useTopHeaderStyle();
  const navigation = useNavigation();

  const backToHome = useCallback(() => {
    navigation.navigate(SceneName.Home, { screen: SceneName.Entertainment });
  }, []);
  const [showModal, setShowModal] = useState(false);

  const onShowModal = () => {
    setShowModal(!showModal);
  };

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
        <TouchableOpacity activeOpacity={1} onPress={onShowModal}>
          <RadioIcon fill={themeContext.colors.text} />
        </TouchableOpacity>
      </RightSide>
      <ModalRadio 
        onClose={onShowModal}
        modalVisible={showModal}
      />
    </Container>
  );
}

export default TopHeader;
