import {
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Text,
} from 'react-native';

import RadioItems from './RadioItems';

const RadioContent = (props) => {
  const { items } = props;
  const onClick = (response) => {
    const { onClick } = props;
    onClick && onClick(response);
  };
  return (
    <View
      style={{
        flex: 1,
        //backgroundColor: '#ff4081',
      }}>
      {items &&
        items.map((item, i) => {
          return <RadioItems onClick={onClick} item={item} key={i} />;
        })}
    </View>
  );
};

export default RadioContent;
