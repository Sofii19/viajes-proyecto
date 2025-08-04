// repository/cliente.repository.js

const pool = require('../config/db'); // Asegúrate de tener este archivo para la conexión

const crear = async ({ nombre, apellido, cedula, correo, telefono, usuario_id }) => {
  const query = `
    INSERT INTO clientes (nombre, apellido, cedula, correo, telefono, usuario_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [nombre, apellido, cedula, correo, telefono, usuario_id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const obtenerTodos = async () => {
  const result = await pool.query('SELECT * FROM clientes ORDER BY id ASC;');
  return result.rows;
};

const obtenerPorId = async (id) => {
  const result = await pool.query('SELECT * FROM clientes WHERE id = $1;', [id]);
  return result.rows[0];
};

const buscarPorCorreo = async (correo) => {
  const result = await pool.query('SELECT * FROM clientes WHERE correo = $1;', [correo]);
  return result.rows[0];
};

const actualizar = async (id, { nombre, correo, telefono }) => {
  const query = `
    UPDATE clientes
    SET nombre = $1, correo = $2, telefono = $3
    WHERE id = $4
    RETURNING *;
  `;
  const values = [nombre, correo, telefono, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const eliminar = async (id) => {
  await pool.query('DELETE FROM clientes WHERE id = $1;', [id]);
};

module.exports = {
  crear,
  obtenerTodos,
  obtenerPorId,
  buscarPorCorreo,
  actualizar,
  eliminar,
};
