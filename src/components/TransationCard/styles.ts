import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface TypesProps {
  transactionTypes: 'up' | 'down';
}

export const Container = styled.View`
  width: 100%;
  padding: 17px 24px;
  margin-top: 16px;
  border-radius: 5px;

  background-color: ${({ theme }) => theme.colors.shape};
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};
`;

export const Amount = styled.Text<TypesProps>`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme, transactionTypes}) => transactionTypes === 'up' 
    ? theme.colors.success
    : theme.colors.attention
  };

  margin-top: 2px;
`;

export const Footer = styled.View`
  margin-top: 19px;

  flex-direction: row;
  justify-content: space-between;
`;

export const Category = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const CategoryName = styled.Text`
  margin-left: 17px;

  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
`;

export const Date = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
`;
