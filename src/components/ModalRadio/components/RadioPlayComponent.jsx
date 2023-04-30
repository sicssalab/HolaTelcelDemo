import React, { useState, useRef, useContext } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import { Audio } from 'expo-av';
//import { Video, AVPlaybackStatus, ResizeMode } from 'expo-av';
import Constants from 'expo-constants';
import { ThemeContext } from 'styled-components/native';
import PauseIcon from '~assets/icons/pause.svg';
import PlayIcon from '~assets/icons/play_arrow.svg';

const RadioPlayComponent = (props) => {
  const { stacion, musicON } = props;
  const themeContext = useContext(ThemeContext);

  const [Loaded, SetLoaded] = React.useState(false);
  const [Loading, SetLoading] = React.useState(false);
  let sound = React.useRef(new Audio.Sound());

  React.useEffect(() => {
      console.log(musicON, 'carga la info del audio');
    LoadAudio();
    //PlayAudio(); TODO no se puede asi porque es async
  }, [musicON]);

  const PlayAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      console.log(result)
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          sound.current.playAsync();
        }
      }
    } catch (error) {
      console.log(error, 'func play audio');
    }
  };

  const PauseAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === true) {
          sound.current.pauseAsync();
        }
      }
    } catch (error) {
      console.error(error, 'func pasuse audio');
    }
  };
  const LoadAudio = async () => {
    SetLoading(true);
    const checkLoading = await sound.current.getStatusAsync();
    //console.log("")
    if (checkLoading.isLoaded === false) {
      try {
        console.log('entrar a cargar el audio');
        const result = await sound.current.loadAsync(musicON.audio, {}, true);

        if (result.isLoaded === false) {
          SetLoading(false);
          console.log('Error in Loading Audio');
        } else {
          console.log(
            'cargo el video quita el loagind y dice que Loaded cargado video es true',
          );
          sound.current.playAsync();
          SetLoading(false);
          SetLoaded(true);
        }
      } catch (error) {
        console.log(error, ' func load audio');
        SetLoading(false);
      }
    }
    else {
        console.log("tiene audio activo por lo que no cargara uno nuevo")
        console.log("crear nuevo audio")
        SetLoading(false);
        // sound = await Audio.Sound.createAsync(musicON.audio)
        // await sound.playAsync();
    }
    // else {
    //     //SetLoading(false);
    //     try {

    //         //TODO recarga audio
    //         //const { sound } = await Audio.Sound.createAsync(musicON.audio);
    //         sound = await Audio.Sound.createAsync(musicON.audio)
    //         //await sound.playAsync();
    //     }
    //     catch(error) {
    //         console.log(error, ' func load new audio');
    //     SetLoading(false);
    //     }
    // }
  };
  //   const [sound, setSound] = React.useState();
  //   const [play, setPlay] = useState(false);

  //   async function playSound() {
  //     if (musicON) {
  //       console.log('Loading Sound');
  //       const { sound } = await Audio.Sound.createAsync(
  //         //require('./assets/Hello.mp3'),
  //         musicON.audio,
  //       );
  //       setSound(sound);
  //       setPlay(true);
  //       console.log('Playing Sound');
  //       await sound.playAsync();
  //     }
  //   }

  //   async function playPause() {
  //       setPlay(false);

  //       await sound.pauseAsync();
  //       setSound();
  //   }

  //   React.useEffect(() => {
  //     playSound();
  //     return sound
  //       ? () => {
  //           console.log('Unloading Sound');
  //           sound.unloadAsync();
  //         }
  //       : undefined;
  //   }, [musicON, sound]);

  return (
    <View style={styles.contaner}>
      <Text style={{ color: 'white' }}>{stacion?.name}</Text>
      <Text style={{ color: 'white' }}>{musicON?.name}</Text>
      <View>
        <View>
          {Loading ? (
            <ActivityIndicator size={'small'} color={'red'} />
          ) : (
            <>
              {Loaded === false ? (
                <>
                  <ActivityIndicator />
                  <Text>Loading Song </Text>
                </>
              ) : (
                <>
                  <Button title='Play Song' onPress={PlayAudio} />
                  <Button title='Pause Song' onPress={PauseAudio} />
                  {Loaded && (
                    <TouchableOpacity onPress={PauseAudio}>
                      <PauseIcon
                        width={20}
                        height={20}
                        fill={themeContext.colors.text}
                      />
                    </TouchableOpacity>
                  )}
                  {!Loaded && (
                    <TouchableOpacity onPress={PlayAudio}>
                      <PlayIcon
                        width={20}
                        height={20}
                        fill={themeContext.colors.text}
                      />
                    </TouchableOpacity>
                  )}
                </>
              )}
            </>
          )}
        </View>
        <View>
          <Text>scooolbar</Text>
          <Text>indicador de tiempos</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  contaner: {
    backgroundColor: '#111001',
    flexDirection: 'column',
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 50,
    padding: 15,
    borderRadius: 15,
  },
  contentHeader: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  header: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalContainer: {
    backgroundColor: '#1e1e1e',
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  modalContainerBody: {
    marginTop: Constants.statusBarHeight,
    backgroundColor: 'red',
    flex: 1,
    //width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  modalImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'cover',
    marginVertical: 10,
  },
  closeButton: {
    position: 'absolute',
    color: '#fff',
    fill: '#fff',
    top: 10,
    right: 10,
    zIndex: 1,
  },
});

export default RadioPlayComponent;
