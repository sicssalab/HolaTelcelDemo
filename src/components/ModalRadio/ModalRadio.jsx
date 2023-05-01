import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';

import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Video, AVPlaybackStatus, ResizeMode } from 'expo-av';
import Constants from 'expo-constants';
import mockEstaciones from '~src/mocks/mockEstaciones';

import ModalRadioTabs from './components/ModalRadioTabs';
import RadioPlayComponent from './components/RadioPlayComponent';

const ModalRadio = (props) => {
  const { modalVisible, Loading, Loaded, playMusic } = props;

  //TODO por default toma a radio como inicia
  const [streamPlayTab, setStreamPlayTab] = useState(null);
  const [musicON, setMusicOn] = useState(null);
  const onClose = () => {
    const { onClose } = props;
    onClose && onClose();
  };

  const onPressPlayMusicItem = (type, id) => {
    switch (type) {
        case "radio":
            setStreamPlayTab(mockEstaciones.radio.data.find((item) => item.id == id))
            setMusicOn(mockEstaciones.radio.play);
            //setMusicOn(mockEstaciones.podcast.play);
            //TODO detener la musica, cambiar de musica y play
            break;
            case "podcast":
            setStreamPlayTab(mockEstaciones.podcast.data.find((item) => item.id == id))
            setMusicOn(mockEstaciones.podcast.play);
            //TODO detener la musica, cambiar de musica y play
            break;
            case "music":
            setStreamPlayTab(mockEstaciones.music.data.find((item) => item.id == id))
            setMusicOn(mockEstaciones.music.play);
            //TODO detener la musica, cambiar de musica y play
            break;
        default:
    }    
  };

  
  const PlayAudio = () => {
    const {onPlayAudio} = props;
    onPlayAudio && onPlayAudio();
  }
  const PauseAudio = () => {
    const {onPauseAudio} = props;
    onPauseAudio && onPauseAudio();
  }

  return (
    <Modal
      animationType='slide'
      transparent={false}
      visible={modalVisible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContainerBody}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name='close' size={40} color='white' />
          </TouchableOpacity>
          <View style={{ flex: 1, width: '100%' }}>
            <View style={styles.contentHeader}>
              <Text style={styles.header}>Estaciones</Text>
            </View>
            <ModalRadioTabs onPressPlayMusicItem={onPressPlayMusicItem} onClickTab={PauseAudio} />
          </View>
          {streamPlayTab && <RadioPlayComponent 
          musicON={musicON} stacion={streamPlayTab}
            onPlayAudio={PlayAudio}
            onPauseAudio={PauseAudio}
            Loading={Loading}
            Loaded={Loaded}
            playMusic={playMusic}
          />}

          {/* <ScrollView style={{ width: '100%' }}>
            <Text>Contenido de la radio</Text>
          </ScrollView> */}
        </View>
      </View>
    </Modal>
  );
};
ModalRadio.defaultProps = {
  hasbuttonLink: true,
};
const styles = StyleSheet.create({
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

export default ModalRadio;
