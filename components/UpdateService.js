export const checkForUpdates = async () => {
  try {
    // Controlador de tiempo de espera (timeout) para que la app no se quede colgada
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch('https://interfaz-iml8.onrender.com/version', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Error del servidor: ${response.status}`);
    }

    const data = await response.json();
    return data; // Espera un JSON del tipo: { version: "1.0.1", updateUrl: "..." }
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log("La conexión con Render tardó demasiado.");
    } else {
      console.log("Error al conectar con Render:", error.message);
    }
    return null;
  }
};
