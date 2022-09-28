import React  from 'react';
import Login from './login';
import { createStackNavigator } from 'react-navigation-stack';

export const LoginStackNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      },
    }
  },
);