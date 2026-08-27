import axios from 'axios';

// Configuración central del cliente HTTP hacia Render
export const apiClient = axios.create({
  baseURL: 'https://interfaz-v2.onrender.com',
  timeout: 20000, // Margen amplio por si el servidor en plan gratuito está despertando
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});
