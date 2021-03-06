import 'react-native-gesture-handler';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { SignIn, SignUp } from '~/screens';
import App from './App';

const { Navigator: StackNavigator, Screen } = createStackNavigator();

const options = {
  headerShown: false,
  gestureEnabled: false,
};

export default function Routes() {
  const { signed } = useSelector(state => state.auth);
  return (
    <NavigationContainer>
      {!signed ? (
        <StackNavigator screenOptions={options}>
          <Screen name="SignIn" component={SignIn} />
          <Screen name="SignUp" component={SignUp} />
        </StackNavigator>
      ) : (
        <App />
      )}
    </NavigationContainer>
  );
}
