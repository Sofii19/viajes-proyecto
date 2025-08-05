const ReservaService = require('../services/reserva.service');

class ReservaController {
  async crearReserva(req, res) {
    try {
      const nuevaReserva = await ReservaService.crearReserva(req.body);
      res.status(201).json(nuevaReserva);
    } catch (error) {
      console.error('Error al crear reserva:', error.message);
      res.status(500).json({ mensaje: 'Error al crear reserva', error: error.message });
    }
  }

  async obtenerReservas(req, res) {
    try {
      const reservas = await ReservaService.obtenerReservas();
      res.status(200).json(reservas);
    } catch (error) {
      console.error('Error al obtener reservas:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener reservas', error: error.message });
    }
  }

  async obtenerReservaPorId(req, res) {
    try {
      const { id } = req.params;
      const reserva = await ReservaService.obtenerReservaPorId(id);
      res.status(200).json(reserva);
    } catch (error) {
      console.error('Error al obtener reserva por ID:', error.message);
      res.status(404).json({ mensaje: 'Reserva no encontrada', error: error.message });
    }
  }

  async actualizarReserva(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const reservaActualizada = await ReservaService.actualizarReserva(id, data);
      res.status(200).json(reservaActualizada);
    } catch (error) {
      console.error('Error al actualizar reserva:', error.message);
      res.status(500).json({ mensaje: 'Error al actualizar reserva', error: error.message });
    }
  }

  async eliminarReserva(req, res) {
    try {
      const { id } = req.params;
      await ReservaService.eliminarReserva(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error al eliminar reserva:', error.message);
      res.status(500).json({ mensaje: 'Error al eliminar reserva', error: error.message });
    }
  }
}

module.exports = new ReservaController();
