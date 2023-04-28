import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { VideoThumbnail } from 'react-native-video-thumbnail';

const VideoThumb = ({ uri }) => {
  const [thumbnailUri, setThumbnailUri] = useState(null);

  useEffect(() => {
    const generateThumbnail = async () => {
      try {
        const thumbnail = await VideoThumbnail.getThumbnail(uri, {
          time: 2000, // milisegundos en el video donde se capturará el thumbnail, por ejemplo: 1000 ms = 1 segundo
        });
        setThumbnailUri(thumbnail.path);
      } catch (error) {
        console.log('Error al generar el thumbnail:', error);
      }
    };

    generateThumbnail();
  }, [uri]);

  return (
    <View>
      {thumbnailUri && (
        <Image
          source={{ uri: thumbnailUri }}
          style={{ width: 100, height: 100 }}
        />
      )}
    </View>
  );
};

export default VideoThumb;
