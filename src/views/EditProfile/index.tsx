import React, { useContext, useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Image,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import { ThemeContext } from 'styled-components/native';
import { Input, RadioButtons } from '~components';
import Divider from '~components/Divider';
import { useNavbarStyle } from '~components/Navbar';
import { SceneName } from '~src/@types/SceneName';

import { Header } from './components/Header';
import {
  BottomPadding,
  Container,
  ContinueButton,
  numOfColumns,
} from './styles';

/* toggle includeExtra */
const includeExtra = true;

const EditProfile = ({ route }) => {
  const themeContext = useContext(ThemeContext);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [gender, setGender] = useState('');

  const [image, setImage] = useState(null);

  // Swipe gestures need to be disabled when Draggable is active,
  // othewise the user will perform multiple gestures and the behavior
  // will be undesirable
  const [gesturesEnabled, setgesturesEnabled] = useState(true);

  const headerHeight = useHeaderHeight();
  const navbarHeight = useNavbarStyle().height;

  const continueButtonDisabled = Boolean(!gender);

  const [response, setResponse] = useState<any>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) setImage(result.assets[0].uri);
  };

  return (
    <>
      <StatusBar style={themeContext.dark ? 'light' : 'dark'} />
      <Header />
      <Divider />
      <KeyboardAvoidingView
        style={{ flexGrow: 1 }}
        keyboardVerticalOffset={
          route.name === SceneName.EditProfile ? headerHeight : navbarHeight
        }
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <Container
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 15, paddingBottom: 30 }}
          scrollEnabled={gesturesEnabled}>
          <View style={styles.AvatarWrapper}>
            <View style={styles.AvatarContainer}>
              {image ? (
                <Image source={{ uri: image }} style={styles.Avatar} />
              ) : (
                <Image
                  source={require('~images/placeholder.png')}
                  style={styles.Avatar}
                />
              )}
              <TouchableOpacity
                style={styles.AvatarOverlay}
                onPress={pickImage}>
                <Ionicons name='pencil' size={14} color='white' />
              </TouchableOpacity>
            </View>
          </View>
          <Input
            title='Mi nombre'
            placeholder='Escribe tu nombre completo'
            value={name}
            onChangeText={setName}
            maxLength={50}
          />
          <Input
            title='Algo sobre mi'
            placeholder='¡Cuéntanos algo interesante de ti!'
            value={bio}
            onChangeText={setBio}
            maxLength={500}
            multiline
          />
          <RadioButtons
            title='Sexo'
            data={['Hombre', 'Mujer', 'Otro']}
            value={gender}
            onChange={setGender}
          />
        </Container>
        <ContinueButton
          disabled={continueButtonDisabled}
          onPress={() =>
            navigation.navigate(SceneName.Home, {
              screen: SceneName.Entertainment,
            })
          }>
          Guardar cambios
        </ContinueButton>
      </KeyboardAvoidingView>
      <BottomPadding
        disabled={continueButtonDisabled}
        style={{ height: insets.bottom }}
      />
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  AvatarWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  AvatarContainer: {
    position: 'relative',
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#ccc',
    overflow: 'hidden',
  },
  Avatar: {
    width: '100%',
    height: '100%',
  },
  AvatarOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderBottomLeftRadius: 75,
    borderBottomRightRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
