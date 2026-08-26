const RENDER_API = 'https://render-api-backend.onrender.com';

export const updateService = {
  checkVersion: async (currentVersion = '2.4.0') => {
    try {
      const response = await fetch(`${RENDER_API}/version`);
      if (!response.ok) throw new Error('Respuesta no válida del servidor');
      const data = await response.json();
      return {
        hasUpdate: data.version !== currentVersion,
        latestVersion: data.version || '2.4.0',
        notes: data.notes || 'Mejoras de rendimiento y estabilidad.',
        downloadUrl: data.downloadUrl || ''
      };
    } catch (error) {
      return {
        hasUpdate: false,
        error: error.message
      };
    }
  }
};
