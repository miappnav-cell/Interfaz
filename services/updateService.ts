import * as Updates from 'expo-updates';

/**
 * Consulta al servidor si hay una nueva versión disponible.
 */
export async function checkServerForUpdate(): Promise<boolean> {
  if (__DEV__) return false; // Evita falsos positivos en desarrollo local
  try {
    const update = await Updates.checkForUpdateAsync();
    return update.isAvailable;
  } catch (error) {
    console.error('Error al verificar actualización:', error);
    return false;
  }
}

/**
 * Descarga el paquete del servidor y aplica la recarga de la app.
 */
export async function downloadAndApplyUpdate(onProgress: (progress: number) => void): Promise<void> {
  try {
    onProgress(0.3);
    await Updates.fetchUpdateAsync();
    onProgress(1.0);
    
    // Breve pausa para completar la barra visual y reiniciar
    setTimeout(async () => {
      await Updates.reloadAsync();
    }, 800);
  } catch (error) {
    console.error('Error al aplicar la actualización:', error);
    throw error;
  }
}
