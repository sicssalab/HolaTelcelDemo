import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Video, AVPlaybackStatus } from 'expo-av';
// import VideoThumb from './components/VideoThumb';
import * as VideoThumbnails from 'expo-video-thumbnails';

const MediaGrid = ({ array, onMediaPress, onProfileButtonPress }) => {
  const [loading, setLoading] = useState(true);
  const [media, setMedia] = useState([]);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [status, setStatus] = React.useState<AVPlaybackStatus>({});

  useEffect(() => {
    thumbnailsResources(array);
  }, [array]);

  async function thumbnailsResources(array) {
    for (const url of array) {
      const extension = url.split('.').pop();
      let type = 'image';
      let thumbnailUri = url;

      if (extension === 'mp4') {
        type = 'video';
        thumbnailUri = await generateThumbnail(url);
      }

      const resource = {
        type: type,
        uri: url,
        thumbnailUri: thumbnailUri,
      };

      setMedia((prevMedia) => [...prevMedia, resource]);
    }

    setLoading(false);
  }

  async function generateThumbnail(videoUri) {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri, {
        time: 1000,
      });
      return uri;
    } catch (e) {
      return null;
    }
  }

  const toggleModal = () => {
    console.log(media[0].uri);
    // setModalVisible(!modalVisible);
  };

  const resources = media.slice(0, 3);
  const videoRefs = useRef(media.map(() => React.createRef<Video>()));

  const handlePlaybackStatusUpdate = (index: number, status: any) => {
    if (status.didJustFinish || !status.isPlaying) setPlayingVideo(null);
    else setPlayingVideo(index);
  };

  const handlePlayIconPress = async (index: number) => {
    try {
      const videoRef = videoRefs.current[index]?.current;

      if (videoRef) {
        const status = await videoRef.getStatusAsync();
        if (status.isPlaying) {
          await videoRef.pauseAsync();
        } else {
          await videoRef.playAsync();
        }
      } else {
        console.warn('Video ref no está definido para el índice:', index);
      }
    } catch (error) {
      console.error('Error al manejar la reproducción del video:', error);
    }
  };

  return (
    <View>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator
            size='large'
            color='#0000ff'
            style={styles.loader}
          />
        </View>
      ) : (
        <View style={styles.mediaContainer}>
          {resources.map((resource, index) => {
            if (index === 0) {
              return resource.type === 'image' ? (
                <TouchableOpacity
                  key={index}
                  style={styles.bigResourceContainer}
                  onPress={toggleModal}>
                  <Image
                    style={styles.bigResource}
                    source={{ uri: resource.uri }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  key={index}
                  style={styles.bigResourceContainer}
                  onPress={() => handlePlayIconPress(index)}>
                  <View style={styles.bigResource}>
                    <Video
                      ref={videoRefs.current[index]}
                      source={{ uri: resource.uri }}
                      style={{ flex: 1 }}
                      resizeMode='cover'
                      onPlaybackStatusUpdate={(status) =>
                        handlePlaybackStatusUpdate(index, status)
                      }
                    />
                    {playingVideo !== index && (
                      <View style={styles.playIconContainer}>
                        <TouchableOpacity
                          onPress={() => handlePlayIconPress(index)}>
                          <MaterialIcons
                            name='play-circle-outline'
                            size={64}
                            color='white'
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.smallResourceContainer,
                    index === 1 && styles.marginRight,
                  ]}
                  onPress={toggleModal}>
                  <Image
                    style={[
                      styles.smallResource,
                      index === 1 ? { flex: 1 } : null,
                    ]}
                    source={{ uri: resource.thumbnailUri }}
                  />
                  {resources.length === 3 && index === 2 && (
                    <View style={styles.overlay}>
                      <Text style={styles.overlayText}>
                        +{media.length - 3}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            }
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mediaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  bigResourceContainer: {
    width: '100%',
    minHeight: 350,
    height: 350,
    marginVertical: 3,
  },
  bigResource: {
    flex: 1,
  },
  playIconBigContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallResourceContainer: {
    aspectRatio: 1,
    width: '49%',
  },
  marginRight: {
    marginHorizontal: 0,
  },
  smallResource: {
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
  video: {
    alignSelf: 'center',
    width: '100%',
    height: 250,
    marginVertical: 0,
  },
  videoPlayer: {
    alignSelf: 'center',
    width: '100%',
    height: 250,
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
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  loader: {
    marginTop: 10,
  },
});

export default MediaGrid;
