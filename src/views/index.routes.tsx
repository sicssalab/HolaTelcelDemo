import React, { useContext } from 'react';
import { Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import { ThemeContext } from 'styled-components/native';
import ExperienceIconActive from '~assets/icons/menu/experience-active.svg';
import ExperienceIcon from '~assets/icons/menu/experience.svg';
import EntertainmentIconActive from '~assets/icons/menu/home-active.svg';
import EntertainmentIcon from '~assets/icons/menu/home.svg';
import AvenuesIconActive from '~assets/icons/menu/location-active.svg';
import AvenuesIcon from '~assets/icons/menu/location.svg';
import MagicTownsIconActive from '~assets/icons/menu/magictowns-active.svg';
import MagicTownsIcon from '~assets/icons/menu/magictowns.svg';
import MenuProfileIconActive from '~assets/icons/menu/menu-active.svg';
import MenuProfileIcon from '~assets/icons/menu/menu.svg';
import { SceneName } from '~src/@types/SceneName';
import { RootStackParamList } from '~src/@types/react-navigation.d';
import AvenuesView from '~views/Avenues';
import EditProfileView from '~views/EditProfile';
import EntertainmentView from '~views/Entertainment';
import ExperienceView from '~views/Experience';
import MagicTownsView from '~views/MagicTowns/MagicTowns';
import Navbar from '../components/Navbar';
import TopHeader from '../components/TopHeader';
import Authentication from './Authentication';
import Chat from './Chat';
import EditProfile from './EditProfile';
import OneTimeCode from './OneTimeCode';
import Registration from './Registration';
import Story from './Story';
import UserProfile from './UserProfile';
import ProfileScreen from './ProfileScreen/ProfileScreen';
import ModalView from './ModalView';
import GroupSectionScreen from './GroupSectionScreen/GroupSectionScreen';

const Tab = createMaterialTopTabNavigator<RootStackParamList>();
const Stack = createStackNavigator<RootStackParamList>();
const screenWidth = Dimensions.get('window').width;

const Tabs = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <>
      <TopHeader />
      <Tab.Navigator
        tabBar={(props) => <Navbar {...props} />}
        initialLayout={{ width: screenWidth }}
        screenOptions={{
          tabBarInactiveTintColor: themeContext.colors.text,
        }}
        initialRouteName={SceneName.Authentication}
        // springConfig={{
        //   stiffness: 2000,
        //   damping: 1000,
        //   mass: 5,
        //   overshootClamping: true,
        //   restDisplacementThreshold: 0.05,
        //   restSpeedThreshold: 0.05,
        // }}
        >
        <Tab.Screen
          name={SceneName.Entertainment}
          options={{
            tabBarIcon: ({ focused, color }) =>
              focused ? (
                <EntertainmentIconActive />
              ) : (
                <EntertainmentIcon fill={color} />
              ),
          }}
          // navigationOptions={{
          //   headerLeft: null,
          //   headerTitle: 'Tab 1 Screen',
          // }}
          component={EntertainmentView}
        />
        <Tab.Screen
          name={SceneName.Avenues}
          options={{
            tabBarIcon: ({ focused, color }) =>
              focused ? <AvenuesIconActive /> : <AvenuesIcon fill={color} />,
          }}
          component={AvenuesView}
        />
        <Tab.Screen
          name={SceneName.Experience}
          options={{
            tabBarIcon: ({ focused, color }) =>
              focused ? (
                <ExperienceIconActive />
              ) : (
                <ExperienceIcon fill={color} />
              ),
          }}
          component={ExperienceView}
        />
        <Tab.Screen
          name={SceneName.MagicTowns}
          options={{
            tabBarIcon: ({ focused, color }) =>
              focused ? (
                <MagicTownsIconActive />
              ) : (
                <MagicTownsIcon fill={color} />
              ),
          }}
          component={MagicTownsView}
        />
        <Tab.Screen
          name={SceneName.MenuProfile}
          options={{
            tabBarIcon: ({ focused, color }) =>
              focused ? (
                <MenuProfileIconActive />
              ) : (
                <MenuProfileIcon fill={color} />
              ),
          }}
          component={EditProfileView}
        />
      </Tab.Navigator>
    </>
  );
};

function Router() {
  const theme = useContext(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName={SceneName.Entertainment}
      screenOptions={{
        headerShown: false,
        headerBackTitle: 'Volver',
        headerTitleAlign: 'center',
        headerStyle: {
          //backgroundColor: theme.colors.headerBackground,
        },
        headerTitleStyle: {
          fontFamily: theme.typography.fontFamily.bold,
          fontSize: 20,
          color: theme.colors.text,
        },
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
      }}>
      <Stack.Group>
        <Stack.Screen name={SceneName.Home} component={Tabs} />
        <Stack.Screen name={SceneName.UserProfile} component={UserProfile} />
          
        <Stack.Screen
          name={SceneName.EditProfile}
          options={{
            headerTitle: 'Crear su perfil',
            headerShown: true,
            headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
          }}
          component={EditProfile}
        />
        <Stack.Screen name={SceneName.Chat} component={Chat} />
        <Stack.Screen name={SceneName.Story} component={Story} />
        <Stack.Screen name={SceneName.ProfileScreen} component={ProfileScreen} />
        <Stack.Screen name={SceneName.GroupProfile} component={GroupSectionScreen} />
        <Stack.Screen name={SceneName.ModalView} component={ModalView} />

      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name={SceneName.Authentication}
          component={Authentication}
        />
        <Stack.Screen name={SceneName.OneTimeCode} component={OneTimeCode} />
        <Stack.Screen
          name={SceneName.Registration}
          options={{
            headerTitle: 'Registrar nuevo usuario',
            headerShown: true,
            headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
          }}
          component={Registration}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default Router;
