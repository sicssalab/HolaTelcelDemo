import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Modal,
  Linking,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import styled from 'styled-components/native';
import VideoStream from './VideoStream';
import NoContent from './NoContent';
import { SceneName } from '~src/@types/SceneName';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

const MediaPostFeed = ({itemContent}) => {
  const  itemsData = itemContent.videos;
  const post = itemContent;
  const navigation = useNavigation();
  
  if(itemsData.length == 0){
    return (
      <View style={styles.content}>
        <NoContent/>
      </View>
    );
  }else if(itemsData.length == 1){
    return (
      <View style={styles.contentOne}>
          {itemsData && (
              itemsData.map((video, index) =>
                <VideoStream
                  videoData={video}
                  key={video.id || index}
                />
              )
          )}
      </View>
    );
  }else if(itemsData.length == 2){
    return (
      <View style={styles.contentDual}>
        <TouchableOpacity  onPress={ () => navigation.navigate(SceneName.ModalView, { post }) }>
          {itemsData && (
              itemsData.map((video, index) => 
                <VideoStream
                  key={video.id || index}
                  videoData={{ url: video, height: 200, width: width }}
                />
              )
          )}
        </TouchableOpacity>
      </View>
    );
  }else{
    return (
    <View style={styles.video_gallery}>
        <TouchableOpacity
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignContent: 'center',
          }}
          onPress={ () => navigation.navigate(SceneName.ModalView, { post }) }
          >
          {itemsData &&
            itemsData.splice(0,3).map((video, index) => (
              <View
                style={{
                  width: index > 0 ? width / 2 - 10 : width - 14,
                  height: 200,
                  display: 'flex',
                  margin: 3,
                  backgroundColor: 'white',
                  borderRadius: 5,
                }}
                key={video.id || index}>
                <VideoStream
                  videoData={{
                    url: video,
                    height: 200,
                    width: index > 0 ? width / 2 - 10 : width - 14,
                  }}
                />
              </View>
            ))}
          </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#18191A',
  },
  contentDual: {
    backgroundColor: '#18191A',
    flexDirection: 'column'
  },
  contentOne: {
    display: 'flex',
    flex: 1,

  },
  video_gallery: {
    display: 'flex',
    backgroundColor: '#18191A',
  }
});



export default MediaPostFeed;
