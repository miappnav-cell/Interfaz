import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';

// Importación exclusiva de Pantallas Principales
import ApiScreen from '../screens/ApiSettings/ApiScreen';
import PrivacyScreen from '../screens/Privacy/PrivacyScreen';
import SecurityScreen from '../screens/Security/SecurityScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import UpdatesScreen from '../screens/Updates/UpdatesScreen';
import UsersScreen from '../screens/UsersManager/UsersScreen';
import WalletScreen from '../screens/Wallet/WalletScreen';

import notificationSoundService from '../services/notificationSoundService';

export const RootNavigator = () => {
  const [activeTab, setActiveTab] = useState('Users');

  const renderScreen = () => {
    switch (activeTab) {
      case 'Users':
        return <UsersScreen />;
      case 'API':
        return <ApiScreen />;
      case 'Security':
        return <SecurityScreen />;
      case 'Wallet':
        return <WalletScreen />;
      case 'Settings':
        return <SettingsScreen />;
      case 'Updates':
        return <UpdatesScreen />;
      case 'Privacy':
        return <PrivacyScreen />;
      default:
        return <UsersScreen />;
    }
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    notificationSoundService.playSoundEffect('click');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#05050a" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>👑 KING SYSTEM</Text>
        <Text style={styles.headerSubtitle}>{activeTab.toUpperCase()}</Text>
      </View>

      <View style={styles.content}>
        {renderScreen()}
      </View>

      <View style={styles.navBar}>
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'Users' && styles.activeNavItem]} 
          onPress={() => handleTabChange('Users')}
        >
          <Text style={[styles.navText, activeTab === 'Users' && styles.activeNavText]}>👥 Bots</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'API' && styles.activeNavItem]} 
          onPress={() => handleTabChange('API')}
        >
          <Text style={[styles.navText, activeTab === 'API' && styles.activeNavText]}>📡 API</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'Security' && styles.activeNavItem]} 
          onPress={() => handleTabChange('Security')}
        >
          <Text style={[styles.navText, activeTab === 'Security' && styles.activeNavText]}>🛡️ Seg</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'Wallet' && styles.activeNavItem]} 
          onPress={() => handleTabChange('Wallet')}
        >
          <Text style={[styles.navText, activeTab === 'Wallet' && styles.activeNavText]}>💼 Wallet</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'Settings' && styles.activeNavItem]} 
          onPress={() => handleTabChange('Settings')}
        >
          <Text style={[styles.navText, activeTab === 'Settings' && styles.activeNavText]}>⚙️ Ajustes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#05050a' },
  header: { height: 55, backgroundColor: '#0a0a14', borderBottomWidth: 1, borderBottomColor: '#1a1a2e', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16 },
  headerTitle: { color: '#00ffff', fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
  headerSubtitle: { color: '#a0a0c0', fontSize: 12, fontWeight: '600' },
  content: { flex: 1 },
  navBar: { height: 60, backgroundColor: '#0a0a14', borderTopWidth: 1, borderTopColor: '#1a1a2e', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  navItem: { paddingVertical: 8, paddingHorizontal: 10, borderRadius: 8 },
  activeNavItem: { backgroundColor: '#1a1a3a' },
  navText: { color: '#6e6e8e', fontSize: 11, fontWeight: 'bold' },
  activeNavText: { color: '#00ffff' }
});

export default RootNavigator;
