import { StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import styled, {css} from 'styled-components/native';

import { Button } from '~components';
import Text from '~components/Text';

export const Container = styled(SafeAreaView).attrs({
  edges: ['left', 'right'],
})`
  flex: 1;
`;

export const LogoContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const RegContainer = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin: 10px 0 5px 0;
`;

const getTopCardProps = (props) => ({
  imageStyle: {
    opacity: 0.2,
    backgroundColor: props.theme.colors.background,
    transform: [{ scale: 1.05 }],
  },
});

export const TopCard = styled.ImageBackground.attrs(getTopCardProps)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
`;

export const BottomCard = styled.View`
  background-color: ${(props) => props.theme.colors.background};
  padding: 22px;
  border-top-color: ${(props) => props.theme.colors.border};
  border-top-width: 1px;
`;

export const Title = styled(Text).attrs({
  fontSize: 'h3',
  fontWeight: 'bold',
})`
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 5px;
`;

export const Highlight = styled(Title)`
  color: ${(props) => props.theme.colors.primary};
`;

export const Description = styled(Text)`
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 20px;
`;

export const LoginButton = styled(Button)`
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  border-width: 0px;
  border-top-width: 1px;
  border-color: ${(props) => props.theme.colors.background};

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
    `}
`;

interface BottomPaddingProps {
  disabled?: boolean;
}

export const BottomPadding = styled.View<BottomPaddingProps>`
  background-color: ${(props) => props.theme.colors.primary};

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
    `}
`;
