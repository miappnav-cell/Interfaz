import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

import TopBar from '../components/TopBar/TopBar';
import SideMenu from '../components/SideMenu/SideMenu';

import UpdatesScreen from '../screens/Updates/UpdatesScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import SecurityScreen from '../screens/Security/SecurityScreen';
import PrivacyScreen from '../screens/Privacy/PrivacyScreen';
import UsersScreen from '../screens/UsersManager/UsersScreen';
import ApiScreen from '../screens/ApiSettings/ApiScreen';
import LogoutHandler from '../screens/Auth/LogoutHandler';

export default function RootNavigator() {
  const [currentScreen, setCurrentScreen] = useState('UsersManager');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Updates': return <UpdatesScreen />;
      case 'Settings': return <SettingsScreen />;
      case 'Security': return <SecurityScreen />;
      case 'Privacy': return <PrivacyScreen />;
      case 'UsersManager': return <UsersScreen />;
      case 'ApiSettings': return <ApiScreen />;
      case 'Logout': 
        return <LogoutHandler onConfirmLogout={() => setCurrentScreen('UsersManager')} />;
      default: return <UsersScreen />;
    }
  };

  const handleNavigate = (screenName) => {
    setCurrentScreen(screenName);
    setIsMenuOpen(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111" />
      <TopBar onOpenMenu={() => setIsMenuOpen(true)} />
      <View style={styles.content}>
        {renderScreen()}
      </View>
      <SideMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        onNavigate={handleNavigate} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  content: { flex: 1 }
});
