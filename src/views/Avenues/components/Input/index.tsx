import React from 'react';
import { CancelIcon, CancelTouchArea, Content, TextInput } from './styles';

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
