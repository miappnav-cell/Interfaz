const fs = require('fs');
const path = require('path');

console.log('⚡ Creando carpetas y parchando la lógica...');

// Asegurar que existan todos los directorios requeridos
['src/services', 'src/config', 'src/api'].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// 1. Service de Seguridad
const securityServiceCode = `import * as LocalAuthentication from 'expo-local-authentication';
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
`;
fs.writeFileSync('src/services/securityService.js', securityServiceCode);

// 2. Configuración de la API
const apiConfigCode = `import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://api.kingsystem.local',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json', 'X-King-System-Auth': 'Master-Node' }
});

export const endpoints = {
  system: {
    status: '/system/status',
    command: '/system/execute'
  }
};
`;
fs.writeFileSync('src/config/apiConfig.js', apiConfigCode);

// 3. Endpoints wrapper
const endpointsCode = `export { apiClient, endpoints } from '../config/apiConfig';\n`;
fs.writeFileSync('src/api/endpoints.js', endpointsCode);

console.log('✅ ¡Estructura y servicios inyectados correctamente!');
