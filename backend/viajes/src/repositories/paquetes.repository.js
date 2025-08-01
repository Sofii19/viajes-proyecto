const pool = require("../config/db");

const crear = async ({
  nombre,
  descripcion,
  precio_total,
  promocion_id,
  ruta_id,
  hotel_id,
  vehiculo_id,
}) => {
  const query = `
    INSERT INTO paquetes (nombre, descripcion, precio_total, promocion_id, ruta_id, hotel_id, vehiculo_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
  const values = [
    nombre,
    descripcion,
    precio_total,
    promocion_id,
    ruta_id,
    hotel_id,
    vehiculo_id,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const obtenerTodos = async () => {
  const result = await pool.query("SELECT * FROM paquetes ORDER BY id ASC;");
  return result.rows;
};

const obtenerPorId = async (id) => {
  const result = await pool.query("SELECT * FROM paquetes WHERE id = $1;", [
    id,
  ]);
  return result.rows[0];
};

const actualizar = async (
  id,
  {
    nombre,
    descripcion,
    precio_total,
    promocion_id,
    ruta_id,
    hotel_id,
    vehiculo_id,
  }
) => {
  const query = `
    UPDATE paquetes
    SET nombre = $1, descripcion = $2, precio_total = $3, promocion_id = $4, ruta_id = $5, hotel_id = $6, vehiculo_id = $7
    WHERE id = $8
    RETURNING *;
  `;
  const values = [
    nombre,
    descripcion,
    precio_total,
    promocion_id,
    ruta_id,
    hotel_id,
    vehiculo_id,
    id,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const eliminar = async (id) => {
  await pool.query("DELETE FROM paquetes WHERE id = $1;", [id]);
};

module.exports = {
  crear,
  obtenerTodos,
  obtenerPorId,
  actualizar,
  eliminar,
};
