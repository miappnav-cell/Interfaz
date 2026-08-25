import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Switch, Alert } from 'react-native';

export default function SecurityScreen() {
  const [biometrics, setBiometrics] = useState(true);
  const [pin, setPin] = useState('');

  const savePin = () => {
    Alert.alert("Seguridad", "PIN maestro actualizado correctamente.");
    setPin('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Seguridad y Acceso</Text>

      <View style={styles.box}>
        <Text style={styles.label}>Establecer PIN Maestro de 4 Dígitos</Text>
        <TextInput 
          style={styles.input} 
          secureTextEntry 
          keyboardType="numeric" 
          maxLength={4} 
          value={pin}
          onChangeText={setPin}
          placeholder="****"
          placeholderTextColor="#555"
        />
        <TouchableOpacity style={styles.btn} onPress={savePin}>
          <Text style={styles.btnText}>Guardar PIN</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Autenticación por Biometría / Huella</Text>
        <Switch value={biometrics} onValueChange={setBiometrics} trackColor={{ true: '#00e676' }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  header: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  box: { backgroundColor: '#111', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#222', marginBottom: 20 },
  label: { color: '#aaa', fontSize: 13, marginBottom: 10 },
  input: { backgroundColor: '#1e1e1e', color: '#fff', fontSize: 20, textAlign: 'center', borderRadius: 5, padding: 10, marginBottom: 15 },
  btn: { backgroundColor: '#1976d2', padding: 12, borderRadius: 5, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15 },
  switchLabel: { color: '#fff', fontSize: 15 }
});
