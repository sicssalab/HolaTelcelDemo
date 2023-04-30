import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import ImgPathImage from '~components/ImagePath/ImgPathImage';

const ConciergeButton = () => {
  return (
    <TouchableOpacity
      style={styles.actionSection}
      onPress={async () => {
        Linking.openURL('tel:+529982423611');
      }}>
      <Image
        source={ImgPathImage.icCall}
        style={{ tintColor: 'gray', height: 20, width: 20 }}
      />
      <Text style={styles.reactionText}>Concierge</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionSection: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  reactionText: {
    color: '#fff',
    marginLeft: 5,
  },
});
export default ConciergeButton;
