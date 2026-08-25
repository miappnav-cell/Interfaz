import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function UpdateStatusCard({ statusText, isDownloading, progress }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>ESTADO DEL SERVIDOR OTA</Text>
      <Text style={styles.statusText}>{statusText}</Text>
      {isDownloading && (
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#121622', padding: 16, borderRadius: 10, borderWidth: 1, borderColor: '#1c2333', marginBottom: 20 },
  cardTitle: { color: '#00b0ff', fontSize: 11, fontWeight: 'bold', letterSpacing: 1, marginBottom: 8 },
  statusText: { color: '#e0e0e0', fontSize: 13, lineHeight: 18 },
  progressContainer: { height: 6, backgroundColor: '#1a2234', borderRadius: 3, marginTop: 12, overflow: 'hidden' },
  progressBar: { height: '100%', backgroundColor: '#00e676' }
});
