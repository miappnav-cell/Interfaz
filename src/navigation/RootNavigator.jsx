import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TopBar from '../components/TopBar/TopBar';
import SideMenu from '../components/SideMenu/SideMenu';

import SecurityScreen from '../screens/Security/SecurityScreen';
import UsersScreen from '../screens/UsersManager/UsersScreen';
import WalletScreen from '../screens/Wallet/WalletScreen';
import UpdatesScreen from '../screens/Updates/UpdatesScreen';
import ApiScreen from '../screens/ApiSettings/ApiScreen';
import PrivacyScreen from '../screens/Privacy/PrivacyScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('Security');
  const navRef = useRef(null);

  const handleNavigate = (screenName) => {
    setCurrentScreen(screenName);
    if (navRef.current) {
      navRef.current.navigate(screenName);
    }
  };

  return (
    <NavigationContainer ref={navRef}>
      <View style={styles.container}>
        <TopBar 
          currentScreen={currentScreen} 
          onToggleMenu={() => setMenuVisible(true)} 
        />
        <SideMenu 
          visible={menuVisible} 
          onClose={() => setMenuVisible(false)} 
          currentRoute={currentScreen}
          navigation={{ navigate: handleNavigate }}
        />
        <Stack.Navigator
          initialRouteName="Security"
          screenOptions={{
            headerShown: false,
            animation: 'fade_through'
          }}
          screenListeners={{
            state: (e) => {
              const route = e.data.state.routes[e.data.state.index];
              if (route) setCurrentScreen(route.name);
            }
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
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#090a0f' }
});
