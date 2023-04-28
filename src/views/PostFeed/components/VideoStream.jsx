import { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Linking,
} from 'react-native';

import { Video, ResizeMode } from 'expo-av';
import { height, width } from '~constants';

const VideoStream = ({videoData}) => {
  const video = videoData;
  const videoRef = useRef(null);
  
  const onBuffer = (e) => {
    console.log('bufering..', e);
  };
  
  const onError = (e) => {
    console.log('error rised', e);
  };

  return (
    <Video
      source={{ uri: video.url ? video.url : video }}
      ref={videoRef}
      useNativeControls = {video.url ? false : true}
      resizeMode={ResizeMode.COVER}
      onBuffer={onBuffer}
      onError={onError}
      shouldPlay= {false}//{autoPlay}
      style={{ height: video.height ? video.height : 350, width: video.width ? video.width : '100%' }}
    />
  );
 
};

export default VideoStream;
