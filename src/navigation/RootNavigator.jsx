import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SecurityScreen from '../screens/Security/SecurityScreen';
import UsersScreen from '../screens/UsersManager/UsersScreen';
import WalletScreen from '../screens/Wallet/WalletScreen';
import UpdatesScreen from '../screens/Updates/UpdatesScreen';
import ApiScreen from '../screens/ApiSettings/ApiScreen';
import PrivacyScreen from '../screens/Privacy/PrivacyScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Security"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          animationDuration: 200,
          contentStyle: { backgroundColor: '#090a0f' }
        }}
      >
        <Stack.Screen name="Security" component={SecurityScreen} />
        <Stack.Screen name="UsersManager" component={UsersScreen} />
        <Stack.Screen name="Wallet" component={WalletScreen} />
        <Stack.Screen name="Updates" component={UpdatesScreen} />
        <Stack.Screen name="ApiSettings" component={ApiScreen} />
        <Stack.Screen name="Privacy" component={PrivacyScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
