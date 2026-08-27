import React, { useEffect, useState, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Animated, 
  Dimensions, 
  TouchableOpacity, 
  Vibration 
} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { apiService } from '../services/apiService';

const { width, height } = Dimensions.get('window');

export default function SecurityScreen({ onAuthenticated }) {
  const [animationFinished, setAnimationFinished] = useState(false);
  const [authStatus, setAuthStatus] = useState('Iniciando constelación estelar...');
  
  // Animaciones para las estrellas (Efecto 3D / Parallax)
  const fadeAnim = useRef(new Animated.Value(0)).setValue(0);
  const stars = useRef([...Array(25)].map(() => ({
    top: new Animated.Value(Math.random() * height),
    left: new Animated.Value(Math.random() * width),
    scale: new Animated.Value(Math.random() * 0.8 + 0.2),
    opacity: new Animated.Value(Math.random() * 0.7 + 0.3)
  }))).current;

  useEffect(() => {
    // 1. Ejecutar animación de constelación estelar
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Movimiento continuo de las estrellas (Simulación 3D de profundidad)
    stars.forEach(star => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(star.top, {
            toValue: Math.random() * height,
            duration: 3000 + Math.random() * 2000,
            useNativeDriver: false,
          }),
          Animated.timing(star.left, {
            toValue: Math.random() * width,
            duration: 3000 + Math.random() * 2000,
            useNativeDriver: false,
          })
        ])
      ).start();
    });

    // 2. Temporizador para dar paso al login tras 4 segundos de animación estelar
    const timer = setTimeout(() => {
      setAnimationFinished(true);
      setAuthStatus('Seguridad lista. Verifique su identidad.');
      handleBiometricAuth();
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // Función de Autenticación Biométrica y Servidor
  const handleBiometricAuth = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        setAuthStatus('Dispositivo sin soporte biométrico. Acceso manual habilitado.');
        return;
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        setAuthStatus('No hay huellas registradas en el dispositivo.');
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'King System - Autenticación de Acceso Maestro',
        fallbackLabel: 'Usar contraseña',
      });

      if (result.success) {
        Vibration.v50; // Respuesta háptica
        setAuthStatus('Acceso concedido. Sincronizando con Render...');
        
        // Notificar al backend de Render el acceso exitoso
        await apiService.executeCommand('GLOBAL', 'LOGIN_SUCCESS', { timestamp: new Date().toISOString() });
        
        setTimeout(() => {
          onAuthenticated(); // Pasa a la siguiente pantalla (Dashboard)
        }, 1000);
      } else {
        setAuthStatus('Autenticación fallida. Toque para reintentar.');
      }
    } catch (error) {
      setAuthStatus('Error en el módulo de seguridad.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Fondo de Constelaciones Estelares 3D */}
      {stars.map((star, index) => (
        <Animated.View
          key={index}
          style={[
            styles.star,
            {
              top: star.top,
              left: star.left,
              transform: [{ scale: star.scale }],
              opacity: star.opacity,
            },
          ]}
        />
      ))}

      {/* Capa Central de Interfaz */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>👑 KING SYSTEM</Text>
        <Text style={styles.subtitle}>INTERFAZ V2.4.0</Text>

        <View style={styles.card}>
          <Text style={styles.statusText}>{authStatus}</Text>

          {animationFinished && (
            <TouchableOpacity style={styles.button} onPress={handleBiometricAuth}>
              <Text style={styles.buttonText}>🔒 VALIDAR IDENTIDAD</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050B14',
    justifyContent: 'center',
    alignItems: 'center',
  },
  star: {
    position: 'absolute',
    width: 4,
    height: 4,
    backgroundColor: '#00F0FF',
    borderRadius: 2,
    shadowColor: '#00F0FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  contentContainer: {
    zIndex: 10,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#00F0FF',
    letterSpacing: 4,
    marginBottom: 40,
  },
  card: {
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    borderWidth: 1,
    borderColor: '#1E3A8A',
    padding: 25,
    borderRadius: 16,
    width: width * 0.85,
    alignItems: 'center',
    shadowColor: '#00F0FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  statusText: {
    color: '#93C5FD',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1,
  },
});
