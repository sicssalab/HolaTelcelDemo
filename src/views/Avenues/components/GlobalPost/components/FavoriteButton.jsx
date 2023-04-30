import { useContext, useState } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  View,
} from 'react-native';

import { ThemeContext } from 'styled-components/native';
import StarIcon from '~assets/icons/general/star.svg';
import StarFillIcon from '~assets/icons/star_FILL.svg';

const FavoriteButton = () => {
  const themeContext = useContext(ThemeContext);
  const [active, setActive] = useState(false);

  const onClick = () => {
    setActive(!active);
  };

  return (
    <TouchableOpacity style={styles.actionSection} onPress={onClick}>
      {active && <StarIcon width={20} height={20} />}
      {!active && (
        <StarFillIcon width={20} height={20} fill={themeContext.colors.text} />
      )}
      <Text style={styles.reactionText}>
        {!active ? 'Agregar este contenido a favoritos' : 'Quitar este contenido a favoritos'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionSection: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 15,
  },
  reactionText: {
    color: '#fff',
    marginLeft: 5,
  },
});

export default FavoriteButton;
