import React, { useState } from 'react'
import { StyleSheet, View, Image, TouchableOpacity, Text, Dimensions } from 'react-native';
import ImgPathImage from '~components/ImagePath/ImgPathImage';

const{ height, width } = Dimensions.get('window');

export const ReactionsBar = ({item}) => {  
    
  const [like, setLike] = useState(5522), [isLike, setIsLike] = useState(false)
  const onLike = () => {
      setLike( like + ( isLike ? -1 : 1));
      setIsLike(!isLike);
  }
    
  const [fallow, setIsFallow] = useState(false)
  const onFallow = () => {
      setIsFallow(!fallow);
  }

  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: 'center' }}>
      <TouchableOpacity>
        <Image
          source={{ uri: item.picture}}
          style={styles.profileImgStyle}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={{ marginHorizontal: 8, color: 'white'}}>
          {item.name}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onFallow} >
        <Text style={{
          color: 'white', backgroundColor: fallow ?'blue' : 'rgba(0, 0, 0, 0)' , paddingHorizontal: 10, borderRadius: 5
        }}>
          Follow
        </Text> 
      </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", marginTop: 8 }}>
        <Text
          numberOfLines={1}  
          style={{ flex: 1, color: 'white'}}
        >
          Lorem oribus? Nobis, molestiaer!
        </Text>
        <TouchableOpacity>
          <Text style={{ color:'white'}}>More..</Text>
        </TouchableOpacity>
      </View>

      <View style={{ ...styles.flexHorizontal, marginVertical: 8 }}>      
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={ onLike }>
          <Image
            style={{ tintColor: ( !isLike ? 'gray' : 'red'), width: 30, height:30 }}
            source={ !isLike ? ImgPathImage.icHeart : ImgPathImage.icHeartFill }
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={{marginHorizontal: 8, tintColor: 'gray', width: 30, height:30  }}
            source={ ImgPathImage.icChat }
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={{tintColor: 'gray', width: 30, height:30  }}
            source={ ImgPathImage.icShare }
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={{marginHorizontal: 8, tintColor: 'gray', width: 30, height:30  }}
            source={ ImgPathImage.icMore }
          />
        </TouchableOpacity>
      
      </View>

      <View style={{  flexDirection: 'row', alignItems: 'center' }}>
        <View style={{  flexDirection: 'row', alignItems: 'center' }}>
          <Image
              style={{ tintColor: 'white', width: 15, height: 15 }}
              source={ ImgPathImage.icHeartFill }
            />
          <Text 
            style={{ marginLeft: 4, color: 'white'}}
          > {like}</Text>
        </View>
      </View>          
    </View>

    </View>

  )
}

const styles = StyleSheet.create({
    backgroundVideo:{
      position: 'absolute',
      height: height,
      width:width
    },
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
      paddingVertical: 32,
      paddingHorizontal: 16
    },
    profileImgStyle: {
      height: 30,
      width: 30,
      borderRadius: 30/2
    }
  })
  