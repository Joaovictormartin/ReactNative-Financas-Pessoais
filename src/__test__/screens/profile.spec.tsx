import React from "react";
import { render } from '@testing-library/react-native';

import { Profile } from '../../screens/Profile';


test('check if show correctly user input name placeholder', () => { //nome do teste
  const { getByPlaceholderText } = render(<Profile/>);  //renderiza o profile e desestrutura o placeholder

  const inputName =getByPlaceholderText('Nome'); //procura pelo placeholder 'nome'
  
  expect(inputName).toBeTruthy() //verifica se realmente tem esse component
})

test('ckecks if user data has been loaded', () => {
  const { getByTestId } = render(<Profile/>)
})