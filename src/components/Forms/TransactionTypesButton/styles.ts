import styled, { css } from "styled-components/native";
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

interface TypeProps {
  type: 'up' | 'down';
  isActive: boolean;
}

export const Container = styled(TouchableOpacity)<TypeProps>`
  width: 48%;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  border: 1.5px solid ${({theme}) => theme.colors.text_30};
  border-radius: 5px;

  padding: 16px;

  ${({ isActive, type }) => isActive && type === 'down' && css`
    background-color: ${({theme}) => theme.colors.attention_light};
    border: none;
  `};

  ${({ isActive, type }) => isActive && type === 'up' && css`
    background-color: ${({theme}) => theme.colors.success_light};
    border: none;
  `};
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(24)}px;
  color: ${({theme, type}) => type === 'up' 
    ? theme.colors.success
    : theme.colors.attention
};
  
  margin-right: 12px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme}) => theme.colors.title};
`;
