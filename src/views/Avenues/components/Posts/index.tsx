import React, { useState } from 'react';
import {
  View,
  Share,
  Text,
  Modal,
  ScrollView,
  FlatList,
  Dimensions,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useNavigation } from '@react-navigation/native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { SceneName } from '~src/@types/SceneName';

import MediaGrid from '../../components//MediaGrid';
import ImageGrid from '../../components/ImageGrid';
import CommentButton from './components/CommentButton';
import LikeButton from './components/LikeButton';
import ShareButton from './components/ShareButton';
import { Container } from './styles';

export const Posts = ({ item }) => {
  const navigation = useNavigation();

  const [status, setStatus] = React.useState<AVPlaybackStatus>({});

  /* Likes Component */
  const [reactionsCount, setReactionsCount] = useState(item.likes || 0);
  const [liked, setLiked] = useState(false);
  /* Modal para Comentarios */
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [commentsCount, setCommentsCount] = useState(item.commentsTotal || 0);
  const [comments, setComments] = useState(item.comments || []);
  /* Shared Component */
  const [sharedCount, setSharedCount] = useState(item.shares || 0);
  const [shared, setShared] = useState(false);

  const handleLikePress = () => {
    if (liked) {
      setReactionsCount(reactionsCount - 1);
      setLiked(false);
    } else {
      setReactionsCount(reactionsCount + 1);
      setLiked(true);
    }
  };

  const handleCommentPress = () => {
    setIsCommentModalVisible(true);
  };

  const handleSharePress = () => {
    if (shared) {
      setSharedCount(sharedCount - 1);
      setShared(false);
    } else {
      setSharedCount(sharedCount + 1);
      setShared(true);
    }
  };

  const handleCommentPost = () => {
    if (commentInput.trim() !== '') {
      const newComment = {
        avatar: 'https://picsum.photos/seed/{seed}/300/200',
        name: 'Jorge Saurina',
        text: commentInput.trim(),
        time: 'En estos momentos',
      };

      setComments((prevComments) => [...prevComments, newComment]);
      setCommentInput(newComment);
      setCommentsCount(commentsCount + 1);
    }
  };

  const handleImagePress = () => {};

  const handleVideoPress = () => {};

  const handleProfileButtonPress = () => {
    navigation.navigate('Profile'); // Asegúrate de que "Profile" sea el nombre correcto de la ruta de navegación
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.avatar} source={{ uri: item.picture }} />
        <View style={styles.headerContent}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.createDate}</Text>
        </View>
        <TouchableOpacity style={styles.icon}>
          <Icon name='dots-vertical' size={20} color='#999' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Icon name='close' size={20} color='#999' />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        {item.message && <Text style={styles.content}>{item.message}</Text>}
        {item.videos ? (
          <ImageGrid
            images={item.videos}
            onVideoPress={handleVideoPress}
            onProfileButtonPress={handleProfileButtonPress}
          />
        ) : (
          <ImageGrid
            images={item.images}
            onImagePress={handleImagePress}
            onProfileButtonPress={handleProfileButtonPress}
          />
        )}
      </View>
      <View style={styles.footer}>
        <View style={styles.reactionsContainer}>
          <LikeButton
            liked={liked}
            reactionsCount={reactionsCount}
            onLikePress={handleLikePress}
          />
          {/* <CommentButton
            isVisivble={isCommentModalVisible}
            commentsCount={commentsCount}
            onCommentPress={handleCommentPress}
          /> */}
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleCommentPress}>
            <Icon
              style={styles.reactionIcon}
              name='comment-multiple-outline'
              size={20}
              color='#999'
            />
            {commentsCount > 0 && (
              <Text style={styles.reactionCount}>{commentsCount}</Text>
            )}
            <Text style={styles.reactionText}>Comentarios</Text>
          </TouchableOpacity>
          <ShareButton
            item={item}
            shared={shared}
            sharedCount={sharedCount}
            onSharedPress={handleSharePress}
          />
        </View>
      </View>
      {isCommentModalVisible && (
        <Modal
          visible={isCommentModalVisible}
          animationType='slide'
          onRequestClose={() => setIsCommentModalVisible(false)}>
          <View style={styles.modal.container}>
            <View style={styles.modal.header}>
              <TouchableOpacity
                style={styles.modal.closeButton}
                onPress={() => setIsCommentModalVisible(false)}>
                <Icon name='close' size={24} color='#999' />
              </TouchableOpacity>
              <Text style={styles.headerText}>{commentsCount} Comentarios</Text>
            </View>
            <ScrollView style={styles.modal.list}>
              {comments.map((comment, index) => (
                <View style={styles.modal.item} key={index}>
                  <Image
                    style={styles.modal.avatar}
                    source={{ uri: comment.picture }}
                  />
                  <View style={styles.content}>
                    <Text style={styles.modal.name}>{comment.name}</Text>
                    <Text style={styles.modal.text}>{comment.message}</Text>
                    <Text style={styles.modal.time}>{comment.time}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
            <View style={styles.modal.inputContainer}>
              <TextInput
                style={styles.modal.input}
                placeholder='Escribe un comentario...'
                value={commentInput}
                onChangeText={setCommentInput}
              />
              <TouchableOpacity
                style={styles.modal.postButton}
                onPress={handleCommentPost}>
                <Text style={styles.modal.postButtonText}>Comentar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingHorizontal: 10,
  },
  headerContent: {
    flex: 1,
    paddingVertical: 5,
    marginLeft: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#fff',
  },
  time: {
    color: '#999',
    fontSize: 14,
    color: '#aaa',
  },
  icon: {
    marginLeft: 10,
    color: '#fff',
  },
  body: {
    paddingVertical: 0,
  },
  content: {
    fontSize: 16,
    color: '#fff',
    paddingHorizontal: 15,
    paddingTop: 5,
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
  footer: {
    display: 'flex',
    borderTopWidth: 1,
    borderTopColor: '#3E4042',
    padding: 15,
  },
  reactionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reactionIcon: {
    marginRight: 5,
  },
  reactionText: {
    color: '#fff',
    marginLeft: 5,
  },
  reactionCount: {
    color: '#fff',
    marginLeft: 5,
  },
  commentsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  commentProfilePicture: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  commentName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 5,
  },
  commentText: {
    fontSize: 14,
    lineHeight: 18,
    flex: 1,
  },
  sharedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  sharedIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  sharedText: {
    fontSize: 14,
    color: '#777',
  },
  liked: {
    color: '#007aff',
  },

  modal: {
    container: {
      flex: 1,
      backgroundColor: '#1e1e1e',
      padding: 10,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    closeButton: {
      padding: 10,
    },
    headerText: {
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 10,
      color: '#fff',
    },
    body: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 15,
      width: '100%',
      maxHeight: '80%',
    },
    newCommentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
    },
    list: {
      flex: 1,
      marginBottom: 10,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginVertical: 5,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },
    content: {
      flex: 1,
    },
    name: {
      fontWeight: 'bold',
      color: '#fff',
    },
    text: {
      marginTop: 5,
      marginBottom: 10,
      color: '#fff',
    },
    time: {
      color: '#999',
      color: '#aaa',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    input: {
      flex: 1,
      height: 40,
      paddingHorizontal: 10,
      backgroundColor: '#f2f2f2',
      borderRadius: 20,
      marginRight: 10,
      paddingHorizontal: 20,
      color: '#222',
    },
    postButton: {
      backgroundColor: '#f5df4d',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
    },
    postButtonText: {
      color: '#222',
      fontWeight: '400',
    },
  },
});
