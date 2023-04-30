import React from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { CancelIcon, CancelTouchArea, Content, TextInput } from './styles';


export const Input = ({ ...props }) => {

  const onSubmit = () => {
    props.onChangeText(props.value)
  }
  return (
    <>
      <Content>
        <TextInput {...props} 
        enablesReturnKeyAutomatically 
        onSubmitEditing={onSubmit}
        returnKeyType='send'
        />
        {!!props.value && (
          <View style={styles.container}>
            <CancelTouchArea onPress={() => props.onChangeText('')}>
              <CancelIcon />
            </CancelTouchArea>
            <TouchableOpacity onPress={onSubmit}>
              <Image source={require('~assets/icons/send-64.png')} style={styles.send} />
            </TouchableOpacity>
          </View>
        )}
      </Content>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // backgroundColor: '#1e1e1e',
    // borderRadius: 0,
    // marginVertical: 10,
    // //marginHorizontal: 15,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
    paddingRight: 15
  },
  send: {
    //paddingVertical: 0,
    width: 30,
    height: 30,
  },
});