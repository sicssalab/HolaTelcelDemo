import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import ShareButton from './ShareButton';
import ConciergeButton from './ConciergeButton';
import FavoriteButton from './FavoriteButton';
import NotificationButton from './NotificationButton';

const ModalOptions = (props) => {
  const { modalVisible, item } = props;
  const [shared, setShared] = useState(false);
  const [sharedCount, setSharedCount] = useState(item.shares || 0);

  const onClose = () => {
    const { onClose } = props;
    onClose && onClose();
  };

  const handleSharePress = () => {
    if (shared) {
      setSharedCount(sharedCount - 1);
      setShared(false);
    } else {
      setSharedCount(sharedCount + 1);
      setShared(true);
    }
  };

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      style={{margin:0}}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContainerBody}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name='close' size={30} color='white' />
          </TouchableOpacity>
            <View style={styles.modalInside}>
                {/* <View style={styles.contentOpciones}>
                    <Text style={styles.textOpciones}>Opciones:</Text>
                </View> */}
                <View>
                    <ShareButton
                    item={item}
                    shared={shared}
                    sharedCount={sharedCount}
                    onSharedPress={handleSharePress}
                    />
                </View>
                <View>
                    <FavoriteButton />
                </View>
                <View>
                    <NotificationButton />
                </View>
                {/* <View style={{paddingVertical: 10}}>
                    <ConciergeButton />
                </View> */}
            </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "flex-end",
    alignItems: 'center',
  },
  modalContainerBody: {
    backgroundColor: '#1e1e1e',
    borderTopColor: "gold",
    borderLeftColor: "gold",
    borderRightColor: "gold",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    marginTop: Constants.statusBarHeight,
    width: '100%',
    alignItems: 'center',
    height: 250,
    paddingHorizontal: 20,
    paddingTop: 45,
  },
  modalInside: {
    backgroundColor: "#242526",
    width: "100%",
    height: 150,
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
    borderRadius: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 20
  },
  contentOpciones: {
      borderBottomWidth: 1,
      borderColor: "#3E4042",
      width: "100%",
      alignItems: "center",
      paddingBottom: 10
  },    
  textOpciones: {
    fontSize: 20,
    color: "white",
    marginTop: 10,
  },
  closeButton: {
    position: 'absolute',
    color: '#fff',
    fill: '#fff',
    top: 10,
    right: 10,
    zIndex: 1,
  },
});
export default ModalOptions;
