import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  width: 100%;
`;

export const Error = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family : ${({ theme }) => theme.fonts.regular};
  color : ${({ theme }) => theme.colors.attention};

  margin: -5px 0px 7px 0;
`;

