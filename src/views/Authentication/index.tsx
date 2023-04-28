import React, { useState, useContext } from 'react';
import { Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ThemeContext } from 'styled-components/native';
import { Button } from '~components';
import Text from '~components/Text';
import LogoHola from '~images/HolaTelcel.svg';
import { SceneName } from '~src/@types/SceneName';

import HeroText from './components/HeroText';
import { Underline } from './components/HeroText';
import PasswordInput from './components/PasswordInput';
import PhoneInput from './components/PhoneInput';
import { Container, LogoContainer, RegContainer } from './styles';
import {
  Title,
  Highlight,
  BottomCard,
  BottomPadding,
  LoginButton,
  Description,
  TopCard,
} from './styles';

const SET_NUMBER = '(999) 9999-999';
export const useCustomBottomInset = () => {
  const insets = useSafeAreaInsets();
  return Math.max(20, insets.bottom + 5);
};

const Authentication = () => {
  const themeContext = useContext(ThemeContext);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const bottomInset = useCustomBottomInset();
  const [loading, setLoading] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handlePhoneNumberChange = (phone: string) => {
    setPhoneNumber(phone);
  };

  const handlePasswordChange = (password: string) => {
    setPassword(password);
  };

  const handleLogin = async () => {
    setLoading(true);

    if (phoneNumber === SET_NUMBER) {
      Alert.alert(
        'Error de acceso',
        'El número de teléfono celular no se encuentra registrado, por favor registrate y se parte de nuestra comunidad Telcel.',
      );
      setLoading(false);
      return;
    }

    setTimeout(() => {
      navigation.navigate(SceneName.OneTimeCode);
      setLoading(false);
    }, 1000);
  };

  const goToRegister = async () => {
    navigation.navigate(SceneName.Registration);
  };

  const loginButtonDisabled = Boolean(!phoneNumber || !password);

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{ flexGrow: 1 }}>
        <StatusBar style={themeContext.dark ? 'light' : 'light'} />
        <TopCard style={{ paddingTop: 20 + insets.top }}>
          <LogoContainer>
            <Image source={require('~assets/images/HolaTelcel.png')} />
          </LogoContainer>
          <HeroText />
        </TopCard>
        <BottomCard style={{ paddingBottom: bottomInset }}>
          <Title>
            Ingresa tu número <Highlight>telcel</Highlight>
          </Title>
          <Description>
            Envíaremos un código de verificación a tu celular para confirmar el
            acceso.
          </Description>
          <PhoneInput
            enablesReturnKeyAutomatically
            returnKeyType='send'
            onPhoneNumberChange={handlePhoneNumberChange}
            blurOnSubmit={false}
            placeholder='(999) 9999-999'
          />
          <PasswordInput onPasswordChange={handlePasswordChange} />
          <LoginButton
            loading={loading}
            disabled={loginButtonDisabled}
            onPress={handleLogin}>
            Iniciar sesión
          </LoginButton>
          <TouchableOpacity activeOpacity={1} onPress={goToRegister}>
            <RegContainer>
              <Underline>
                <Text fontSize='large' fontWeight='bold'>
                  ¡Regístrate!
                </Text>
              </Underline>
            </RegContainer>
          </TouchableOpacity>
        </BottomCard>
      </KeyboardAvoidingView>
      <BottomPadding
        disabled={loginButtonDisabled}
        style={{ height: insets.bottom }}
      />
    </Container>
  );
};

export default Authentication;
