import styled, { css } from "styled-components/native";
import { Button } from "~components";

export const Container = styled.KeyboardAvoidingView`
  background-color: ${(props) => props.theme.colors.background};
  flex: 1;
`;

export const OptionsContainer = styled.View`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10px 15px;
  margin: 0 0 20px 0;
  background-color: ${(props) => props.theme.colors.headerBackground};
`;
