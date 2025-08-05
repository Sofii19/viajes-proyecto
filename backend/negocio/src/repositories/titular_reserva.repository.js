const pool = require('../config/db');

// Crear un titular de reserva
const crear = async ({ nombre, apellido, cedula, correo, telefono, usuario_id }) => {
  const query = `
    INSERT INTO titular_reserva (nombre, apellido, cedula, correo, telefono, usuario_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [nombre, apellido, cedula, correo, telefono, usuario_id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Obtener todos los titulares
const obtenerTodos = async () => {
  const result = await pool.query('SELECT * FROM titular_reserva ORDER BY id ASC;');
  return result.rows;
};

// Obtener un titular por ID
const obtenerPorId = async (id) => {
  const result = await pool.query('SELECT * FROM titular_reserva WHERE id = $1;', [id]);
  return result.rows[0];
};

// Buscar titular por correo
const buscarPorCorreo = async (correo) => {
  const result = await pool.query('SELECT * FROM titular_reserva WHERE correo = $1;', [correo]);
  return result.rows[0];
};

// Actualizar un titular
const actualizar = async (id, { nombre, correo, telefono }) => {
  const query = `
    UPDATE titular_reserva
    SET nombre = $1, correo = $2, telefono = $3
    WHERE id = $4
    RETURNING *;
  `;
  const values = [nombre, correo, telefono, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Eliminar un titular
const eliminar = async (id) => {
  await pool.query('DELETE FROM titular_reserva WHERE id = $1;', [id]);
};

module.exports = {
  crear,
  obtenerTodos,
  obtenerPorId,
  buscarPorCorreo,
  actualizar,
  eliminar,
};
