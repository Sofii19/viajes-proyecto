// test-db.js
const pool = require('./src/config/db');

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Error de conexión:', err);
  } else {
    console.log('✅ Conectado a PostgreSQL:', res.rows[0]);
  }
  pool.end();
});
