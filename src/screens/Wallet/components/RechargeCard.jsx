import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

export default function RechargeCard({ balance, amount, setAmount, selectedGateway, setSelectedGateway, onProcessPayment, isProcessing }) {
  const gateways = ['MercadoPago', 'Stripe', 'Transferencia'];

  return (
    <View style={styles.card}>
      <Text style={styles.label}>SALDO DISPONIBLE PARA VIAJES</Text>
      <Text style={styles.balanceText}>${balance.toFixed(2)} USD</Text>

      <Text style={styles.subLabel}>SELECCIONAR PASARELA DE PAGO</Text>
      <View style={styles.gatewayRow}>
        {gateways.map(g => (
          <TouchableOpacity 
            key={g} 
            style={[styles.gatewayBtn, selectedGateway === g && styles.gatewayActive]}
            onPress={() => setSelectedGateway(g)}
          >
            <Text style={[styles.gatewayText, selectedGateway === g && styles.gatewayTextActive]}>{g}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subLabel}>MONTO A RECARGAR ($)</Text>
      <TextInput 
        style={styles.input} 
        keyboardType="numeric"
        placeholder="Ej. 10.00" 
        placeholderTextColor="#555"
        value={amount}
        onChangeText={setAmount}
      />

      <TouchableOpacity 
        style={[styles.payBtn, isProcessing && styles.payBtnDisabled]} 
        onPress={onProcessPayment}
        disabled={isProcessing}
      >
        <Text style={styles.payBtnText}>
          {isProcessing ? 'PROCESANDO CONECTOR...' : `RECARGAR VÍA ${selectedGateway.toUpperCase()}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#121622', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#1c2333', marginBottom: 15 },
  label: { color: '#6b7a99', fontSize: 10, fontWeight: 'bold', letterSpacing: 1 },
  balanceText: { color: '#00e676', fontSize: 28, fontWeight: '900', marginVertical: 8 },
  subLabel: { color: '#00b0ff', fontSize: 10, fontWeight: 'bold', letterSpacing: 1, marginTop: 12, marginBottom: 8 },
  gatewayRow: { flexDirection: 'row', justifyContent: 'space-between' },
  gatewayBtn: { flex: 0.31, paddingVertical: 8, borderRadius: 6, borderWidth: 1, borderColor: '#29354d', alignItems: 'center' },
  gatewayActive: { backgroundColor: '#00b0ff', borderColor: '#00b0ff' },
  gatewayText: { color: '#aaa', fontSize: 11 },
  gatewayTextActive: { color: '#000', fontWeight: 'bold' },
  input: { backgroundColor: '#090a0f', color: '#fff', padding: 12, borderRadius: 6, borderWidth: 1, borderColor: '#1c2333', fontSize: 14, marginBottom: 12 },
  payBtn: { backgroundColor: '#00e676', padding: 14, borderRadius: 8, alignItems: 'center' },
  payBtnDisabled: { opacity: 0.5 },
  payBtnText: { color: '#000', fontWeight: 'bold', fontSize: 12, letterSpacing: 1 }
});
