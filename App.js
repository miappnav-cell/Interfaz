import React, { useState } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'expo-status-bar';
import SecurityScreen from './src/screens/SecurityScreen';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {!isAuthenticated ? (
        <SecurityScreen onAuthenticated={() => setIsAuthenticated(true)} />
      ) : (
        <View style={styles.dashboardContainer}>
          <Text style={styles.welcomeText}>🚀 ACCESO CONCEDIDO A KING SYSTEM</Text>
          <Text style={styles.subText}>Cargando nodos y motor de Render...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050B14',
  },
  dashboardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#050B14',
    padding: 20,
  },
  welcomeText: {
    color: '#00F0FF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    color: '#93C5FD',
    fontSize: 14,
    textAlign: 'center',
  },
});
