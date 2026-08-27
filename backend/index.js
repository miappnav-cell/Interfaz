const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(express.json());
app.use(cors());

// Conexión con la base de datos PostgreSQL de Render
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Inicializar tablas maestras y esquemas de reglas
async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS system_nodes (
          id SERIAL PRIMARY KEY,
          node_name VARCHAR(50) UNIQUE NOT NULL,
          status VARCHAR(30) NOT NULL DEFAULT 'OPERATIVO',
          node_type VARCHAR(30) NOT NULL,
          is_locked BOOLEAN DEFAULT FALSE,
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
    
    // Insertar nodo por defecto si no existe
    await pool.query(`
      INSERT INTO system_nodes (node_name, status, node_type, is_locked) 
      VALUES ('Alpha-01', 'OPERATIVO', 'BotController', false)
      ON CONFLICT (node_name) DO NOTHING;
    `);

    console.log('✅ Base de datos y reglas inicializadas correctamente.');
  } catch (err) {
    console.error('❌ Error inicializando base de datos:', err.message);
  }
}
initDB();

// 1. Endpoint de Estado y Manifiesto SDUI
app.get('/system/status', async (req, res) => {
  try {
    const nodes = await pool.query('SELECT * FROM system_nodes');
    const logs = await pool.query('SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 10');
    
    res.json({
      success: true,
      serverStatus: 'Operativo - Motor de Reglas Activo',
      nodes: nodes.rows,
      recentAudits: logs.rows,
      uiManifest: {
        theme: 'dark-master',
        modules: ['dashboard', 'nodes', 'security', 'wallet'],
        refreshIntervalMs: 10000
      },
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Motor de Ejecución de Reglas (Comandos, Seguridad, Sonido y Notificaciones)
app.post('/system/execute', async (req, res) => {
  const { node, action, payload } = req.body;

  try {
    // REGLA 1: Verificar si el nodo existe y si está bloqueado por seguridad
    if (node && node !== 'GLOBAL') {
      const nodeCheck = await pool.query('SELECT * FROM system_nodes WHERE node_name = $1', [node]);
      if (nodeCheck.rows.length === 0) {
        return res.status(404).json({
          success: false,
          error: `Regla violada: El nodo destino '${node}' no existe en el sistema.`
        });
      }
      
      const currentNode = nodeCheck.rows[0];
      if (currentNode.is_locked && action === 'KILL') {
        return res.status(403).json({
          success: false,
          error: `Acceso denegado: El nodo '${node}' está blindado contra apagados de emergencia.`
        });
      }
    }

    let message = '';
    let soundTrigger = 'success_chime';
    let notifTitle = 'King System - Operación Exitosa';

    // REGLA 2: Lógica de negocio específica por acción
    switch (action) {
      case 'RESTART':
        await pool.query("UPDATE system_nodes SET status = 'REINICIANDO', last_sync = NOW() WHERE node_name = $1", [node]);
        message = `Regla aplicada: Nodo ${node} reiniciado de forma controlada.`;
        soundTrigger = 'restart_alert';
        notifTitle = '🔄 King System - Nodo Reiniciado';
        break;

      case 'KILL':
        await pool.query("UPDATE system_nodes SET status = 'APAGADO', last_sync = NOW() WHERE node_name = $1", [node]);
        message = `Alerta crítica: Nodo ${node} apagado forzosamente por comando maestro.`;
        soundTrigger = 'emergency_alarm';
        notifTitle = '🚨 King System - Apagado de Emergencia';
        break;

      case 'SYNC_NODES':
        await pool.query("UPDATE system_nodes SET status = 'OPERATIVO', last_sync = NOW()");
        message = 'Regla aplicada: Sincronización masiva de red ejecutada en todos los nodos.';
        soundTrigger = 'sync_complete';
        notifTitle = '🌐 King System - Red Sincronizada';
        break;

      default:
        message = `Comando personalizado [${action}] procesado exitosamente.`;
        break;
    }

    // REGLA 3: Auditoría obligatoria en base de datos
    await pool.query(
      'INSERT INTO audit_logs (node_target, action_type, details) VALUES ($1, $2, $3)',
      [node || 'GLOBAL', action, message]
    );

    // REGLA 4: Respuesta empaquetada con instrucciones de entorno (Sonido y Notificación para la App)
    res.json({
      success: true,
      message,
      rulesEnforced: {
        playSound: soundTrigger,
        sendNotification: {
          title: notifTitle,
          body: message
        }
      },
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    console.error('❌ Error en el motor de reglas:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`👑 King System Backend con Motor de Reglas activo en puerto ${PORT}`);
});
