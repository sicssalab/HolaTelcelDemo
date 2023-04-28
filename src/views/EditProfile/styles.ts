import styled, { css } from 'styled-components/native';
import { Button } from '~components';
import { width } from '~constants';

export const containerPadding = 15;
export const numOfColumns = 3;
export const userPictureHeight = 129;
export const userPictureWidth = (width - containerPadding * 2) / numOfColumns;

export const Container = styled.ScrollView`
  flex-grow: 1;
`;

export const AvatarWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

export const AvatarContainer = styled.View`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 75px;
  border-width: 2px;
  border-color: ${(props) => props.theme.colors.primary};
  overflow: hidden;
`;

export const AvatarOverlay = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.4);
  border-bottom-left-radius: 75px;
  border-bottom-right-radius: 75px;
  align-items: center;
  justify-content: center;
`;

export const ContinueButton = styled(Button)`
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
