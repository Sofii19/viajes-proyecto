const pool = require("../config/db");

const crear = async ({ marca, modelo, capacidad, placa }) => {
  const query = `
    INSERT INTO vehiculos (marca, modelo, capacidad, placa)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [marca, modelo, capacidad, placa];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const obtenerTodos = async () => {
  const result = await pool.query("SELECT * FROM vehiculos ORDER BY id ASC;");
  return result.rows;
};

const obtenerPorId = async (id) => {
  const result = await pool.query("SELECT * FROM vehiculos WHERE id = $1;", [
    id,
  ]);
  return result.rows[0];
};

const actualizar = async (id, { marca, modelo, capacidad, placa }) => {
  const query = `
    UPDATE vehiculos
    SET marca = $1, modelo = $2, capacidad = $3, placa = $4
    WHERE id = $5
    RETURNING *;
  `;
  const values = [marca, modelo, capacidad, placa, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const eliminar = async (id) => {
  await pool.query("DELETE FROM vehiculos WHERE id = $1;", [id]);
};

module.exports = {
  crear,
  obtenerTodos,
  obtenerPorId,
  actualizar,
  eliminar,
};
