import * as Updates from 'expo-updates';
import { apiService } from './apiService';
import { ENDPOINTS } from '../api/endpoints';

export const updateService = {
  async checkForUpdatesAndApply() {
    try {
      console.log('🔍 Verificando actualizaciones OTA en la nube...');
      
      // Intentar actualización OTA de Expo
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        console.log('📥 Descargando actualización OTA...');
        await Updates.fetchUpdateAsync();
        alert('✨ ¡Nueva versión OTA instalada! Reiniciando sistema...');
        await Updates.reloadAsync();
        return { success: true, message: 'OTA aplicada con éxito.' };
      }

      // Si no hay OTA de Expo, consultar al backend en Render
      const response = await apiService.get(ENDPOINTS.UPDATES + '/check');
      return response;
    } catch (error) {
      console.log('⚠️ Red o servidor local:', error.message);
      return { success: false, message: 'Sistema operando en la última versión estable.' };
    }
  }
};
