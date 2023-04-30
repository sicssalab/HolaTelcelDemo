import React, { useState, useEffect, useContext } from 'react';
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

import { Background } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from 'styled-components/native';
import ListGlobalPost from '~components/ui/ListGlobalPost/ListGlobalPost';
import BackArrow from '~images/BackArrow.svg';
import { typeMockConstants } from '~src/constants/typeMockConstants';
import { mockAvenidasPerfiles } from '~src/mocks/mockAvenidasPerfiles';
import { mockPerfiles } from '~src/mocks/mockPerfiles';
import { mockServiciosExperiencia } from '~src/mocks/mockServiciosExperiencia';
import { mockServiciosExperienciaPerfiles } from '~src/mocks/mockServiciosExperienciaPerfiles';
import GlobalPost from '~views/Avenues/components/GlobalPost/GlobalPost';
import HeaderGroupSectionScreen from '~views/GroupSectionScreen/components/HeaderGroupSectionScreen';
import { FeedPost } from '~views/PostFeed';
import { mockEntertainment } from '~views/PostFeed/__mocks__';

//import { mockPersonal } from '~views/ProfileScreen/__mockpersonal__';
//import { mockRequest } from '~views/ProfileScreen/__mocks__';
import { Header, BackTouchArea } from './styles';
import { mockPueblosMagicosPerfiles } from '~src/mocks/mockPueblosMagicosPerfiles';

const ProfileScreen = (props) => {
  const navigation = useNavigation();
  const { colors } = useContext(ThemeContext);
  const { height, width } = Dimensions.get('window');
  const [itemView, setItemView] = useState({});

  useEffect(() => {
    // if (props.route.params.profilePage.type === typeMockConstants.GROUP_PROFILE)
    //   setItemView(
    //     mockPerfiles.data.find(
    //       (perfil) => perfil.id == props.route.params.profilePage.id,
    //     ),
    //   );
    // else if (
    //   props.route.params.profilePage.type === typeMockConstants.AVENUES_PROFILE
    // )
    //   setItemView(
    //     mockAvenidasPerfiles.data.find(
    //       (perfil) => perfil.id == props.route.params.profilePage.id,
    //     ),
    //   );
    // else if (
    //   props.route.params.profilePage.type === typeMockConstants.SERVICES_PROFILE
    // )
    // setItemView(
    //   mockServiciosExperienciaPerfiles.data.find(
    //     (perfil) => perfil.id == props.route.params.profilePage.id,
    //   ),
    // );
    switch(props.route.params.profilePage.type) {
      case typeMockConstants.GROUP_PROFILE:
        setItemView(
          mockPerfiles.data.find(
            (perfil) => perfil.id == props.route.params.profilePage.id,
          ),
        );
        break;
      case typeMockConstants.AVENUES_PROFILE:
        setItemView(
          mockAvenidasPerfiles.data.find(
            (perfil) => perfil.id == props.route.params.profilePage.id,
          ),
        );
        break;
      case typeMockConstants.SERVICES_PROFILE:
        setItemView(
          mockServiciosExperienciaPerfiles.data.find(
            (perfil) => perfil.id == props.route.params.profilePage.id,
          ),
        );
        break;
      case typeMockConstants.GROUP_PROFILE:
        setItemView(
          mockPerfiles.data.find(
            (perfil) => perfil.id == props.route.params.profilePage.id,
          ),
        );
        break;
      case typeMockConstants.MAGIC_TOWNS_PROFILE:
        setItemView(
          mockPueblosMagicosPerfiles.data.find(
            (perfil) => perfil.id == props.route.params.profilePage.id,
          ),
        );
        break;
      default:
    }

  }, [props.route.params.profilePage]);
  console.log(itemView);
  return (
    <View style={{ flex: 1, backgroundColor: colors.secondaryBackground }}>
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderGroupSectionScreen
          item={
            itemView
              ? itemView
              : {
                  name: 'regresar',
                }
          }
        />
        {!itemView && (
          <View>
            <Text style={styles.userInfoSubTitle}>
              Ups! no se encontro el perfil seleccionado
            </Text>
          </View>
        )}
        {itemView && (
          <ScrollView
            style={styles.container}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.secondaryBackground,
            }}
            showsVerticalScrollIndicator={false}>
            {itemView.picture && itemView.picture != '' && (
              <Image
                style={styles.userImg}
                source={{ uri: itemView.picture }}
              />
            )}
            <Text style={styles.userName}>{itemView.name}</Text>
            <Text style={styles.aboutUser}>{itemView?.description}</Text>
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
                {/* <Text style={styles.userInfoTitle}>
                  {itemView.information.members}
                </Text> */}
                <Text style={styles.userInfoSubTitle}>Miembros</Text>
              </View>
              <View style={styles.userInfoItem}>
                <Text style={styles.userInfoTitle}>100</Text>
                <Text style={styles.userInfoSubTitle}>Seguidos</Text>
              </View>
            </View>
            {/* //TODO hay que recuperar el mock por categoria:urban:grupo y mandarlo ya que tiene estatico el de entretenimiento por ahora */}
            <ListGlobalPost items={itemView.content} hasbuttonLink={false} />
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 150 / 2,
    paddingTop: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: 'white',
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
    marginHorizontal: 5,
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
