import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import ReceiveMoneyCard from './components/ReceiveMoneyCard';
import GatewayConfigCard from './components/GatewayConfigCard';
import { apiService } from '../../services/apiService';

export default function WalletScreen() {
  const [balance, setBalance] = useState(150.00);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [statusMsg, setStatusMsg] = useState('Listo para procesar recepción de dinero.');
  const [incomes, setIncomes] = useState([
    { id: 1, method: 'TARJETA (STRIPE)', ref: 'TX-882193', amount: 50.00, date: '2026-08-25 10:15', status: 'COMPLETADO' },
    { id: 2, method: 'DEPÓSITO BANCARIO', ref: 'REF-442109', amount: 100.00, date: '2026-08-24 18:40', status: 'PENDIENTE DE REVISIÓN' }
  ]);

  const handleProcessCard = (amount) => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) {
      setStatusMsg('⚠️ Ingrese un monto válido mayor a 0.');
      return;
    }

    setIsProcessing(true);
    setStatusMsg('💳 Conectando con la pasarela de pago...');

    setTimeout(() => {
      const newBal = balance + val;
      setBalance(newBal);
      setIncomes([
        { id: Date.now(), method: 'TARJETA EN LÍNEA', ref: `TX-${Math.floor(Math.random() * 900000 + 100000)}`, amount: val, date: new Date().toLocaleString(), status: 'COMPLETADO' },
        ...incomes
      ]);
      setIsProcessing(false);
      setStatusMsg(`✅ Pago con tarjeta aprobado. Acreditado: +$${val.toFixed(2)}`);
    }, 1800);
  };

  const handleReportDeposit = (amount, refNumber) => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0 || !refNumber.trim()) {
      setStatusMsg('⚠️ Ingrese el monto y la referencia del comprobante.');
      return;
    }

    setIsProcessing(true);
    setStatusMsg('🏦 Registrando comprobante de depósito...');

    setTimeout(() => {
      setIncomes([
        { id: Date.now(), method: 'DEPÓSITO BANCARIO', ref: refNumber, amount: val, date: new Date().toLocaleString(), status: 'PENDIENTE DE REVISIÓN' },
        ...incomes
      ]);
      setIsProcessing(false);
      setStatusMsg(`⏳ Comprobante ${refNumber} recibido. Pendiente de validación.`);
    }, 1200);
  };

  const handleSaveConfig = async (config) => {
    setIsProcessing(true);
    const res = await apiService.saveGatewayConfig(config);
    setIsProcessing(false);
    setStatusMsg(`✅ ${res.message}`);
    setShowConfig(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>RECEPCIÓN DE DINERO</Text>
        <TouchableOpacity style={styles.configToggleBtn} onPress={() => setShowConfig(!showConfig)}>
          <Text style={styles.configToggleText}>{showConfig ? '✖️ CERRAR' : '⚙️ CLAVES'}</Text>
        </TouchableOpacity>
      </View>

      {showConfig ? (
        <GatewayConfigCard onSaveConfig={handleSaveConfig} isSaving={isProcessing} />
      ) : (
        <ReceiveMoneyCard 
          balance={balance}
          onProcessCard={handleProcessCard}
          onReportDeposit={handleReportDeposit}
          isProcessing={isProcessing}
        />
      )}

      <View style={styles.statusBox}>
        <Text style={styles.statusText}>{statusMsg}</Text>
      </View>

      <Text style={styles.sectionTitle}>HISTORIAL DE INGRESOS Y DEPÓSITOS</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {incomes.map(item => (
          <View key={item.id} style={styles.incomeCard}>
            <View>
              <Text style={styles.incomeMethod}>{item.method}</Text>
              <Text style={styles.incomeRef}>Ref: {item.ref} • {item.date}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.incomeAmount}>+${item.amount.toFixed(2)}</Text>
              <Text style={[styles.statusBadge, item.status === 'COMPLETADO' ? styles.statusOk : styles.statusPending]}>
                {item.status}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#090a0f', padding: 18 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '900', letterSpacing: 1 },
  configToggleBtn: { backgroundColor: '#121622', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, borderWidth: 1, borderColor: '#00b0ff' },
  configToggleText: { color: '#00b0ff', fontSize: 11, fontWeight: 'bold' },
  statusBox: { backgroundColor: '#121622', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#1c2333', marginBottom: 15 },
  statusText: { color: '#00e676', fontSize: 12, fontWeight: '600' },
  sectionTitle: { color: '#6b7a99', fontSize: 11, fontWeight: 'bold', letterSpacing: 1, marginBottom: 10 },
  incomeCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#121622', padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#1c2333', marginBottom: 8 },
  incomeMethod: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  incomeRef: { color: '#555', fontSize: 10, marginTop: 2 },
  incomeAmount: { color: '#00e676', fontSize: 15, fontWeight: '900' },
  statusBadge: { fontSize: 9, fontWeight: 'bold', marginTop: 2 },
  statusOk: { color: '#00e676' },
  statusPending: { color: '#ffb74d' }
});
