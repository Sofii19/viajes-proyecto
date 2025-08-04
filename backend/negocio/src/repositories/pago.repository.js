const pool = require("../config/db");

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
    const result = await pool.query("SELECT * FROM pagos");
    return result.rows;
  }

  async obtenerPagoPorId(id) {
    const result = await pool.query("SELECT * FROM pagos WHERE id = $1", [id]);
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
    const result = await pool.query(
      "DELETE FROM pagos WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }

    async reportePagosPorFechas(fechaInicio, fechaFin) {
    const query = `
      SELECT
        pagos.id AS pago_id,
        pagos.fecha_pago,
        pagos.monto,
        pagos.metodo_pago,
        reservas.cantidad_personas,
        reservas.estado,
        paquetes.nombre AS paquete_nombre,
        clientes.nombre AS cliente_nombre,
        clientes.apellido AS cliente_apellido,
        clientes.correo AS cliente_correo
      FROM pagos
      JOIN reservas ON pagos.reserva_id = reservas.id
      JOIN clientes ON reservas.cliente_id = clientes.id
      JOIN paquetes ON reservas.paquete_id = paquetes.id
      WHERE pagos.fecha_pago BETWEEN $1 AND $2
      ORDER BY pagos.fecha_pago DESC
    `;
    const values = [fechaInicio, fechaFin];
    const result = await pool.query(query, values);
    return result.rows;
  }
}

module.exports = new PagoRepository();
