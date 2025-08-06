const ReservaRepository = require('../repositories/reserva.repository');

class ReservaService {
  async crearReserva(data) {
    const { titular_id, paquete_id, cantidad_personas, fecha_viaje, estado_id } = data;

    if (!titular_id || !paquete_id || !cantidad_personas || !fecha_viaje || !estado_id) {
      throw new Error('Faltan campos obligatorios');
    }

    return await ReservaRepository.crearReserva(data);
  }

  async obtenerReservas() {
    return await ReservaRepository.obtenerReservas();
  }

  async obtenerReservaPorId(id) {
    const reserva = await ReservaRepository.obtenerReservaPorId(id);
    if (!reserva) {
      throw new Error('Reserva no encontrada');
    }
    return reserva;
  }

  async actualizarReserva(id, data) {
    const reserva = await ReservaRepository.obtenerReservaPorId(id);
    if (!reserva) {
      throw new Error('Reserva no encontrada');
    }

    return await ReservaRepository.actualizarReserva(id, data);
  }

  async eliminarReserva(id) {
    const reserva = await ReservaRepository.obtenerReservaPorId(id);
    if (!reserva) {
      throw new Error('Reserva no encontrada');
    }

    return await ReservaRepository.eliminarReserva(id);
  }

  async obtenerReservasPorUsuario(usuarioId) {
    if (!usuarioId) {
      throw new Error('El id de usuario es obligatorio');
    }
    return await ReservaRepository.obtenerReservasPorUsuario(usuarioId);
  }
}

module.exports = new ReservaService();
