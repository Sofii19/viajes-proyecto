const pool = require('../config/db');

const crear = async ({ nombre, email, password, rol }) => {
  const query = `
    INSERT INTO usuarios (nombre, email, password, rol)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [nombre, email, password, rol];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const buscarPorEmail = async (email) => {
  const result = await pool.query('SELECT * FROM usuarios WHERE email = $1;', [email]);
  return result.rows[0];
};

const buscarPorId = async (id) => {
  const result = await pool.query('SELECT * FROM usuarios WHERE id = $1;', [id]);
  return result.rows[0];
};

const buscarPorGoogleId = async (google_id) => {
  const result = await pool.query('SELECT * FROM usuarios WHERE google_id = $1;', [google_id]);
  return result.rows[0];
};

const activar = async (id) => {
  await pool.query('UPDATE usuarios SET activo = TRUE WHERE id = $1;', [id]);
};

const guardar2FASecret = async (id, secret) => {
  await pool.query('UPDATE usuarios SET twofa_secret = $1 WHERE id = $2;', [secret, id]);
};

module.exports = {
  crear,
  buscarPorEmail,
  buscarPorId,
  buscarPorGoogleId,
  activar,
  guardar2FASecret
};