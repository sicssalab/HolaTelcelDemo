import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface LikeButtonProps {
  liked: boolean;
  reactionsCount: number;
  onLikePress: () => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  liked,
  reactionsCount,
  onLikePress,
}) => {
  const [localLiked, setReactionsCount] = useState(liked);

  const handleLikePress = () => {
    onLikePress();
    setReactionsCount(!localLiked);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleLikePress}>
      <Icon
        name={localLiked ? 'thumb-up' : 'thumb-up-outline'}
        size={20}
        color={localLiked ? '#007aff' : '#999'}
        style={styles.icon}
      />
      {reactionsCount > 0 && <Text style={styles.count}>{reactionsCount}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15
  },
  icon: {
    marginRight: 4,
  },
  count: {
    color: '#fff',
    marginLeft: 4,
  },
});

export default LikeButton;
