import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { securityService } from './src/services/securityService';
import { apiClient, endpoints } from './src/api/endpoints';

// === IMPORTS AUTOMÁTICOS GENERADOS POR EL SISTEMA ===
import ApiScreen0 from './src/screens/ApiSettings/ApiScreen.jsx';
import ApiStatusBadge1 from './src/screens/ApiSettings/components/ApiStatusBadge.jsx';
import LogoutHandler2 from './src/screens/Auth/LogoutHandler.jsx';
import PrivacyScreen3 from './src/screens/Privacy/PrivacyScreen.jsx';
import PrivacyToggleCard4 from './src/screens/Privacy/components/PrivacyToggleCard.jsx';
import SecurityScreen5 from './src/screens/Security/SecurityScreen.jsx';
import AuditLogsCard6 from './src/screens/Security/components/AuditLogsCard.jsx';
import BiometricsCard7 from './src/screens/Security/components/BiometricsCard.jsx';
import SettingsScreen8 from './src/screens/Settings/SettingsScreen.jsx';
import CacheManagerCard9 from './src/screens/Settings/components/CacheManagerCard.jsx';
import ThemeSelector10 from './src/screens/Settings/components/ThemeSelector.jsx';
import UpdatesScreen11 from './src/screens/Updates/UpdatesScreen.jsx';
import UpdateCard12 from './src/screens/Updates/components/UpdateCard.jsx';
import UpdateStatusCard13 from './src/screens/Updates/components/UpdateStatusCard.jsx';
import UsersScreen14 from './src/screens/UsersManager/UsersScreen.jsx';
import BotControllerCard15 from './src/screens/UsersManager/components/BotControllerCard.jsx';
import UserCard16 from './src/screens/UsersManager/components/UserCard.jsx';
import UserFilterBar17 from './src/screens/UsersManager/components/UserFilterBar.jsx';
import WalletScreen18 from './src/screens/Wallet/WalletScreen.jsx';
import GatewayConfigCard19 from './src/screens/Wallet/components/GatewayConfigCard.jsx';
import ReceiveMoneyCard20 from './src/screens/Wallet/components/ReceiveMoneyCard.jsx';
import RechargeCard21 from './src/screens/Wallet/components/RechargeCard.jsx';


const SCREENS = [
  { id: 'ApiScreen0', label: 'ApiScreen', component: <ApiScreen0 /> },
  { id: 'ApiStatusBadge1', label: 'ApiStatusBadge', component: <ApiStatusBadge1 /> },
  { id: 'LogoutHandler2', label: 'LogoutHandler', component: <LogoutHandler2 /> },
  { id: 'PrivacyScreen3', label: 'PrivacyScreen', component: <PrivacyScreen3 /> },
  { id: 'PrivacyToggleCard4', label: 'PrivacyToggleCard', component: <PrivacyToggleCard4 /> },
  { id: 'SecurityScreen5', label: 'SecurityScreen', component: <SecurityScreen5 /> },
  { id: 'AuditLogsCard6', label: 'AuditLogsCard', component: <AuditLogsCard6 /> },
  { id: 'BiometricsCard7', label: 'BiometricsCard', component: <BiometricsCard7 /> },
  { id: 'SettingsScreen8', label: 'SettingsScreen', component: <SettingsScreen8 /> },
  { id: 'CacheManagerCard9', label: 'CacheManagerCard', component: <CacheManagerCard9 /> },
  { id: 'ThemeSelector10', label: 'ThemeSelector', component: <ThemeSelector10 /> },
  { id: 'UpdatesScreen11', label: 'UpdatesScreen', component: <UpdatesScreen11 /> },
  { id: 'UpdateCard12', label: 'UpdateCard', component: <UpdateCard12 /> },
  { id: 'UpdateStatusCard13', label: 'UpdateStatusCard', component: <UpdateStatusCard13 /> },
  { id: 'UsersScreen14', label: 'UsersScreen', component: <UsersScreen14 /> },
  { id: 'BotControllerCard15', label: 'BotControllerCard', component: <BotControllerCard15 /> },
  { id: 'UserCard16', label: 'UserCard', component: <UserCard16 /> },
  { id: 'UserFilterBar17', label: 'UserFilterBar', component: <UserFilterBar17 /> },
  { id: 'WalletScreen18', label: 'WalletScreen', component: <WalletScreen18 /> },
  { id: 'GatewayConfigCard19', label: 'GatewayConfigCard', component: <GatewayConfigCard19 /> },
  { id: 'ReceiveMoneyCard20', label: 'ReceiveMoneyCard', component: <ReceiveMoneyCard20 /> },
  { id: 'RechargeCard21', label: 'RechargeCard', component: <RechargeCard21 /> }
];

export default function App() {
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);

  const currentScreen = SCREENS[activeScreenIndex] || SCREENS[0];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Cabecera del King System */}
      <View style={styles.header}>
        <Text style={styles.title}>👑 KING SYSTEM - CORE</Text>
        <Text style={styles.subtitle}>Módulos Activos Enlazados: {SCREENS.length}</Text>
      </View>

      {/* Selector Dinámico de Pantallas */}
      <View style={styles.navContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.navScroll}>
          {SCREENS.map((scr, idx) => (
            <TouchableOpacity 
              key={scr.id}
              style={[styles.navTab, activeScreenIndex === idx && styles.navTabActive]}
              onPress={() => setActiveScreenIndex(idx)}
            >
              <Text style={[styles.navText, activeScreenIndex === idx && styles.navTextActive]} numberOfLines={1}>
                {scr.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Renderizado de la Pantalla Activa */}
      <ScrollView contentContainerStyle={styles.screenContainer}>
        <View style={styles.wrapper}>
          {currentScreen ? currentScreen.component : (
            <Text style={styles.errorText}>Cargando módulo de sistema...</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  header: { padding: 14, backgroundColor: '#0f172a', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#1e293b' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#38bdf8', letterSpacing: 0.5 },
  subtitle: { fontSize: 11, color: '#94a3b8', marginTop: 2 },
  navContainer: { backgroundColor: '#0f172a', borderBottomWidth: 1, borderBottomColor: '#1e293b' },
  navScroll: { paddingHorizontal: 10, paddingVertical: 8 },
  navTab: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#1e293b', borderRadius: 6, marginRight: 8, justifyContent: 'center' },
  navTabActive: { backgroundColor: '#0284c7' },
  navText: { color: '#94a3b8', fontSize: 11, fontWeight: '600' },
  navTextActive: { color: '#ffffff' },
  screenContainer: { padding: 16, flexGrow: 1 },
  wrapper: { backgroundColor: '#0f172a', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#1e293b', minHeight: 400 },
  errorText: { color: '#ef4444', textAlign: 'center', marginTop: 20 }
});
