const pool = require('../config/db');

const guardarConversacion = async ({ usuario_id, mensaje_usuario, respuesta_bot }) => {
  const query = `
    INSERT INTO conversaciones (usuario_id, mensaje_usuario, respuesta_bot)
    VALUES ($1, $2, $3)
  `;
  const values = [usuario_id, mensaje_usuario, respuesta_bot];
  await pool.query(query, values);
};

module.exports = { guardarConversacion };