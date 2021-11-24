import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(140)}px;

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

export const Form = styled.View`
  flex: 1;
  width: 100%;
  justify-content: space-between;
  padding: 24px;
`;

export const Fields = styled.View``;

export const TransactionTypes = styled.View`
  flex-direction: row;
  justify-content: space-between;

  margin-top: 8px;
`;
