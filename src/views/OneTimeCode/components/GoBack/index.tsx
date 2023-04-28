import React, { useContext } from 'react';
import { TouchableOpacityProps } from 'react-native';

import { ThemeContext } from 'styled-components/native';
import BackArrow from '~images/BackArrow.svg';

import { Container } from './styles';

const GoBack: React.FC<TouchableOpacityProps> = (props) => {
  const themeContext = useContext(ThemeContext);

  return (
    <Container {...props}>
      <BackArrow fill={themeContext.colors.text} />
    </Container>
  );
};

export default GoBack;
