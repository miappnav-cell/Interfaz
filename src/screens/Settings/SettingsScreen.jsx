import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Ajustes del Sistema</Text>
        <Text style={styles.description}>Configuración general de KingSystem Interfaz v2.4.0</Text>
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8
  },
  description: {
    fontSize: 14,
    color: '#8e8ea0'
  }
});

export default SettingsScreen;
