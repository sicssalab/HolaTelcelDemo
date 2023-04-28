import React, { useRef } from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { Audio, Video, ResizeMode } from 'expo-av';
const{ height, width } = Dimensions.get('window');

const PlayerFeed = ( { videoParams }) => {
    const videoRef = useRef(null)

    const onBuffer = (e) => {
        console.log('bufering..', e);
    };
    const onError = (e) => {
        console.log('error rised', e);
    };

    if(videoParams.isPlay){
        return (  
            <Video
                source={{ uri: videoParams.url }}
                ref={videoRef}
                resizeMode={ResizeMode.CONTAIN}
                onBuffer={onBuffer}
                onError={onError}
                shouldPlay={true}
                style={styles.backgroundVideo}
                isLooping={true}
            /> 
        );
    }else{
        return ( 
        <View>
            <Text>Is Loading...</Text>
        </View> 
        )
    }
};

export default PlayerFeed;

const styles = StyleSheet.create({
    backgroundVideo:{
      position: 'absolute',
      height: height,
      width:width
    }
  })
  