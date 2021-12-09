import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { ScrollView } from "react-native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(113)}px;

  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;

  background-color: ${({ theme }) => theme.colors.primary};
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
`;

export const Content = styled(ScrollView).attrs({
  contentContainerStyle: { padding: 24 },
})``;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`;
