import { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SceneName } from '~src/@types/SceneName';

import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from 'styled-components/native';

import ImgPathImage from '~components/ImagePath/ImgPathImage';

const HeaderPostFeed = (props) => {
  const { post } = props;
  const navigation = useNavigation();
  const themeContext = useContext(ThemeContext);

  return (
    <View style={{ flexDirection:'column', backgroundColor: themeContext.secondaryBackground }}>
        <View style={styles.header}>
          <View style={styles.profile}>
            <TouchableOpacity onPress={ () => navigation.navigate(SceneName.ProfileScreen, { post }) }>  
                <Image 
                    style={styles.profile_img}
                    source={{ uri: post.picture }}
                />
            </TouchableOpacity>            
            <View style={styles.profile_details}>
              <TouchableOpacity onPress={ () => navigation.navigate(SceneName.ProfileScreen, { post }) } >
                <Text style={styles.author}>{post.name}</Text>
              </TouchableOpacity>
              <Text style={styles.date}>
                {post.hasPremium ? 'Premium' : 'Publico'}
              </Text>
          </View>
          </View>
          <TouchableOpacity>
            <Image
              style={{
                marginHorizontal: 8,
                tintColor: 'gray',
                width: 30,
                height: 30,
              }}
              source={ImgPathImage.icMore}
            />
          </TouchableOpacity>
        </View>
        {post.description && (
            <View style={styles.description} >
              <View style={{ width: '80%' }}>
                <Text numberOfLines={2} style={{ color : 'white', display: 'flex'}}>{post.description}</Text>
              </View>
              <Text style={styles.pmcdEndLine}>Ver más</Text>
          </View>
        )}
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 3,
    alignItems: 'center',
  },
  profile: {
    display: 'flex',
    flexDirection: 'row',
    padding: 9,
    border: 1
  },
  profile_img: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
  },
  profile_details: {
    padding: 5,
    display: 'flex',
    justifyContent: 'space-evenly',
    color: 'white'
  },
  author: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white'
  },
  date: {
    fontSize: 12,
    color: 'white'
  },
  description: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    paddingBottom: 15
  },
  pmcdEndLine: {
    display: 'flex',
    color: 'white'

  },
});

export default HeaderPostFeed;
