import {
  View,
  Text,
  Modal,
  ScrollView,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HeaderPost = (props) => {
  const { item, hasSandWith } = props;

  const onNavigateClick = () => {
    const {onNavigateClick} = props;
    onNavigateClick && onNavigateClick();
  }

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onNavigateClick}>
        <Image style={styles.avatar} source={{ uri: item.picture }} />
      </TouchableOpacity>
      <View style={styles.headerContent}>
        <TouchableOpacity onPress={onNavigateClick}>
          <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
        <Text style={styles.time}>
          {item.hasPremium ? 'Privado' : 'Publico'}, {item.createDate}
        </Text>
      </View>
      {/* {item.hasActiveStreaming && (
        <View>
          <Image 
          source={require('~assets/images/envivo.gif')}
          style={{width: 75, height: 40, resizeMode: 'contain',}} />
        </View>
      )} */}
      {hasSandWith && (
        <TouchableOpacity style={styles.icon}>
            <Icon name='dots-vertical' size={20} color='#999' />
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  headerContent: {
    flex: 1,
    paddingVertical: 5,
    marginLeft: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#fff',
  },
  time: {
    //color: '#999',
    fontSize: 14,
    color: '#aaa',
  },
  icon: {
    marginLeft: 10,
    color: '#fff',
  },
});
HeaderPost.defaultProps = {
    hasSandWith: true
}
export default HeaderPost;
