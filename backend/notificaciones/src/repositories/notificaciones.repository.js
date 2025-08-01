const pool = require('../config/db');

const registrar = async ({ tipo, destinatario, asunto, mensaje, estado, error }) => {
  const query = `
    INSERT INTO notificaciones (tipo, destinatario, asunto, mensaje, estado, error)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [tipo, destinatario, asunto, mensaje, estado, error];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = { registrar };