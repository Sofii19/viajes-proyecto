const PagoService = require("../services/pago.service");

class PagoController {
  async crearPago(req, res) {
    try {
      const nuevoPago = await PagoService.crearPago(req.body);
      res.status(201).json(nuevoPago);
    } catch (error) {
      res
        .status(500)
        .json({ mensaje: "Error al crear el pago", error: error.message });
    }
  }

  async obtenerPagos(req, res) {
    try {
      const pagos = await PagoService.obtenerPagos();
      res.json(pagos);
    } catch (error) {
      res
        .status(500)
        .json({ mensaje: "Error al obtener pagos", error: error.message });
    }
  }

  async obtenerPagoPorId(req, res) {
    try {
      const pago = await PagoService.obtenerPagoPorId(req.params.id);
      res.json(pago);
    } catch (error) {
      res
        .status(404)
        .json({ mensaje: "Pago no encontrado", error: error.message });
    }
  }

  async actualizarPago(req, res) {
    try {
      const pago = await PagoService.actualizarPago(req.params.id, req.body);
      res.json(pago);
    } catch (error) {
      res
        .status(500)
        .json({ mensaje: "Error al actualizar el pago", error: error.message });
    }
  }

  async eliminarPago(req, res) {
    try {
      const resultado = await PagoService.eliminarPago(req.params.id);
      res.json({ mensaje: "Pago eliminado correctamente", resultado });
    } catch (error) {
      res
        .status(500)
        .json({ mensaje: "Error al eliminar el pago", error: error.message });
    }
  }

  async reportePagosPorFechas(req, res) {
    const { fechaInicio, fechaFin } = req.query;
    try {
      const reporte = await PagoService.reportePagosPorFechas(
        fechaInicio,
        fechaFin
      );
      res.json(reporte);
    } catch (error) {
      res
        .status(500)
        .json({
          mensaje: "Error al obtener el reporte de pagos",
          error: error.message,
        });
    }
  }
}

module.exports = new PagoController();
