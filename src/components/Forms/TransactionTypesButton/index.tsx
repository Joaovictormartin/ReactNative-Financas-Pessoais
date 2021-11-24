import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { 
  Container, 
  Icon, 
  Title 
} from './styles';

const icon = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
}

interface Props extends TouchableOpacityProps{
  type: 'up' | 'down';
  title: string;
  isActive: boolean;
}

export function TransactionTypesButton({ title, type, isActive, ...rest } : Props) {
  return (
    <Container
      type={type}
      isActive={isActive} 
      {...rest}
    >
      <Icon 
        name={icon[type]} 
        type={type}
      />
      <Title>{title}</Title>
    </Container>
  )
}

