import React, { useState } from 'react';
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

import MediaGrid from '../MediaGrid';
import ModalPost from '../ModalPost/ModalPost';
import StarPost from './StarPost';
import DescriptionPost from './components/DescriptionPost';
import FooterGlobalPost from './components/FooterGlobalPost';
import HeaderPost from './components/HeaderPost';

const GlobalPost = (props) => {
  const { item, hasbuttonLink } = props;
  const [showModal, setShowModal] = useState(false);

  const onShowModal = () => {
    setShowModal(!showModal);
  };

  const onNavigateClick = () => {
    const { onNavigateClick } = props;
    onShowModal();
    onNavigateClick && onNavigateClick();
  };

  return (
    <View style={styles.container}>
      <HeaderPost item={item} onNavigateClick={onNavigateClick} />
      <View style={styles.body}>
        {item.address && (
          <DescriptionPost
            post={{
              description: 'Dirección: ' + item.address,
            }}
            onClick={onShowModal}
          />
        )}
        {item.stars && <StarPost stars={item.stars} />}
        {item.description && (
          <DescriptionPost post={item} isLineal onClick={onShowModal} />
        )}
        {item.videos && (
          <MediaGrid
            array={item.videos}
            itemView={item}
            onMediaPress={onShowModal}
          />
        )}
      </View>
      <FooterGlobalPost item={item} />
      <ModalPost
        onClose={onShowModal}
        modalVisible={showModal}
        post={item}
        hasbuttonLink={hasbuttonLink}
        onNavigateClick={onNavigateClick}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e1e1e',
    borderRadius: 0,
    marginVertical: 10,
    //marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  body: {
    paddingVertical: 0,
  },
});
export default GlobalPost;
