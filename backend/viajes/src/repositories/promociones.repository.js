const pool = require('../config/db');

const crear = async ({ nombre, descripcion, descuento_porcentaje, fecha_inicio, fecha_fin }) => {
  const query = `
    INSERT INTO promociones (nombre, descripcion, descuento_porcentaje, fecha_inicio, fecha_fin)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [nombre, descripcion, descuento_porcentaje, fecha_inicio, fecha_fin];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const obtenerTodas = async () => {
  const result = await pool.query('SELECT * FROM promociones ORDER BY id ASC;');
  return result.rows;
};

const obtenerPorId = async (id) => {
  const result = await pool.query('SELECT * FROM promociones WHERE id = $1;', [id]);
  return result.rows[0];
};

const actualizar = async (id, { nombre, descripcion, descuento_porcentaje, fecha_inicio, fecha_fin }) => {
  const query = `
    UPDATE promociones
    SET nombre = $1, descripcion = $2, descuento_porcentaje = $3, fecha_inicio = $4, fecha_fin = $5
    WHERE id = $6
    RETURNING *;
  `;
  const values = [nombre, descripcion, descuento_porcentaje, fecha_inicio, fecha_fin, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const eliminar = async (id) => {
  await pool.query('DELETE FROM promociones WHERE id = $1;', [id]);
};

module.exports = {
  crear,
  obtenerTodas,
  obtenerPorId,
  actualizar,
  eliminar
};