// MediaList.tsx
import React from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { Video } from 'expo-av';

//import { MediaItem } from './types';

// Asegúrate de importar el tipo MediaItem desde tu archivo de tipos

const viewabilityConfig = {
  viewAreaCoveragePercentThreshold: 50,
};

interface MediaListProps {
  media: any[];
  videoRefs: React.RefObject<Video>[];
  playingVideo: number | null;
  handlePlayIconPress: (index: number) => void;
  handlePlaybackStatusUpdate: (index: number, status: any) => void;
}

const MediaList: React.FC<MediaListProps> = ({
  media,
  videoRefs,
  playingVideo,
  handlePlayIconPress,
  handlePlaybackStatusUpdate,
}) => {
  const handleViewableItemsChanged = ({ viewableItems, changed }: any) => {
    changed.forEach((change: any) => {
      if (!change.isViewable && change.index === playingVideo) {
        if (videoRefs[change.index]?.current) {
          videoRefs[change.index].current.pauseAsync();
        }
      }
    });
  };

  return (
    <FlatList
      data={media}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item, index }) => (
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
      )}
      onViewableItemsChanged={handleViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
    />
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
    marginVertical: 0,
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

export default MediaList;
