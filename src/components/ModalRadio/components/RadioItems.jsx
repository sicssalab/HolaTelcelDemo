import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

const RadioItems = (props) => {
    const {item} = props;

    const onClick = () => {
        const {onClick} = props;
        onClick && onClick(item.id);
    }

  return (
    <TouchableOpacity onPress={onClick}>
        <View style={styles.container}>
        <Image source={require('~images/avatar-1.jpg')} style={styles.image} />
        <Text style={styles.text}>{item.name}</Text>
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center', //TODO centra items en medio del contenedor
  },
  image: {
    marginRight: 15,
    width: 40,
    height: 40,
    borderRadius: 50,
    resizeMode: 'contain',
  },
  text: {
    color: "white",
    fontWeight: "bold"
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    color: 'white',
  },
});

export default RadioItems;
