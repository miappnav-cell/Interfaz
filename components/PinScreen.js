import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Vibration } from 'react-native';

export default function PinScreen({ onCorrectPin }) {
  const [pin, setPin] = useState('');
  const correctPin = '1234';

  const handlePress = (num) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      
      if (newPin.length === 4) {
        if (newPin === correctPin) {
          setTimeout(() => onCorrectPin(), 300);
        } else {
          Vibration.vibrate(400);
          setTimeout(() => setPin(''), 400);
        }
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingrese PIN de Acceso</Text>
      
      <View style={styles.dotsContainer}>
        {[0, 1, 2, 3].map((i) => (
          <View key={i} style={[styles.dot, pin.length > i && styles.dotFilled]} />
        ))}
      </View>

      <View style={styles.keypad}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'].map((item, index) => {
          if (item === '') return <View key={index} style={styles.keyEmpty} />;
          return (
            <TouchableOpacity
              key={index}
              style={styles.key}
              onPress={() => (item === '⌫' ? handleDelete() : handlePress(item))}
            >
              <Text style={styles.keyText}>{item}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#05050f', justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 30, letterSpacing: 1 },
  dotsContainer: { flexDirection: 'row', marginBottom: 50 },
  dot: { width: 16, height: 16, borderRadius: 8, borderWidth: 2, borderColor: '#d4af37', marginHorizontal: 7 },
  dotFilled: { backgroundColor: '#d4af37' },
  keypad: { width: '80%', maxWidth: 300, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  key: { width: '30%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a2e', borderRadius: 40, marginBottom: 15 },
  keyEmpty: { width: '30%', aspectRatio: 1 },
  keyText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
});
