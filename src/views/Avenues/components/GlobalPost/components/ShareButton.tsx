import React, { useState } from 'react';
import { View, Share, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ShareButtonProps {
  sharedCount: number;
  onSharedPress: () => void;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  item,
  sharedCount,
  onSharedPress,
}) => {
  const [shared, setSharedCount] = useState(false);

  const handleSharePress = () => {
    onSharedPress();
    setSharedCount(!shared);
    handleShareDevicePress(item);
  };

  const handleShareDevicePress = async (item) => {
    try {
      const result = await Share.share({
        message: item.message,
        url: item.picture,
        title: item.name,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType)
          console.log('Compartido con actividad seleccionada');
        else console.log('Compartido');
      } else if (result.action === Share.dismissedAction)
        console.log('Compartir cancelado');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleSharePress}>
      <Icon
        style={styles.icon}
        name='share'
        size={20}
        color={shared ? '#00c800' : '#999'}
      />
      {/* {sharedCount > 0 && <Text style={styles.count}>{sharedCount}</Text>} */}
      <Text style={styles.text}>Compartir</Text>
    </TouchableOpacity>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15
  },
  icon: {
    marginRight: 5,
  },
  text: {
    color: '#fff',
    marginRight: 5,
  },
  count: {
    color: '#fff',
  },
};

export default ShareButton;
