const pool = require("../config/db");

class ReservaRepository {
  async crearReserva(reserva) {
    const {
      titular_id,
      paquete_id,
      cantidad_personas,
      fecha_viaje,
      estado_id,
    } = reserva;
    const query = `
      INSERT INTO reservas (titular_id, paquete_id, cantidad_personas, fecha_viaje, estado_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [
      titular_id,
      paquete_id,
      cantidad_personas,
      fecha_viaje,
      estado_id,
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async obtenerReservas() {
    const query = `
      SELECT r.*, e.nombre AS estado,t.nombre AS nombre_titular,t.apellido AS apellido_titular
      FROM reservas r
      JOIN estado_reserva e ON r.estado_id = e.id
      JOIN titular_reserva t ON r.titular_id = t.id
      ORDER BY r.id ASC;
    `;
    const { rows } = await pool.query(query);
    return rows;
  }

  async obtenerReservaPorId(id) {
    const query = `
      SELECT r.*, e.nombre AS estado
      FROM reservas r
      JOIN estado_reserva e ON r.estado_id = e.id
      WHERE r.id = $1;
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  async actualizarReserva(id, datos) {
    const { paquete_id, cantidad_personas, fecha_viaje, estado_id } = datos;
    const query = `
      UPDATE reservas
      SET paquete_id = $1,
          cantidad_personas = $2,
          fecha_viaje = $3,
          estado_id = $4
      WHERE id = $5
      RETURNING *;
    `;
    const values = [paquete_id, cantidad_personas, fecha_viaje, estado_id, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async eliminarReserva(id) {
    await pool.query("DELETE FROM reservas WHERE id = $1", [id]);
    return { mensaje: "Reserva eliminada correctamente" };
  }

  async obtenerReservasPorUsuario(usuarioId) {
    const query = `
      SELECT r.*, e.nombre AS estado, t.nombre AS nombre_titular, t.apellido AS apellido_titular
      FROM reservas r
      JOIN estado_reserva e ON r.estado_id = e.id
      JOIN titular_reserva t ON r.titular_id = t.id
      WHERE r.titular_id = $1
      ORDER BY r.id ASC;
    `;
    const { rows } = await pool.query(query, [usuarioId]);
    return rows;
  }
}

module.exports = new ReservaRepository();
