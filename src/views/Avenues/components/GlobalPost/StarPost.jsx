import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Linking,
} from 'react-native';
import { ThemeContext } from 'styled-components/native';
import StarIcon from '~assets/icons/general/star.svg';

const StarPost = (props) => {
  const themeContext = useContext(ThemeContext);
  const { stars } = props;
  return (
    <View style={styles.container}>
      {stars &&
        Array.from({ length: stars }, (v, i) => {
          return <StarIcon key={i} width={20} height={20} fill={themeContext.colors.text} />;
        })}
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      marginHorizontal:10,
      marginBottom: 10
    },
  });
export default StarPost;
