import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { SelectProvider, SelectDateTime, Confirm } from '~/screens';

const { Navigator, Screen } = createStackNavigator();

export default function New() {
  const navigation = useNavigation();

  return (
    <Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: '#fff',
        headerTransparent: true,
        gestureEnabled: false,
        headerLeftContainerStyle: {
          marginLeft: 20,
        },
      }}>
      <Screen
        name="SelectProvider"
        component={SelectProvider}
        options={{
          title: 'Selecione o prestador',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
              <Icon name="chevron-left" size={40} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
      <Screen
        name="SelectDateTime"
        component={SelectDateTime}
        options={{
          title: 'Selecione data e hora',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('SelectProvider')}>
              <Icon name="chevron-left" size={40} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
      <Screen
        name="Confirm"
        component={Confirm}
        options={{
          title: 'Confirmar agendamento',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('SelectDateTime')}>
              <Icon name="chevron-left" size={40} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
    </Navigator>
  );
}
