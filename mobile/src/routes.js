import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { navigationRef } from './services/navigation';

import { SignIn, SignUp } from './screens';

const { Navigator: StackNavigator, Screen } = createStackNavigator();

const options = {
  headerShown: false,
  gestureEnabled: false,
};

export default function Routes() {
  return (
    <NavigationContainer ref={navigationRef}>
      <StackNavigator>
        <Screen name="SignIn" component={SignIn} options={options} />
        <Screen name="SignUp" component={SignUp} options={options} />
      </StackNavigator>
    </NavigationContainer>
  );
}
