import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface CommentButtonProps {
  isVisible: boolean;
  commentsCount: number;
  onCommentPress: () => void;
}

const CommentButton: React.FC<CommentButtonProps> = ({
  commentsCount,
  onCommentPress,
}) => {
  const [isModalVisible, setIsCommentModalVisible] = useState(false);

  const handleCommentPress = () => {
    onCommentPress();
    setIsCommentModalVisible(true);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onCommentPress={handleCommentPress}>
      <Icon
        style={styles.icon}
        name='comment-multiple-outline'
        size={20}
        color='#999'
      />
      {commentsCount > 0 && <Text style={styles.count}>{commentsCount}</Text>}
      <Text style={styles.text}>Comentarios</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 5,
  },
  text: {
    color: '#fff',
    marginLeft: 5,
  },
  count: {
    color: '#fff',
    marginLeft: 5,
  },
});

export default CommentButton;
