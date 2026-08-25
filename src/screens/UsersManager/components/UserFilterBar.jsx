import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function UserFilterBar({ searchText, setSearchText, activeFilter, setActiveFilter }) {
  const filters = ['TODOS', 'ACTIVE', 'PENDING', 'BLOCKED'];

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.searchInput}
        placeholder="🔍 Buscar por username o ID Telegram..."
        placeholderTextColor="#555"
        value={searchText}
        onChangeText={setSearchText}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
        {filters.map(f => (
          <TouchableOpacity 
            key={f} 
            style={[styles.chip, activeFilter === f && styles.chipActive]}
            onPress={() => setActiveFilter(f)}
          >
            <Text style={[styles.chipText, activeFilter === f && styles.chipTextActive]}>🏷️ {f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  searchInput: { backgroundColor: '#121622', color: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#1c2333', fontSize: 13, marginBottom: 10 },
  chipScroll: { flexDirection: 'row' },
  chip: { backgroundColor: '#121622', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, borderWidth: 1, borderColor: '#1c2333', marginRight: 8 },
  chipActive: { backgroundColor: '#00e676', borderColor: '#00e676' },
  chipText: { color: '#6b7a99', fontSize: 11, fontWeight: 'bold' },
  chipTextActive: { color: '#000' }
});
