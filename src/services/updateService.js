const RENDER_API = 'https://render-api-backend.onrender.com';

export const updateService = {
  checkVersion: async (currentVersion = '2.4.0') => {
    try {
      const response = await fetch(RENDER_API, { method: 'GET' });
      
      let data = {};
      const responseText = await response.text();
      
      try {
        data = JSON.parse(responseText);
      } catch (_e) {
        // Manejo de respuesta en texto plano o HTML del servidor activo
        if (response.ok) {
          data = { version: currentVersion, notes: 'Servidor Render activo y respondiendo.' };
        }
      }

      const remoteVersion = data.version || currentVersion;
      return {
        hasUpdate: remoteVersion !== currentVersion,
        latestVersion: remoteVersion,
        notes: data.notes || 'Sistema sincronizado con la nube de Render.',
        downloadUrl: data.downloadUrl || ''
      };
    } catch (_error) {
      return {
        hasUpdate: false,
        error: 'Conexión intermitente. Reintentando consulta con el backend...'
      };
    }
  }
};
