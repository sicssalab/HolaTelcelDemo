import React, { useCallback, useState } from 'react';
import { Alert, TextInputProps } from 'react-native';
import { MaskService } from 'react-native-masked-text';

import {
  Container,
  TextInput,
  CountryCodeContainer,
  CountryCodeText,
  MobileIcon,
  Separator,
} from './styles';

interface PhoneInputProps extends TextInputProps {
  onPhoneNumberChange: (phoneNumber: string) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  onPhoneNumberChange,
  ...props
}) => {
  const [phoneNumber, setPhoneNumber] = useState();

  const formatPhone = useCallback(
    (tel: string) => {
      const formattedNumber = MaskService.toMask('cel-phone', tel || '', {
        maskType: 'BRL',
        withDDD: true,
        dddMask: '(999) ',
      });
      setPhoneNumber(formattedNumber);
      onPhoneNumberChange(formattedNumber);
    },
    [onPhoneNumberChange],
  );

  return (
    <Container>
      <CountryCodeContainer>
        <MobileIcon />
      </CountryCodeContainer>
      <Separator />
      <TextInput
        keyboardType='number-pad'
        textContentType='telephoneNumber'
        value={phoneNumber}
        onChangeText={formatPhone}
        maxLength={14}
        {...(props as any)}
      />
    </Container>
  );
};

export default PhoneInput;
