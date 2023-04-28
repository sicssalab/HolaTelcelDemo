import { StyleSheet } from 'react-native';

import Color from 'color';
import styled, { css } from 'styled-components/native';
import lockIcon from '~assets/icons/general/lock.svg';

const fontStyle = css`
  font-family: ${(props) => props.theme.typography.fontFamily.bold};
  font-size: ${(props) => props.theme.typography.sizes.large.size}px;
  color: ${(props) => props.theme.colors.text};
`;

export const Container = styled.View`
  border-radius: 15px;
  border: 1px ${(props) => props.theme.colors.text};
  flex-direction: row;
  overflow: hidden;
  margin: 5px 0 25px 0;
`;

export const TextInput = styled.TextInput.attrs((props) => ({
  placeholderTextColor: Color(props.theme.colors.text).fade(0.5).rgb().string(),
}))`
  padding: 20px 15px;
  flex: 1;
  ${fontStyle}
`;

export const IconContainer = styled.View`
  padding: 15px;
  align-items: center;
  justify-content: center;
`;

export const LockIcon = styled(lockIcon).attrs((props) => ({
  fill: props.theme.colors.text,
}))`
  opacity: 0.6;
  width: 18px;
  height: 18px;
`;

export const Separator = styled.View`
  width: ${StyleSheet.hairlineWidth}px;
  margin: 20px 5px;
  background-color: ${(props) => props.theme.colors.text};
`;
