import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView,
  TextInput,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
//import { ifIphoneX } from "react-native-iphone-x-helper";
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useHeaderHeight } from '@react-navigation/elements'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { SceneName } from '~src/@types/SceneName';
import theme from '~src/theme';

const ModalComments = (props) => {
  const { isCommentModalVisible, item } = props;
  const [comments, setComments] = useState(item.comments || []);
  const [commentsCount, setCommentsCount] = useState(
    item.comments?.length || 0,
  );
  const [commentInput, setCommentInput] = useState(''); //TODO parece que despues se convierte en object
  const onClose = () => {
    const { onClose } = props;
    onClose && onClose();
  };
  const handleCommentPost = () => {
    if (commentInput.trim() !== '') {
      const newComment = {
        picture: 'https://picsum.photos/seed/{seed}/300/200',
        userName: 'Carlos Slim',
        comment: commentInput.trim(),
        createDate: 'En estos momentos',
      };

      setComments((prevComments) => [...prevComments, newComment]);
      setCommentInput("");
      setCommentsCount(commentsCount + 1);
    }
  };
  const headerHeight = Constants.statusBarHeight + Constants.navBarHeight;
  const height = useHeaderHeight();
  const insets = useSafeAreaInsets();
  return (
    <Modal
      visible={isCommentModalVisible}
      animationType='slide'
      onRequestClose={onClose}>
      <View style={styles.modal.container}>
        <View style={styles.modalContainerBody}>
          <TouchableOpacity style={styles.modal.closeButton} onPress={onClose}>
            <Ionicons name='close' size={40} color='white' />
          </TouchableOpacity>
          <View style={styles.modal.header}>
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
                  <Text style={styles.modal.name}>{comment.userName}</Text>
                  <Text style={styles.modal.text}>{comment.comment}</Text>
                  <Text style={styles.modal.time}>{comment.createDate}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
          <KeyboardAvoidingView
            //style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            //keyboardVerticalOffset={headerHeight}
            keyboardVerticalOffset={Constants.statusBarHeight + 10}
            //keyboardVerticalOffset={height + 47}
          >
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
          </KeyboardAvoidingView>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalContainerBody: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  content: {
    fontSize: 16,
    color: '#fff',
    paddingHorizontal: 15,
    paddingTop: 5,
    flex: 1,
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    fontWeight: 'bold',
    marginLeft: 10,
    ...theme.p,
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
      position: 'absolute',
      color: '#fff',
      fill: '#fff',
      top: -5,
      right: 10,
      zIndex: 1,
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
      width: "100%"
    },
    item: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginVertical: 5,
      flex: 1
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
      flex: 1,
    },
    time: {
      //color: '#999',
      color: '#aaa',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      width: "100%"
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
      borderRadius: 20
    },
    postButtonText: {
      color: '#222',
      fontWeight: '400',
    },
  },
});
export default ModalComments;
