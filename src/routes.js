import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';
import Repository from './pages/Repository';

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#7159c1',
          },
          headerTintColor: '#FFF',
        }}
      >
        <Screen name="Main" component={Main} options={Main.navigationOptions} />
        <Screen name="User" component={User} options={User.navigationOptions} />
        <Screen
          name="Repository"
          component={Repository}
          options={Repository.navigationOptions}
        />
      </Navigator>
    </NavigationContainer>
  );
}
