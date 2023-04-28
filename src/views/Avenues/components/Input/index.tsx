import React from 'react';
import { TextInputProps } from 'react-native';
import { CancelIcon, CancelTouchArea, Content, TextInput } from './styles';
import Text from '~components/Text';


export const Input = ({ ...props }) => {
  return (
    <>
      <Content>
        <TextInput {...props} />
        {!!props.value && (
          <CancelTouchArea onPress={() => props.onChangeText('')}>
            <CancelIcon />
          </CancelTouchArea>
        )}
      </Content>
    </>
  );
};
