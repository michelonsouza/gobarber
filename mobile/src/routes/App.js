import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Dashboard, Profile } from '~/screens';
import New from './New';

const { Navigator, Screen } = createBottomTabNavigator();

/* eslint-disable react/prop-types */
export default function App() {
  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: '#fff',
        keyboardHidesTabBar: true,
        inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
        style: {
          backgroundColor: '#8d41a8',
          borderTopColor: 'transparent',
          paddingTop: 10,
          height: 90,
        },
        labelStyle: {
          fontSize: 14,
        },
      }}>
      <Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: 'Agendamentos',
          tabBarIcon: ({ color }) => (
            <Icon name="event" color={color} size={20} />
          ),
        }}
      />
      <Screen
        name="New"
        component={New}
        options={{
          unmountOnBlur: true,
          title: 'Agendar',
          tabBarVisible: false,
          tabBarIcon: ({ color }) => (
            <Icon name="add-circle-outline" color={color} size={20} />
          ),
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Meu Perfil',
          tabBarIcon: ({ color }) => (
            <Icon name="person" color={color} size={20} />
          ),
        }}
      />
    </Navigator>
  );
}
