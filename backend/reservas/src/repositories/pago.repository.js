const pool = require('../config/db');

class PagoRepository {
  async crearPago(pago) {
    const { reserva_id, monto, metodo_pago } = pago;
    const query = `
      INSERT INTO pagos (reserva_id, monto, metodo_pago)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [reserva_id, monto, metodo_pago];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async obtenerPagos() {
    const result = await pool.query('SELECT * FROM pagos');
    return result.rows;
  }

  async obtenerPagoPorId(id) {
    const result = await pool.query('SELECT * FROM pagos WHERE id = $1', [id]);
    return result.rows[0];
  }

  async actualizarPago(id, datos) {
    const { monto, metodo_pago } = datos;
    const query = `
      UPDATE pagos
      SET monto = $1, metodo_pago = $2
      WHERE id = $3
      RETURNING *;
    `;
    const values = [monto, metodo_pago, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async eliminarPago(id) {
    const result = await pool.query('DELETE FROM pagos WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = new PagoRepository();
