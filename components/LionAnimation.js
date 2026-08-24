import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function LionAnimation({ onAnimationComplete }) {
  const [started, setStarted] = useState(false);
  const [phase, setPhase] = useState('walking');
  
  const lionTranslateX = useRef(new Animated.Value(-100)).current;
  const lionScale = useRef(new Animated.Value(1)).current;
  const roarAnim = useRef(new Animated.Value(0)).current;

  const startExperience = () => {
    setStarted(true);
    
    Animated.timing(lionTranslateX, {
      toValue: width / 2 - 50,
      duration: 9000,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      setPhase('transition');
      Animated.parallel([
        Animated.spring(lionScale, { toValue: 2.5, friction: 4, useNativeDriver: true }),
      ]).start(() => {
        setPhase('roar');
        Animated.sequence([
          Animated.timing(roarAnim, { toValue: 1.2, duration: 300, useNativeDriver: true }),
          Animated.timing(roarAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.timing(roarAnim, { toValue: 1.15, duration: 300, useNativeDriver: true }),
          Animated.timing(roarAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
        ]).start(() => {
          setPhase('final');
          setTimeout(() => {
            if (onAnimationComplete) onAnimationComplete();
          }, 1000);
        });
      });
    }, 10000);
  };

  return (
    <View style={styles.nightSky}>
      <View style={styles.moonContainer}>
        <View style={styles.moonGlow} />
        <View style={styles.moon} />
      </View>

      {!started ? (
        <TouchableOpacity style={styles.startButton} onPress={startExperience}>
          <Text style={styles.startText}>🦁 Toca para iniciar la experiencia</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.animationArea}>
          {phase === 'walking' && <Text style={styles.subtitle}>Un león camina en la oscuridad bajo la luz de la luna...</Text>}
          {phase === 'roar' && <Animated.Text style={[styles.roarText, { transform: [{ scale: roarAnim }] }]}>¡ROARRR! ⚡</Animated.Text>}
          {phase === 'final' && <Text style={styles.finalText}>El Guardián de la Noche</Text>}

          <Animated.View style={[styles.lionContainer, { transform: [{ translateX: phase === 'walking' ? lionTranslateX : 0 }, { scale: phase === 'roar' ? roarAnim : lionScale }] }]}>
            <Text style={styles.lionEmoji}>🦁</Text>
          </Animated.View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  nightSky: { flex: 1, backgroundColor: '#05050f', justifyContent: 'center', alignItems: 'center', position: 'relative', width: '100%', height: '100%' },
  moonContainer: { position: 'absolute', top: 80, right: 50, alignItems: 'center', justifyContent: 'center' },
  moon: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#fffae6', shadowColor: '#fff', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, shadowRadius: 30, elevation: 20 },
  moonGlow: { position: 'absolute', width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(255, 250, 230, 0.15)' },
  startButton: { paddingVertical: 15, paddingHorizontal: 30, backgroundColor: '#d4af37', borderRadius: 25 },
  startText: { color: '#000', fontSize: 16, fontWeight: 'bold' },
  animationArea: { flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' },
  lionContainer: { position: 'absolute', bottom: 150 },
  lionEmoji: { fontSize: 80, textAlign: 'center' },
  subtitle: { position: 'absolute', top: 150, color: '#8c92ac', fontSize: 14, fontStyle: 'italic', textAlign: 'center', width: '80%' },
  roarText: { position: 'absolute', top: 180, color: '#ffcc00', fontSize: 32, fontWeight: 'bold' },
  finalText: { position: 'absolute', bottom: 80, color: '#ffffff', fontSize: 22, fontWeight: 'bold', letterSpacing: 2 },
});
