import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import ImgPathImage from '~components/ImagePath/ImgPathImage';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { mockRequest } from '~views/Entertainment/__mocks__';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { ReactionsBar } from './component/ReactionsBar';
import PlayerFeed from './component/PlayerFeed';

const{ height, width } = Dimensions.get('window');

export const StoryFeed = (props) => {
  const {item: itemPreview} = props;
  const navigation = useNavigation();
  const [currIndex, setIndex] = useState(0);

  const renderItem = ({item, index }) => {
    return(
      <View style={{ flex: 1, width: width }}>
        <PlayerFeed videoParams={ { url : item.srcStory, isPlay : currIndex === index } } />
        <LinearGradient 
          colors={['rgba(0,0,0,0.1)',' rgba(0,0,0,0.6)']}
          style={ styles.bottomView }>
          <ReactionsBar item={ item }/>
        </LinearGradient>
      </View>
    )
  }

  const onChangeIndex = ({ index }) => {
    setIndex(index)
  }

  useEffect(() => {
    returnIndex();
  }, [itemPreview])

  const returnIndex = () => {
    const response = mockRequest.data.findIndex((item,index) => item.id === itemPreview.id);
    setIndex(response ? response : 0)
  }

  return (
    <View style={{ flex: 1 ,backgroundColor: 'black'}}>
      <StatusBar barStyle='light-content'></StatusBar>
      <SwiperFlatList 
        data={mockRequest.data}
        renderItem={renderItem}
        index={currIndex}
        keyExtractor={(item, index) => index.toString()}
        onChangeIndex={ onChangeIndex }
      />

      <View style={{ position: 'absolute' , top: 18, left: 16 }}>
        <Text style={styles.textStyle}>{`Reels`}</Text>
      </View>

      <TouchableOpacity style={{ position: 'absolute' , top: 18, right: 16 }} onPress={() => navigation.goBack()}>
        <Image
          style={{ tintColor: 'white', width: 30, height:30 }}
          source={ ImgPathImage.icClose }
        />
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  flexHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  bottomView: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingVertical: 20,
    paddingHorizontal: 16
  },
  profileImgStyle: {
    height: 30,
    width: 30,
    borderRadius: 30/2
  }
})
