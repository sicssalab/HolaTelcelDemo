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
import VideoStream from '~views/PostFeed/components/VideoStream';

import DescriptionPost from '../GlobalPost/components/DescriptionPost';
import FooterGlobalPost from '../GlobalPost/components/FooterGlobalPost';
import HeaderPost from '../GlobalPost/components/HeaderPost';

const ModalPost = (props) => {
  const { modalVisible, post, hasbuttonLink } = props;

  const onClose = () => {
    const { onClose } = props;
    onClose && onClose();
  };

  const onNavigateClick = () => {
    const { onNavigateClick } = props;
    onNavigateClick && onNavigateClick();
  };

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
          <HeaderPost
            item={post}
            hasSandWith={false}
            onNavigateClick={onNavigateClick}
          />
          <DescriptionPost post={post} />
          {post.hasActiveStreaming && (
            <View style={{left:15, width: "100%"}}>
              <Image
                source={require('~assets/images/envivo.gif')}
                style={{ width: 75, height: 40, resizeMode: 'contain' }}
              />
            </View>
          )}
          <ScrollView style={{ width: '100%' }}>
            {/* {media.map((item, index) => (
                <View key={index} style={styles.modalMediaContainer}>
                {item.type === 'image' ? (
                    <Image style={styles.modalImage} source={{ uri: item.uri }} />
                ) : (
                    <View>
                    <TouchableOpacity
                        style={styles.modalVideoTouchable}
                        onPress={() => handlePlayIconPress(index)}>
                        <Video
                        ref={videoRefs.current[index]}
                        source={{ uri: item.uri }}
                        style={styles.modalVideo}
                        resizeMode={ResizeMode.COVER}
                        onPlaybackStatusUpdate={(status) =>
                            handlePlaybackStatusUpdate(index, status)
                        }
                        />
                    </TouchableOpacity>
                    {playingVideo !== index && (
                        <TouchableOpacity
                        style={styles.playIconContainer}
                        onPress={() => handlePlayIconPress(index)}>
                        <MaterialIcons
                            name='play-circle-outline'
                            size={64}
                            color='white'
                        />
                        </TouchableOpacity>
                    )}
                    </View>
                )}
                </View>
            ))} */}
            {post.videos &&
              post.videos.map((videoplay, index) => (
                <View key={videoplay.id || index}>
                  <VideoStream
                    autoPlay={index == 0 ? true : false}
                    videoData={videoplay}
                    //key={videoplay.id || index}
                  />
                  <FooterGlobalPost item={post} />
                </View>
              ))}
          </ScrollView>
          {hasbuttonLink && (
            <TouchableOpacity
              style={styles.profileButton}
              onPress={onNavigateClick}>
              <Text style={styles.profileButtonText}>Ir al perfil</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};
ModalPost.defaultProps = {
  hasbuttonLink: true,
};
const styles = StyleSheet.create({
  modalMediaContainer: {},
  modalContainer: {
    backgroundColor: '#1e1e1e',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainerBody: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'cover',
    marginVertical: 10,
  },
  modalVideo: {
    width: '100%',
    height: 300,
    marginVertical: 10,
  },
  playIconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    color: '#fff',
    fill: '#fff',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  profileButton: {
    backgroundColor: '#f5df4d',
    width: '100%',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 0,
  },
  profileButtonText: {
    color: '#222',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ModalPost;
