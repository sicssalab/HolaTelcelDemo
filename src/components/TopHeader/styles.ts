import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.colors.topHeaderBackground};
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.border};
`;

export const LeftSide = styled.View`
  width: 50%;
  align-self: flex-start;
  margin-right: auto;
`;

export const RightSide = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  padding: 0 15px;
`;

export const SearchIconWrapper = styled.View`
  margin-right: 10px;
`;

export const LogoWrapper = styled.View`
  flex: 1;
`;
