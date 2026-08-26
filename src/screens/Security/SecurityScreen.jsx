import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

export const SecurityScreen = () => {
  const [isEncrypted, setIsEncrypted] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Módulo de Seguridad y Cifrado</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Modo Cifrado Seguro:</Text>
        <Switch 
          value={isEncrypted} 
          onValueChange={setIsEncrypted}
          thumbColor={isEncrypted ? '#00ffff' : '#767577'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0a0a12'
  },
  title: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  label: {
    color: '#a0a0c0',
    fontSize: 16
  }
});

export default SecurityScreen;
