import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FeedPost } from '~views/PostFeed';
import { Header, BackTouchArea } from './styles';
import BackArrow from '~images/BackArrow.svg';
import { ThemeContext } from 'styled-components/native';
import HeaderPostFeed from '~views/PostFeed/components/HeaderPostFeed';
import { Background } from '@react-navigation/elements';
import  VideoStream  from '~views/PostFeed/components/VideoStream'

const ModalView = (props) => {
  const navigation = useNavigation();
  const { colors } = useContext(ThemeContext);
  const{ height, width } = Dimensions.get('window');


  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background }}>
      <Header>
        <BackTouchArea onPress={() => navigation.goBack()}>
          <BackArrow height={15} width={15} fill={colors.text} />
        </BackTouchArea>
        {/* <Picture source={{ uri: params.user?.picture }} /> */}
        <Text style={{ fontWeight: 'bold', color: 'white'}}>{props.route.params.post.name || 'Undefined'}</Text>
      </Header>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center', backgroundColor: colors.secondaryBackground}}
        showsVerticalScrollIndicator={false}>
        <HeaderPostFeed post={props.route.params.post} style={{ backgroundColor: colors.secondaryBackground}}/>
        <View style={styles.userBtnWrapper}>
            <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
              <Text style={styles.userBtnTxt}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
              <Text style={styles.userBtnTxt}>Follow</Text>
            </TouchableOpacity>
        </View>
        {/* //TODO hay que recuperar el mock por categoria:urban:grupo y mandarlo ya que tiene estatico el de entretenimiento por ahora */}
        
        <View style={{ display: 'flex',flex: 1, width: 400, paddingVertical: 5 }}>
          {props.route.params.post.videos && ( props.route.params.post.videos.map( (videoplay , index) =>
              <VideoStream 
                videoData={videoplay}
                key={videoplay.id || index}
              />
            )  
          )}
        </View>     
      </ScrollView>
    </SafeAreaView>
    
  );
};

export default ModalView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 150/2,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#2e64e5',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});
