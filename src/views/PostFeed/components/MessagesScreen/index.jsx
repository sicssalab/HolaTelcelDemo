import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from './styles';

const MessagesScreen = ( { varComments } ) => {
    return (
      <Container>
        <FlatList 
          data={varComments}
          keyExtractor={item=>item.id}
          renderItem={({item}) => (
            <Card>
              <UserInfo>
                <UserImgWrapper>
                  <UserImg source={{uri : item.picture}} />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.userName}</UserName>
                    <PostTime>{item.createDate}</PostTime>
                  </UserInfoText>
                  <MessageText>{item.comment}</MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
      </Container>
    );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
