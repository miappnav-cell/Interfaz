import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';

import UsersScreen from './src/screens/UsersManager/UsersScreen';
import SecurityScreen from './src/screens/Security/SecurityScreen';
import WalletScreen from './src/screens/Wallet/WalletScreen';
import UpdatesScreen from './src/screens/Updates/UpdatesScreen';
import { pushService } from './src/services/pushService';

export default function App() {
  const [activeTab, setActiveTab] = useState('USERS');

  useEffect(() => {
    pushService.registerForPushNotifications();
  }, []);

  const renderScreen = () => {
    switch (activeTab) {
      case 'USERS':
        return <UsersScreen />;
      case 'WALLET':
        return <WalletScreen />;
      case 'SECURITY':
        return <SecurityScreen />;
      case 'UPDATES':
        return <UpdatesScreen />;
      default:
        return <UsersScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#090a0f" />
      
      {/* Visualizador de Pantalla Activa */}
      <View style={styles.content}>
        {renderScreen()}
      </View>

      {/* Barra Nav Inferior con todos los Nodos */}
      <View style={styles.navBar}>
        <TouchableOpacity 
          style={[styles.navBtn, activeTab === 'USERS' && styles.navBtnActive]}
          onPress={() => setActiveTab('USERS')}
        >
          <Text style={[styles.navText, activeTab === 'USERS' && styles.navTextActive]}>👥 USUARIOS</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navBtn, activeTab === 'WALLET' && styles.navBtnActive]}
          onPress={() => setActiveTab('WALLET')}
        >
          <Text style={[styles.navText, activeTab === 'WALLET' && styles.navTextActive]}>💰 BILLETERA</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navBtn, activeTab === 'SECURITY' && styles.navBtnActive]}
          onPress={() => setActiveTab('SECURITY')}
        >
          <Text style={[styles.navText, activeTab === 'SECURITY' && styles.navTextActive]}>🔒 SEGURIDAD</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navBtn, activeTab === 'UPDATES' && styles.navBtnActive]}
          onPress={() => setActiveTab('UPDATES')}
        >
          <Text style={[styles.navText, activeTab === 'UPDATES' && styles.navTextActive]}>⚡ OTA</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#090a0f' },
  content: { flex: 1 },
  navBar: { 
    flexDirection: 'row', 
    backgroundColor: '#121622', 
    borderTopWidth: 1, 
    borderColor: '#1c2333', 
    paddingVertical: 10,
    justify: 'space-around'
  },
  navBtn: { flex: 1, alignItems: 'center', paddingVertical: 6 },
  navBtnActive: { borderBottomWidth: 2, borderColor: '#00e676' },
  navText: { color: '#6b7a99', fontSize: 10, fontWeight: 'bold' },
  navTextActive: { color: '#00e676' }
});
