import React, { useState } from 'react';
import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ImgPathImage from '~components/ImagePath/ImgPathImage';

export const LikeButton = ( {varLikes} ) => {

    const [like, setLike] = useState(varLikes), [isLike, setIsLike] = useState(false)
    const onLike = () => {
        setLike( like + ( isLike ? -1 : 1));
        setIsLike(!isLike);
    }

    return (
        <TouchableOpacity style={styles.actionSection} onPress={ onLike }>
            <Image source={ !isLike ? ImgPathImage.icLike : ImgPathImage.icLiked } style={{ tintColor: (!isLike ? 'gray' : 'hsl(206,100%,40%)'), height: 30, width:30 }}/>
            <Text style={{ 
                margin: 5,
                fontSize: 12,
                color: (!isLike ? 'gray' : 'hsl(206,100%,40%)')
            }} >{like}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    actionSection: {
        flex: 1,
        margin: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
});
