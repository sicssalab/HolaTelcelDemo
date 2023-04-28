import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${(props) => props.theme.colors.headerBackground};
`;

export const Tabs = styled.View`
  flex-direction: row;
  flex: 1;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.border};
`;

export const Tab = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Indicator = styled(Animated.View)`
  height: 2px;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 0;
`;

export const Picture = styled.Image`
  width: 80px;
  height: 100px;
  border-radius: 5px;
  margin-bottom: 5px;

  background-color: ${(props) => props.theme.colors.border};
`;
