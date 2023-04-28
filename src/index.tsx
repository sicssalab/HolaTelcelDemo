import React, { useEffect, useMemo } from 'react';
import { LogBox } from 'react-native';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from '@use-expo/font';
import { registerRootComponent } from 'expo';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import { Loading, SafeComponent } from '~components';
import { useDidMountEffect } from '~services/utils';

import { store } from './store';
import { DefaultTheme, Font, LightTheme, DarkTheme } from './themes';
import Router from './views/index.routes';

LogBox.ignoreLogs([
  "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
]);

enableScreens();

export default function App() {
  let [fontsLoaded] = useFonts({
    [Font.GilroyBold]: require('~assets/fonts/Gilroy-Bold.ttf'),
    [Font.GilroyExtraBold]: require('~assets/fonts/Gilroy-ExtraBold.ttf'),
    [Font.GilroyLight]: require('~assets/fonts/Gilroy-Light.ttf'),
    [Font.GilroyMedium]: require('~assets/fonts/Gilroy-Medium.ttf'),
    [Font.GilroyRegular]: require('~assets/fonts/Gilroy-Regular.ttf'),
    [Font.GilroySemiBold]: require('~assets/fonts/Gilroy-SemiBold.ttf'),
  });

  const colorScheme = useColorScheme();
  const theme = useMemo(() => {
    if (!colorScheme) return DefaultTheme;
    return colorScheme === 'dark' ? DarkTheme : DarkTheme;
  }, [colorScheme]);

  useEffect(() => {
    // Wait for the assets to load before hiding the SplashScreen
    SplashScreen.preventAutoHideAsync();
  }, []);

  useDidMountEffect(() => {
    if (fontsLoaded) setTimeout(SplashScreen.hideAsync, 100);
  }, [fontsLoaded]);

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <SafeComponent request={{ loading: !fontsLoaded, data: true }}>
          <Provider store={store}>
            <StatusBar style='dark' />
            <NavigationContainer theme={theme as any}>
              <Router />
            </NavigationContainer>
          </Provider>
        </SafeComponent>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

registerRootComponent(App);
