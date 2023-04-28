import Color from 'color';
import styled from 'styled-components/native';
import cancelIcon from '~images/Cancel.svg';

export const Content = styled.View`
  flex-direction: row;
  align-items: center;
  background: ${(props) => props.theme.colors.whiteBackground};
  border-radius: 8px;
  padding: 15px 5px;
  margin-top: 0;
`;

export const TextInput = styled.TextInput.attrs((props) => ({
  placeholderTextColor: props.theme.colors.black,
  fontWeight: '300',
}))`
  flex: 1;
  color: ${(props) => props.theme.colors.black};
  font-family: ${(props) => props.theme.typography.fontFamily.medium};
  font-size: ${(props) => props.theme.typography.sizes.regular.size}px;
  padding-left: 10px;
`;

export const CancelTouchArea = styled.TouchableOpacity`
  padding: 0 20px 0 10px;
  justify-content: center;
`;

export const CancelIcon = styled(cancelIcon).attrs((props) => ({
  fill: props.theme.colors.black,
}))`
  opacity: 0.6;
  width: 18px;
  height: 18px;
`;
