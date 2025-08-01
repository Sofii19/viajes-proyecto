const pool = require("../config/db");

const crear = async ({ nombre_ruta, duracion, descripcion }) => {
  const query = `
    INSERT INTO rutas (nombre_ruta, duracion, descripcion)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [nombre_ruta, duracion, descripcion];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const obtenerTodas = async () => {
  const result = await pool.query("SELECT * FROM rutas ORDER BY id ASC;");
  return result.rows;
};

const obtenerPorId = async (id) => {
  const result = await pool.query("SELECT * FROM rutas WHERE id = $1;", [id]);
  return result.rows[0];
};

const buscarPorNombre = async (nombre_ruta) => {
  const result = await pool.query(
    "SELECT * FROM rutas WHERE nombre_ruta = $1;",
    [nombre_ruta]
  );
  return result.rows[0];
};

const actualizar = async (id, { nombre_ruta, duracion, descripcion }) => {
  const query = `
    UPDATE rutas
    SET nombre_ruta = $1, duracion = $2, descripcion = $3
    WHERE id = $4
    RETURNING *;
  `;
  const values = [nombre_ruta, duracion, descripcion, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const eliminar = async (id) => {
  await pool.query("DELETE FROM rutas WHERE id = $1;", [id]);
};

module.exports = {
  crear,
  obtenerTodas,
  obtenerPorId,
  buscarPorNombre,
  actualizar,
  eliminar,
};