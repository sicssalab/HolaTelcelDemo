import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Header = styled(SafeAreaView).attrs({
  edges: ['top'],
})`
  flex-direction: row;
  align-items: center;
  background: ${(props) => props.theme.colors.secondaryBackground};
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.border};
`;
