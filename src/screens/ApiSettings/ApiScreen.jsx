import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export const ApiScreen = () => {
  const [apiStatus, setApiStatus] = useState('ONLINE');

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Configuración de API & Endpoints</Text>
        <Text style={styles.subtitle}>Estado actual: {apiStatus}</Text>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => setApiStatus('RE-CHECKING...')}
        >
          <Text style={styles.buttonText}>Comprobar Estado de Backend</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a12',
    padding: 16
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00ffff',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 14,
    color: '#a0a0c0',
    marginBottom: 20
  },
  button: {
    backgroundColor: '#1a1a2e',
    borderColor: '#00ffff',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8
  },
  buttonText: {
    color: '#00ffff',
    fontWeight: 'bold'
  }
});

export default ApiScreen;
