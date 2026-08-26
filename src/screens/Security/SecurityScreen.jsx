import db from '../../config/db';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Constellation3D from '../../components/Constellation3D';
import pool from '../../config/db';

export default function SecurityScreen() {
  const [nodeStatus, setNodeStatus] = useState({
    render: 'ONLINE',
    postgres: 'DISCONNECTED',
    security: 'ENCRYPTED'
  });

  const testPostgresNode = async () => {
    try {
      const res = await pool.query('SELECT NOW()');
      if (res.rows.length > 0) {
        setNodeStatus(prev => ({ ...prev, postgres: 'ONLINE' }));
        Alert.alert('✅ NODO POSTGRESQL', `Conexión exitosa a Render DB.\nTimestamp: ${res.rows[0].now}`);
      }
    } catch (error) {
      setNodeStatus(prev => ({ ...prev, postgres: 'ERROR' }));
      Alert.alert('❌ ERROR DE NODO', `No se pudo conectar a PostgreSQL:\n${error.message}`);
    }
  };

  const toggleSecurityNode = () => {
    const nextState = nodeStatus.security === 'ENCRYPTED' ? 'BYPASS_CHECK' : 'ENCRYPTED';
    setNodeStatus(prev => ({ ...prev, security: nextState }));
  };

  return (
    <View style={styles.mainContainer}>
      <Constellation3D />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>NODO CENTRAL KINGSYSTEM</Text>

        {/* NODO DB POSTGRESQL */}
        <View style={styles.nodeCard}>
          <View style={styles.nodeHeader}>
            <Text style={styles.nodeName}>🗄️ BASE DE DATOS POSTGRESQL</Text>
            <Text style={[styles.statusBadge, nodeStatus.postgres === 'ONLINE' ? styles.bgSuccess : styles.bgDanger]}>
              {nodeStatus.postgres}
            </Text>
          </View>
          <Text style={styles.nodeDesc}>Host: dpg-da6uio8n74is73emfgcg-a (Ohio - US East)</Text>
          <TouchableOpacity style={styles.actionBtn} onPress={testPostgresNode}>
            <Text style={styles.actionBtnText}>PROBAR CONEXIÓN SQL</Text>
          </TouchableOpacity>
        </View>

        {/* NODO DE SEGURIDAD Y ENCRIPTACIÓN */}
        <View style={styles.nodeCard}>
          <View style={styles.nodeHeader}>
            <Text style={styles.nodeName}>🛡️ NODO DE SEGURIDAD AES-256</Text>
            <Text style={[styles.statusBadge, styles.bgSuccess]}>{nodeStatus.security}</Text>
          </View>
          <Text style={styles.nodeDesc}>Encriptación de paquetes de red y credenciales de bot</Text>
          <TouchableOpacity style={styles.actionBtn} onPress={toggleSecurityNode}>
            <Text style={styles.actionBtnText}>CONMUTAR MODO NODO</Text>
          </TouchableOpacity>
        </View>

        {/* NODO API RENDER CLOUD */}
        <View style={styles.nodeCard}>
          <View style={styles.nodeHeader}>
            <Text style={styles.nodeName}>🌐 SERVIDOR RENDER CLOUD</Text>
            <Text style={[styles.statusBadge, styles.bgSuccess]}>{nodeStatus.render}</Text>
          </View>
          <Text style={styles.nodeDesc}>Instancia: render-api-backend.onrender.com</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#05070c' },
  scrollContent: { padding: 18, paddingBottom: 40 },
  title: { color: '#00b0ff', fontSize: 14, fontWeight: '900', marginBottom: 18, letterSpacing: 1 },
  nodeCard: { backgroundColor: 'rgba(18, 22, 34, 0.85)', padding: 18, borderRadius: 10, borderWidth: 1, borderColor: '#1c2333', marginBottom: 16 },
  nodeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  nodeName: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  nodeDesc: { color: '#8b9bb4', fontSize: 11, marginBottom: 14 },
  statusBadge: { fontSize: 9, fontWeight: 'bold', paddingVertical: 3, paddingHorizontal: 8, borderRadius: 4, overflow: 'hidden' },
  bgSuccess: { backgroundColor: 'rgba(0, 230, 118, 0.15)', color: '#00e676', borderWidth: 1, borderColor: '#00e676' },
  bgDanger: { backgroundColor: 'rgba(255, 82, 82, 0.15)', color: '#ff5252', borderWidth: 1, borderColor: '#ff5252' },
  actionBtn: { backgroundColor: '#1c2333', padding: 12, borderRadius: 6, alignItems: 'center', borderWidth: 1, borderColor: '#00b0ff' },
  actionBtnText: { color: '#00b0ff', fontSize: 11, fontWeight: 'bold' }
});
