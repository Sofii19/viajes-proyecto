const pool = require("../config/db");

const crear = async ({ usuario_id, token }) => {
  const query = `
    INSERT INTO activaciones (usuario_id, token)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const values = [usuario_id, token];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const buscarPorToken = async (token) => {
  const result = await pool.query(
    "SELECT * FROM activaciones WHERE token = $1;",
    [token]
  );
  return result.rows[0];
};

const marcarUsado = async (token) => {
  await pool.query("UPDATE activaciones SET usado = TRUE WHERE token = $1;", [
    token,
  ]);
};

module.exports = {
  crear,
  buscarPorToken,
  marcarUsado,
};
