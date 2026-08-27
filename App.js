import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import SecurityScreen from './src/screens/SecurityScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import { notificationService } from './src/services/notificationService';
import { soundService } from './src/services/soundService';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [systemLoaded, setSystemLoaded] = useState(false);

  useEffect(() => {
    // Inicializar servicios del sistema al arrancar
    const initSystem = async () => {
      try {
        await notificationService.configure();
        await soundService.preloadSounds?.();
        setSystemLoaded(true);
      } catch (e) {
        console.log('Error inicializando servicios al arrancar:', e);
        setSystemLoaded(true);
      }
    };
    initSystem();
  }, []);

  // Callback cuando la pantalla de seguridad valida con éxito
  const handleAuthenticationSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#050B14" />
      
      {!isAuthenticated ? (
        // Fase 1: Pantalla de Seguridad / Biometría al iniciar
        <SecurityScreen onAuthenticated={handleAuthenticationSuccess} />
      ) : (
        // Fase 2: Pantalla Principal (Dashboard Estelar) conectada al Backend
        <DashboardScreen />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050B14',
  },
});
