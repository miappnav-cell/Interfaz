const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    status: 'ONLINE',
    message: 'Servidor KingSystem API activo',
    system: 'KingSystem Interfaz 2.4.0'
  });
});

// Endpoint de versión
app.get('/version', (req, res) => {
  res.json({
    status: 'ONLINE',
    version: '2.4.0',
    name: 'KingSystem Interfaz API',
    timestamp: new Date().toISOString()
  });
});

// Endpoint de estado general
app.get('/health', (req, res) => {
  res.json({
    status: 'HEALTHY',
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// Endpoints de la API
app.get('/api/status', (req, res) => {
  res.json({ online: true, database: 'CONNECTED', activeConnections: 12 });
});

app.get('/api/users', (req, res) => {
  res.json([
    { id: '1', name: 'Admin Root', role: 'SUPERUSER', status: 'ACTIVE' },
    { id: '2', name: 'Bot Node 1', role: 'BOT', status: 'ONLINE' }
  ]);
});

app.post('/api/security/toggle', (req, res) => {
  const { mode } = req.body || {};
  res.json({ success: true, mode: mode || 'ENCRYPTED', updatedBy: 'Admin' });
});

app.post('/auth/logout', (req, res) => {
  res.json({ success: true, message: 'Sesión cerrada correctamente' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor KingSystem ejecutándose en puerto ${PORT}`);
});
