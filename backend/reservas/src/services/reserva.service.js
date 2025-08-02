// src/services/reserva.service.js
const ReservaRepository = require('../repositories/reserva.repository');

class ReservaService {
  async crearReserva(data) {
    
    if (!data.cliente_id || !data.paquete_id || !data.cantidad_personas) {
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
}

module.exports = new ReservaService();
