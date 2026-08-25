import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

import TopBar from '../components/TopBar/TopBar';
import SideMenu from '../components/SideMenu/SideMenu';

import SecurityScreen from '../screens/Security/SecurityScreen';
import UsersScreen from '../screens/UsersManager/UsersScreen';
import WalletScreen from '../screens/Wallet/WalletScreen';
import UpdatesScreen from '../screens/Updates/UpdatesScreen';
import ApiScreen from '../screens/ApiSettings/ApiScreen';
import PrivacyScreen from '../screens/Privacy/PrivacyScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';

export default function RootNavigator() {
  // Pantalla inicial: Seguridad
  const [currentScreen, setCurrentScreen] = useState('Security');
  const [menuVisible, setMenuVisible] = useState(false);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Security':
        return <SecurityScreen onUnlock={() => setCurrentScreen('UsersManager')} />;
      case 'UsersManager':
        return <UsersScreen />;
      case 'Wallet':
        return <WalletScreen />;
      case 'Updates':
        return <UpdatesScreen />;
      case 'ApiSettings':
        return <ApiScreen />;
      case 'Privacy':
        return <PrivacyScreen />;
      case 'Settings':
        return <SettingsScreen />;
      default:
        return <SecurityScreen onUnlock={() => setCurrentScreen('UsersManager')} />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#121622" />
      <TopBar 
        currentScreen={currentScreen} 
        onToggleMenu={() => setMenuVisible(true)}
      />
      <View style={styles.content}>
        {renderScreen()}
      </View>
      <SideMenu 
        visible={menuVisible} 
        onClose={() => setMenuVisible(false)} 
        currentScreen={currentScreen} 
        onNavigate={setCurrentScreen} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#090a0f' },
  content: { flex: 1 }
});
