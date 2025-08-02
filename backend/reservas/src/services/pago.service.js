const PagoRepository = require('../repositories/pago.repository');

class PagoService {
  async crearPago(pagoData) {
    try {
      const nuevoPago = await PagoRepository.crearPago(pagoData);
      return nuevoPago;
    } catch (error) {
      throw new Error('Error al crear el pago: ' + error.message);
    }
  }

  async obtenerPagos() {
    try {
      return await PagoRepository.obtenerPagos();
    } catch (error) {
      throw new Error('Error al obtener los pagos: ' + error.message);
    }
  }

  async obtenerPagoPorId(id) {
    try {
      const pago = await PagoRepository.obtenerPagoPorId(id);
      if (!pago) {
        throw new Error('Pago no encontrado');
      }
      return pago;
    } catch (error) {
      throw new Error('Error al obtener el pago: ' + error.message);
    }
  }

  async actualizarPago(id, datos) {
    try {
      const pagoActualizado = await PagoRepository.actualizarPago(id, datos);
      if (!pagoActualizado) {
        throw new Error('Pago no encontrado para actualizar');
      }
      return pagoActualizado;
    } catch (error) {
      throw new Error('Error al actualizar el pago: ' + error.message);
    }
  }

  async eliminarPago(id) {
    try {
      const pagoEliminado = await PagoRepository.eliminarPago(id);
      if (!pagoEliminado) {
        throw new Error('Pago no encontrado para eliminar');
      }
      return pagoEliminado;
    } catch (error) {
      throw new Error('Error al eliminar el pago: ' + error.message);
    }
  }
}

module.exports = new PagoService();
