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
import { mockRequest } from '~views/ProfileScreen/__mocks__';
import { mockPersonal } from '~views/ProfileScreen/__mockpersonal__';
import { Header, BackTouchArea } from './styles';
import BackArrow from '~images/BackArrow.svg';
import { ThemeContext } from 'styled-components/native';
import { Background } from '@react-navigation/elements';


const ProfileScreen = (props) => {
  const navigation = useNavigation();
  const { colors } = useContext(ThemeContext);
  const{ height, width } = Dimensions.get('window');

  const getPerfil = mockRequest.data.find(perfil => perfil.id == props.route.params.post.id);

  if(getPerfil){ 
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
        <Header>
          <BackTouchArea onPress={() => navigation.goBack()}>
            <BackArrow height={15} width={15} fill={colors.text} />
          </BackTouchArea>
          {/* <Picture source={{ uri: params.user?.picture }} /> */}
          <Text style={{ fontWeight: 'bold', color: 'white'}}>{getPerfil.name || 'Undefined'}</Text>
        </Header>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{justifyContent: 'center', alignItems: 'center', backgroundColor: colors.secondaryBackground}}
          showsVerticalScrollIndicator={false}>
          <Image
            style={styles.userImg}
            source={{uri: getPerfil.picture }}
          />
          <Text style={styles.userName}>{ getPerfil.name }</Text>
          {/* <Text>{route.params ? route.params.userId : user.uid}</Text> */}
          <Text style={styles.aboutUser}>
          {  getPerfil?.description }
          </Text>
          <View style={styles.userBtnWrapper}>
                <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                  <Text style={styles.userBtnTxt}>Message</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                  <Text style={styles.userBtnTxt}>Follow</Text>
                </TouchableOpacity>
          </View>
          {/* posts.length */}
          <View style={styles.userInfoWrapper}>
            <View style={styles.userInfoItem}>
              <Text style={styles.userInfoTitle}>{3}</Text>
              <Text style={styles.userInfoSubTitle}>Publicaciones</Text>
            </View>
            <View style={styles.userInfoItem}>
              <Text style={styles.userInfoTitle}>{getPerfil.information.members}</Text>
              <Text style={styles.userInfoSubTitle}>Miembros</Text>
            </View>
            <View style={styles.userInfoItem}>
              <Text style={styles.userInfoTitle}>100</Text>
              <Text style={styles.userInfoSubTitle}>Seguidos</Text>
            </View>
          </View>
          {/* //TODO hay que recuperar el mock por categoria:urban:grupo y mandarlo ya que tiene estatico el de entretenimiento por ahora */}

          <FeedPost postContent={getPerfil.content}/>
        </ScrollView>
      </SafeAreaView>
      
    );
  }else {
    const personalPerfil = mockPersonal.data.find(perfil => perfil.id == props.route.params.post.id)
    if(personalPerfil){
      return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
          <Header>
            <BackTouchArea onPress={() => navigation.goBack()}>
              <BackArrow height={15} width={15} fill={colors.text} />
            </BackTouchArea>
            {/* <Picture source={{ uri: params.user?.picture }} /> */}
            <Text style={{ fontWeight: 'bold', color: 'white'}}>{personalPerfil.name || 'Undefined'}</Text>
          </Header>
          <ScrollView
            style={styles.container}
            contentContainerStyle={{justifyContent: 'center', alignItems: 'center', backgroundColor: colors.secondaryBackground}}
            showsVerticalScrollIndicator={false}>
            <Image
              style={styles.userImg}
              source={{uri: personalPerfil.picture }}
            />
            <Text style={styles.userName}>{ personalPerfil.name }</Text>
            {/* <Text>{route.params ? route.params.userId : user.uid}</Text> */}
            <Text style={styles.aboutUser}>
            {  personalPerfil?.description }
            </Text>
            <View style={styles.userBtnWrapper}>
                  <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                    <Text style={styles.userBtnTxt}>Message</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                    <Text style={styles.userBtnTxt}>Follow</Text>
                  </TouchableOpacity>
            </View>
            {/* posts.length */}
            <View style={styles.userInfoWrapper}>
              <View style={styles.userInfoItem}>
                <Text style={styles.userInfoTitle}>{3}</Text>
                <Text style={styles.userInfoSubTitle}>Publicaciones</Text>
              </View>
              <View style={styles.userInfoItem}>
                <Text style={styles.userInfoTitle}>{personalPerfil.members}</Text>
                <Text style={styles.userInfoSubTitle}>Miembros</Text>
              </View>
              <View style={styles.userInfoItem}>
                <Text style={styles.userInfoTitle}>100</Text>
                <Text style={styles.userInfoSubTitle}>Seguidos</Text>
              </View>
            </View>
            {/* //TODO hay que recuperar el mock por categoria:urban:grupo y mandarlo ya que tiene estatico el de entretenimiento por ahora */}
  
            <FeedPost postContent={personalPerfil.content}/>
          </ScrollView>
        </SafeAreaView>
        
      );
    }
  }
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 150/2,
    paddingTop: 10
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: 'white'
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
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5
  },
  userBtnTxt: {
    color: '#FFF',
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
    color: '#666',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});
