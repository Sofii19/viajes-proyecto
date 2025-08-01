const pool = require('../config/db');

const crear = async ({ nombre, direccion, ciudad, estrellas, descripcion }) => {
  const query = `
    INSERT INTO hoteles (nombre, direccion, ciudad, estrellas, descripcion)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [nombre, direccion, ciudad, estrellas, descripcion];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const obtenerTodos = async () => {
  const result = await pool.query('SELECT * FROM hoteles ORDER BY id ASC;');
  return result.rows;
};

const obtenerPorId = async (id) => {
  const result = await pool.query('SELECT * FROM hoteles WHERE id = $1;', [id]);
  return result.rows[0];
};

const actualizar = async (id, { nombre, direccion, ciudad, estrellas, descripcion }) => {
  const query = `
    UPDATE hoteles
    SET nombre = $1, direccion = $2, ciudad = $3, estrellas = $4, descripcion = $5
    WHERE id = $6
    RETURNING *;
  `;
  const values = [nombre, direccion, ciudad, estrellas, descripcion, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const eliminar = async (id) => {
  await pool.query('DELETE FROM hoteles WHERE id = $1;', [id]);
};

module.exports = {
  crear,
  obtenerTodos,
  obtenerPorId,
  actualizar,
  eliminar,
};