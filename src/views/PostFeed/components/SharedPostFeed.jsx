import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Modal,
  Linking,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { SceneName } from '~src/@types/SceneName';
import ImgPathImage from '~components/ImagePath/ImgPathImage';
import { LikeButton } from './LikeButton';

const { height, width } = Dimensions.get('window');
const SharedPostFeed = (props) => {
  const { post } = props;

  const navigation = useNavigation();
  return (
    <View style={styles.footer}>
      <LikeButton varLikes={post.likes} />
      <TouchableOpacity
        style={styles.actionSection}
        onPress={() =>
          navigation.navigate(SceneName.Chat, {
            user: {
              id: '1',
              picture: post.picture,
              name: post.name,
              lastMessage: post.createDate,
            },
          })
        }>
        <Image
          source={ImgPathImage.icChat}
          style={{ tintColor: 'gray', height: 30, width: 30 }}
        />
        <Text style={styles.number}>Comentarios {post.comments.length}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actionSection}
        onPress={async () => {
          Linking.openURL('tel:+529982423611');
        }}>
          <Image
          source={ImgPathImage.icCall}
          style={{ tintColor: 'gray', height: 30, width: 30 }}
        />
        <Text style={styles.number}>Concierge</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    borderStyle : 'solid',
    borderTopWidth : 1
  },
  actionSection: {
    flex: 1,
    margin: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  number: {
    margin: 5,
    fontSize: 12,
    color: 'gray'
  },
});

export default SharedPostFeed;
