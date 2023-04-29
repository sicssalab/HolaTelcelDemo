import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useNavigation } from '@react-navigation/native';
//import { Video, AVPlaybackStatus } from 'expo-av';
import { SceneName } from '~src/@types/SceneName';

import ModalComments from '../ModalComments';
import LikeButton from './LikeButton';
import ShareButton from './ShareButton';
import ImgPathImage from '~components/ImagePath/ImgPathImage';

const FooterGlobalPost = (props) => {
  const { item } = props;
  const [liked, setLiked] = useState(false);
  const [shared, setShared] = useState(false);
  const [sharedCount, setSharedCount] = useState(item.shares || 0);
  const [reactionsCount, setReactionsCount] = useState(item.likes || 0);
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [commentsCount, setCommentsCount] = useState(item.commentsTotal || 0);
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
  const onCloseComments = () => {
    setIsCommentModalVisible(!isCommentModalVisible);
  };

  return (
    <View>
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
          {/* <ShareButton
            item={item}
            shared={shared}
            sharedCount={sharedCount}
            onSharedPress={handleSharePress}
          /> */}
          <TouchableOpacity
            style={styles.actionSection}
            onPress={async () => {
              Linking.openURL('tel:+529982423611');
            }}>
            <Image
              source={ImgPathImage.icCall}
              style={{ tintColor: 'gray', height: 20, width: 20 }}
            />
            <Text style={styles.reactionText}>Concierge</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ModalComments
        item={item}
        isCommentModalVisible={isCommentModalVisible}
        onClose={onCloseComments}
      />
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
  actionSection: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
  },
  reactionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
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
      //color: '#999',
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
      //paddingHorizontal: 10,
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
export default FooterGlobalPost;
