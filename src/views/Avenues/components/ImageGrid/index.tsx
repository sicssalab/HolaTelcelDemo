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
import { Video, AVPlaybackStatus } from 'expo-av';

type Props = {
  images: string[];
  onImagePress: () => void;
  onProfileButtonPress: () => void;
};

const ImageGrid = ({ images, onImagePress, onProfileButtonPress }) => {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  let gallery = images.slice();

  if (images.length > 3) {
    gallery = images.slice(0, 3);
  }

  const media = images.map((url) => {
    const extension = url.split('.').pop();
    let type = 'image';

    if (extension === 'mp4') type = 'video';

    return {
      type: type,
      uri: url,
    };
  });

  const videoRefs = useRef(media.map(() => React.createRef<Video>()));

  const handlePlaybackStatusUpdate = (index: number, status: any) => {
    if (status.didJustFinish || !status.isPlaying) setPlayingVideo(null);
    else setPlayingVideo(index);
  };

  const handlePlayIconPress = async (index: number) => {
    if (videoRefs.current[index].current) {
      const status = await videoRefs.current[index].current.getStatusAsync();
      if (status.isPlaying) videoRefs.current[index].current.pauseAsync();
      else videoRefs.current[index].current.playAsync();
    }
  };

  return (
    <View style={styles.imageContainer}>
      {gallery.map((image, index) => {
        if (index === 0) {
          return (
            <TouchableOpacity
              key={index}
              style={styles.bigImageContainer}
              onPress={toggleModal}>
              <Image style={styles.bigImage} source={{ uri: image }} />
            </TouchableOpacity>
          );
        } else {
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.smallImageContainer,
                index === 1 && styles.marginRight,
              ]}
              onPress={toggleModal}>
              <Image
                style={[styles.smallImage, index === 1 ? { flex: 1 } : null]}
                source={{ uri: image }}
              />
              {gallery.length === 3 && index === 2 && (
                <View style={styles.overlay}>
                  <Text style={styles.overlayText}>+{images.length - 3}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        }
      })}
      <Modal
        animationType='slide'
        transparent={false}
        visible={modalVisible}
        onRequestClose={toggleModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Ionicons name='close' size={40} color='white' />
          </TouchableOpacity>
          <ScrollView style={{ width: '100%' }}>
            {media.map((item, index) => (
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
                        resizeMode='cover'
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
            ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={onProfileButtonPress}>
            <Text style={styles.profileButtonText}>Ir al perfil</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  bigImageContainer: {
    aspectRatio: 1,
    width: '100%',
    marginTop: 10,
  },
  bigImage: {
    /* width: '100%',
    height: 350, */
    flex: 1,
    resizeMode: 'cover',
  },
  smallImageContainer: {
    aspectRatio: 1,
    width: '50%',
  },
  marginRight: {
    /* marginRight: '2%', */
    marginHorizontal: 0,
  },
  smallImage: {
    /* width: '100%',
    height: 180, */
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  modalContainer: {
    backgroundColor: '#1e1e1e',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalImageContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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

export default ImageGrid;
