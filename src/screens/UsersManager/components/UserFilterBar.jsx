import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import notificationSoundService from '../../../services/notificationSoundService';

export const UserFilterBar = ({ onFilterChange }) => {
  const [filter, setFilter] = useState('ALL');

  const handleSelect = (selected) => {
    notificationSoundService.playSoundEffect('click');
    setFilter(selected);
    if (onFilterChange) onFilterChange(selected);
  };

  return (
    <View style={styles.container}>
      {['ALL', 'ACTIVE', 'INACTIVE'].map((type) => (
        <TouchableOpacity
          key={type}
          style={[styles.btn, filter === type && styles.activeBtn]}
          onPress={() => handleSelect(type)}
        >
          <Text style={[styles.text, filter === type && styles.activeText]}>{type}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12 },
  btn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, backgroundColor: '#0a0a14', borderWidth: 1, borderColor: '#1a1a2e' },
  activeBtn: { backgroundColor: '#00ffff22', borderColor: '#00ffff' },
  text: { color: '#6e6e8e', fontSize: 12, fontWeight: 'bold' },
  activeText: { color: '#00ffff' }
});

export default UserFilterBar;
