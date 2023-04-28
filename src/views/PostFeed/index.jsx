import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { mockEntertainment } from './__mocks__';
import HeaderPostFeed from './components/HeaderPostFeed';
import MediaPostFeed from './components/MediaPostFeed';
import MessagesScreen from './components/MessagesScreen';
import SharedPostFeed from './components/SharedPostFeed';

const { height, width } = Dimensions.get('window');

export const Post = ({ postContent }) => {
  const post = postContent;
  const navigation = useNavigation();

  return (
    <View style={styles.post}>
      <HeaderPostFeed post={post} />
      <MediaPostFeed itemContent={post} />
      <SharedPostFeed post={post} />
      {/* <MessagesScreen varComments={post.comments} /> */}
    </View>
  );
};

export const FeedPost = ( {postContent} ) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {postContent &&
        postContent.map((item, index) => (
          <Post key={item.id || index} postContent={item} />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 7,
  },
  post: {
    marginVertical: 5,
    backgroundColor: '#242526',
  },
});
