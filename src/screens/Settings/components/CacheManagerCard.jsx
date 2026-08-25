import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { cacheService } from '../../../services/cacheService';

export default function CacheManagerCard() {
  const [stats, setStats] = useState({ totalKeys: 0, hits: 0, misses: 0 });

  const refreshStats = () => {
    setStats(cacheService.getStats());
  };

  useEffect(() => {
    refreshStats();
  }, []);

  const handleClear = () => {
    cacheService.clear();
    refreshStats();
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>💾 GESTOR DE CACHÉ Y MEMORIA</Text>
      <View style={styles.row}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{stats.totalKeys}</Text>
          <Text style={styles.statLabel}>Llaves Activas</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumberHits}>{stats.hits}</Text>
          <Text style={styles.statLabel}>Hits</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumberMisses}>{stats.misses}</Text>
          <Text style={styles.statLabel}>Misses</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.purgeBtn} onPress={handleClear}>
        <Text style={styles.purgeText}>🗑️ PURGAR CACHÉ DE MEMORIA</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#121622', padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#1c2333', marginBottom: 12 },
  title: { color: '#00b0ff', fontSize: 11, fontWeight: 'bold', marginBottom: 10, letterSpacing: 0.5 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  statBox: { flex: 1, backgroundColor: '#090a0f', padding: 8, borderRadius: 6, alignItems: 'center', marginHorizontal: 2, borderWidth: 1, borderColor: '#1c2333' },
  statNumber: { color: '#00b0ff', fontSize: 14, fontWeight: 'bold' },
  statNumberHits: { color: '#00e676', fontSize: 14, fontWeight: 'bold' },
  statNumberMisses: { color: '#ff5252', fontSize: 14, fontWeight: 'bold' },
  statLabel: { color: '#666', fontSize: 9, marginTop: 2 },
  purgeBtn: { backgroundColor: '#1c2333', padding: 10, borderRadius: 6, alignItems: 'center', borderWidth: 1, borderColor: '#ff5252' },
  purgeText: { color: '#ff5252', fontSize: 10, fontWeight: 'bold' }
});
