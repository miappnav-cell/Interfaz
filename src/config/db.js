require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Error conectando a PostgreSQL en Render:', err.message);
  } else {
    console.log('✅ Conexión exitosa a la BD (kingsystems)');
    console.log('🕒 Timestamp PostgreSQL:', res.rows[0].now);
  }
});

module.exports = pool;
