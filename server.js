const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(express.json());
app.use(cors());

// Conexión segura con PostgreSQL en Render
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Inicializar tablas maestras automáticamente
async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS system_nodes (
          id SERIAL PRIMARY KEY,
          node_name VARCHAR(50) UNIQUE NOT NULL,
          status VARCHAR(30) NOT NULL DEFAULT 'OPERATIVO',
          node_type VARCHAR(30) NOT NULL,
          last_sync TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS audit_logs (
          id SERIAL PRIMARY KEY,
          node_target VARCHAR(50),
          action_type VARCHAR(50),
          executed_by VARCHAR(50) DEFAULT 'ADMIN_MASTER',
          details TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Nodo por defecto
    await pool.query(`
      INSERT INTO system_nodes (node_name, status, node_type) 
      VALUES ('Alpha-01', 'OPERATIVO', 'BotController')
      ON CONFLICT (node_name) DO NOTHING;
    `);

    console.log('✅ Base de datos PostgreSQL inicializada correctamente.');
  } catch (err) {
    console.error('❌ Error inicializando base de datos:', err.message);
  }
}
initDB();

// 1. Endpoint de Estado del Sistema (SDUI y Nodos)
app.get('/system/status', async (req, res) => {
  try {
    const nodes = await pool.query('SELECT * FROM system_nodes');
    res.json({
      success: true,
      serverStatus: 'Operativo (Render Conectado)',
      nodes: nodes.rows,
      uiManifest: {
        theme: 'dark-master',
        activeModules: ['dashboard', 'nodes', 'wallet', 'security'],
        refreshIntervalMs: 15000
      },
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Endpoint de Ejecución de Comandos con Reglas y Notificaciones
app.post('/system/execute', async (req, res) => {
  const { node, action, payload } = req.body;

  try {
    let message = '';
    let soundTrigger = 'success_chime';
    let notifTitle = 'King System - Operación Exitosa';

    if (action === 'RESTART') {
      await pool.query("UPDATE system_nodes SET status = 'REINICIANDO', last_sync = NOW() WHERE node_name = $1", [node]);
      message = `Nodo ${node} reiniciado correctamente por el backend.`;
      soundTrigger = 'restart_alert';
    } else if (action === 'KILL') {
      await pool.query("UPDATE system_nodes SET status = 'APAGADO', last_sync = NOW() WHERE node_name = $1", [node]);
      message = `Alerta: Nodo ${node} apagado de emergencia.`;
      soundTrigger = 'emergency_alarm';
      notifTitle = '🚨 King System - Emergencia';
    } else {
      message = `Comando [${action}] ejecutado con éxito en ${node || 'Global'}.`;
    }

    // Registrar en auditoría SQL
    await pool.query(
      'INSERT INTO audit_logs (node_target, action_type, details) VALUES ($1, $2, $3)',
      [node || 'GLOBAL', action, message]
    );

    res.json({
      success: true,
      message,
      rules: {
        playSound: soundTrigger,
        sendNotification: {
          title: notifTitle,
          body: message
        }
      },
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`👑 King System Backend activo en puerto ${PORT}`);
});
