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

import { width } from '~constants';

const DescriptionPost = (props) => {
  const { post, isLineal } = props;

  const onClick = () => {
    const { onClick } = props;
    onClick && onClick();
  };

  const renderLine = () => {
    return (
      <View style={styles.description}>
        <View style={styles.pmcdStarLine}>
          <Text numberOfLines={1} style={styles.texts}>{post.description}</Text>
        </View>
        <Text style={styles.pmcdEndLine}>Ver más</Text>
      </View>
    );
  };

  const render = () => {
    return (
      <View style={styles.description}>
        <View style={styles.pmcdEndLine}>
          <Text style={styles.texts}>{post.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <TouchableOpacity onPress={onClick}>
      <View style={{ flexDirection: 'row', margin: 8 }}>
        {isLineal && renderLine()}
        {!isLineal && render()}
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  description: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    'padding-top': 5,
    'padding-bottom': 10,
    'justify-content': 'space-around',
    'align-items': 'center',
    'flex-wrap': 'nowrap',
  },
  texts: {
    fontSize: 16,
    color: '#fff',
  },
  pmcdStarLine: {
    'white-space': 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '80%',
  },
  pmcdEndLine: {
    flexGrow: 1,
    display: 'flex',
    fontSize: 16,
    color: '#fff',
  },
});

export default DescriptionPost;
