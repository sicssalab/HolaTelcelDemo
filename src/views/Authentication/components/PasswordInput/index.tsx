import React, { useCallback, useState } from 'react';

import { Container, TextInput, IconContainer, LockIcon, CountryCodeText, Separator } from './styles';
import { TextInputProps } from 'react-native';

interface PasswordInputProps extends TextInputProps {
  onPasswordChange: (password: string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ onPasswordChange, ...props }) => {
  const [password, setPassword] = useState('');

  const formatPassword = useCallback((pwd: string) => {
    setPassword(pwd);
    onPasswordChange(pwd);
  }, [onPasswordChange]);

  return (
    <Container>
      <IconContainer>
        <LockIcon />
      </IconContainer>
      <Separator />
      <TextInput
        name='password'
        placeholder='Introduce tu contraseña'
        autoCapitalize='none'
        autoCorrect={false}
        textContentType='newPassword'
        secureTextEntry
        value={password}
        enablesReturnKeyAutomatically
        onChangeText={formatPassword}
        {...(props as any)}
      />
    </Container>
  );
};

export default PasswordInput;
