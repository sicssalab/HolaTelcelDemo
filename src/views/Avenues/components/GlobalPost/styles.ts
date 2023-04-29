import styled from 'styled-components/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

export const Tab = createMaterialTopTabNavigator();

export const Container = styled(SafeAreaView).attrs({
  edges: ["left", "right"],
})`
`;

export const DataWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px;
`;

export const PICTURE_SIZE = 62;

export const Picture = styled.Image`
  width: ${PICTURE_SIZE}px;
  height: ${PICTURE_SIZE}px;
  border-radius: 0;
  margin-right: 15px;
`;

export const Description = styled.View`
  margin-top: 5px;
`;
