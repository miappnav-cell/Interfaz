import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

export default function ReceiveMoneyCard({ balance, onProcessCard, onReportDeposit, isProcessing }) {
  const [method, setMethod] = useState('CARD'); // 'CARD' | 'DEPOSIT'
  const [amount, setAmount] = useState('');
  const [refNumber, setRefNumber] = useState('');

  const handleAction = () => {
    if (method === 'CARD') {
      onProcessCard(amount);
    } else {
      onReportDeposit(amount, refNumber);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.label}>SALDO TOTAL DISPONIBLE</Text>
      <Text style={styles.balanceText}>${balance.toFixed(2)} USD</Text>

      {/* Selector de Método de Recepción */}
      <Text style={styles.subLabel}>SELECCIONAR MÉTODO DE RECEPCIÓN</Text>
      <View style={styles.tabRow}>
        <TouchableOpacity 
          style={[styles.tabBtn, method === 'CARD' && styles.tabActive]} 
          onPress={() => setMethod('CARD')}
        >
          <Text style={[styles.tabText, method === 'CARD' && styles.tabTextActive]}>💳 TARJETA EN LÍNEA</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabBtn, method === 'DEPOSIT' && styles.tabActive]} 
          onPress={() => setMethod('DEPOSIT')}
        >
          <Text style={[styles.tabText, method === 'DEPOSIT' && styles.tabTextActive]}>🏦 DEPÓSITO / TRANSF.</Text>
        </TouchableOpacity>
      </View>

      {/* Formulario según el Método */}
      {method === 'CARD' ? (
        <View style={styles.formBox}>
          <Text style={styles.inputLabel}>MONTO A RECIBIR ($)</Text>
          <TextInput 
            style={styles.input}
            keyboardType="numeric"
            placeholder="0.00"
            placeholderTextColor="#555"
            value={amount}
            onChangeText={setAmount}
          />
          <TouchableOpacity 
            style={[styles.submitBtn, isProcessing && styles.btnDisabled]} 
            onPress={handleAction}
            disabled={isProcessing}
          >
            <Text style={styles.submitBtnText}>
              {isProcessing ? 'GENERANDO PASARELA...' : '⚡ GENERAR COBRO POR TARJETA'}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.formBox}>
          <View style={styles.bankDataCard}>
            <Text style={styles.bankTitle}>DATOS BANCARIOS DEL SISTEMA</Text>
            <Text style={styles.bankText}>• Banco: Banco Central / Operativo</Text>
            <Text style={styles.bankText}>• Cuenta / CLABE: 0123456789012345</Text>
            <Text style={styles.bankText}>• Titular: King System Bot LLC</Text>
          </View>

          <Text style={styles.inputLabel}>MONTO DEPOSITADO ($)</Text>
          <TextInput 
            style={styles.input}
            keyboardType="numeric"
            placeholder="0.00"
            placeholderTextColor="#555"
            value={amount}
            onChangeText={setAmount}
          />

          <Text style={styles.inputLabel}>Nº DE REFERENCIA / COMPROBANTE</Text>
          <TextInput 
            style={styles.input}
            placeholder="Ej. REF-9832741"
            placeholderTextColor="#555"
            value={refNumber}
            onChangeText={setRefNumber}
          />

          <TouchableOpacity 
            style={[styles.submitBtn, isProcessing && styles.btnDisabled]} 
            onPress={handleAction}
            disabled={isProcessing}
          >
            <Text style={styles.submitBtnText}>
              {isProcessing ? 'ENVIANDO REPORTE...' : '📩 REGISTRAR COMPROBANTE DE DEPÓSITO'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#121622', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#1c2333', marginBottom: 15 },
  label: { color: '#6b7a99', fontSize: 10, fontWeight: 'bold', letterSpacing: 1 },
  balanceText: { color: '#00e676', fontSize: 30, fontWeight: '900', marginVertical: 6 },
  subLabel: { color: '#00b0ff', fontSize: 10, fontWeight: 'bold', letterSpacing: 1, marginTop: 10, marginBottom: 8 },
  tabRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  tabBtn: { flex: 0.48, paddingVertical: 10, borderRadius: 6, borderWidth: 1, borderColor: '#29354d', alignItems: 'center', backgroundColor: '#090a0f' },
  tabActive: { backgroundColor: '#00b0ff', borderColor: '#00b0ff' },
  tabText: { color: '#aaa', fontSize: 11, fontWeight: 'bold' },
  tabTextActive: { color: '#000' },
  formBox: { marginTop: 5 },
  inputLabel: { color: '#6b7a99', fontSize: 10, fontWeight: 'bold', marginBottom: 4 },
  input: { backgroundColor: '#090a0f', color: '#fff', padding: 12, borderRadius: 6, borderWidth: 1, borderColor: '#1c2333', fontSize: 13, marginBottom: 10 },
  bankDataCard: { backgroundColor: '#090a0f', padding: 10, borderRadius: 6, borderWidth: 1, borderColor: '#00e676', marginBottom: 12 },
  bankTitle: { color: '#00e676', fontSize: 11, fontWeight: 'bold', marginBottom: 4 },
  bankText: { color: '#ccc', fontSize: 11 },
  submitBtn: { backgroundColor: '#00e676', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 4 },
  btnDisabled: { opacity: 0.5 },
  submitBtnText: { color: '#000', fontWeight: 'bold', fontSize: 11, letterSpacing: 1 }
});
