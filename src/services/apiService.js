import { cacheService } from './cacheService';

const BASE_URL = 'https://render-api-backend.onrender.com';

export const apiService = {
  // Petición optimizada con respaldo en caché
  fetchWithCache: async (endpoint, ttlSeconds = 120) => {
    const cachedData = cacheService.get(endpoint);
    if (cachedData) {
      return { data: cachedData, fromCache: true };
    }

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`);
      const data = await response.json();
      cacheService.set(endpoint, data, ttlSeconds);
      return { data, fromCache: false };
    } catch (err) {
      return { error: err.message, fromCache: false };
    }
  },

  clearApiCache: () => {
    cacheService.clear();
  }
};
