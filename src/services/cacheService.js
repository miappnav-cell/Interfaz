const cacheStore = new Map();
let cacheHits = 0;
let cacheMisses = 0;

export const cacheService = {
  // Guardar respuesta con tiempo de expiración en segundos (por defecto 5 min)
  set: (key, data, ttlSeconds = 300) => {
    const expireAt = Date.now() + ttlSeconds * 1000;
    cacheStore.set(key, { data, expireAt });
  },

  // Obtener dato si existe y no ha caducado
  get: (key) => {
    const item = cacheStore.get(key);
    if (!item) {
      cacheMisses++;
      return null;
    }
    if (Date.now() > item.expireAt) {
      cacheStore.delete(key);
      cacheMisses++;
      return null;
    }
    cacheHits++;
    return item.data;
  },

  // Eliminar clave específica
  remove: (key) => {
    return cacheStore.delete(key);
  },

  // Limpiar toda la memoria de caché
  clear: () => {
    cacheStore.clear();
    cacheHits = 0;
    cacheMisses = 0;
  },

  // Obtener métricas en tiempo real
  getStats: () => {
    let activeEntries = 0;
    const now = Date.now();
    for (const [key, value] of cacheStore.entries()) {
      if (now <= value.expireAt) {
        activeEntries++;
      } else {
        cacheStore.delete(key);
      }
    }
    return {
      totalKeys: activeEntries,
      hits: cacheHits,
      misses: cacheMisses
    };
  }
};
