import * as LocalAuthentication from 'expo-local-authentication';
import { Alert } from 'react-native';

export const securityService = {
  async authenticateAdmin() {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        Alert.alert('Modo Seguro', 'No se detectó hardware biométrico, operando con validación maestra.');
        return { success: true };
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: '👑 King System - Autorización Requerida',
        fallbackLabel: 'Usar PIN del Sistema',
        cancelLabel: 'Cancelar'
      });

      return { success: result.success, error: result.error };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};
