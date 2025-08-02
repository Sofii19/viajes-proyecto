const pool = require('../config/db');

class ReservaRepository {
  async crearReserva(reserva) {
    const { cliente_id, paquete_id, cantidad_personas } = reserva;
    const query = `
      INSERT INTO reservas (cliente_id, paquete_id, cantidad_personas)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [cliente_id, paquete_id, cantidad_personas];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async obtenerReservas() {
    const { rows } = await pool.query('SELECT * FROM reservas');
    return rows;
  }

  async obtenerReservaPorId(id) {
    const { rows } = await pool.query('SELECT * FROM reservas WHERE id = $1', [id]);
    return rows[0];
  }

  async actualizarReserva(id, datos) {
    const { cliente_id, paquete_id, cantidad_personas, fecha_reserva, estado } = datos;
    const query = `
      UPDATE reservas
      SET cliente_id = $1, paquete_id = $2, cantidad_personas = $3, fecha_reserva = $5, estado = $6
      WHERE id = $4
      RETURNING *;
    `;
    const values = [cliente_id, paquete_id, cantidad_personas, id, fecha_reserva, estado];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async eliminarReserva(id) {
    await pool.query('DELETE FROM reservas WHERE id = $1', [id]);
    return { mensaje: 'Reserva eliminada correctamente' };
  }
}

module.exports = new ReservaRepository();
