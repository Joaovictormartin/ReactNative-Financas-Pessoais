import React from 'react';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

type RootProps = {
  Listagem: undefined;
  Cadastrar: undefined;
  Resumo: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator<RootProps>();

import { Register } from '../screens/Register';
import { Dashboard } from '../screens/Dashbord';
import { Resume } from '../screens/Resume';



export function AppRoutes() {

  const { colors, fonts } = useTheme();

  return (
    <Navigator
      initialRouteName="Listagem"
      screenOptions={{
        headerShown: false,                                 //tirar o titulo de cada pag
        tabBarActiveTintColor: colors.secondary,            //cor da opção ativa
        tabBarInactiveTintColor: colors.text,               //cor da opção inativa
        tabBarLabelPosition: 'beside-icon',                 //coloca os icons e texto ao lado
        tabBarStyle: {                                      //estilo da barra
          height: 72,                                       //altura da barra
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,  //padding da barra
        }
      }}
    >
      <Screen 
        name="Listagem" 
        component={Dashboard}
        options={{ 
          tabBarIcon: (({ size, color }) => 
            <MaterialIcons 
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          )
        }}
      />

      <Screen 
        name="Cadastrar" 
        component={Register} 
        options={{ 
          tabBarIcon: (({ size, color }) => 
            <MaterialIcons 
              name="attach-money"
              size={size}
              color={color}
            />
          )
        }}
      />

      <Screen 
        name="Resumo" 
        component={Resume} 
        options={{
          tabBarIcon: (({ size, color }) => 
            <MaterialIcons
              name="pie-chart"
              size={size}
              color={color}
            />
          )
        }}
      />
    </Navigator>
  )
}