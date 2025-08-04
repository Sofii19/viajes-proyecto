const express = require('express');
const router = express.Router();
const PagoController = require('../controllers/pago.controller');

// Crear un nuevo pago
router.post('/', PagoController.crearPago);

// Obtener todos los pagos
router.get('/', PagoController.obtenerPagos);

// Obtener un pago por ID
router.get('/:id', PagoController.obtenerPagoPorId);

// Actualizar un pago por ID
router.put('/:id', PagoController.actualizarPago);

// Eliminar un pago por ID
router.delete('/:id', PagoController.eliminarPago);

// Reporte de pagos por rango de fechas
router.get('/reporte', PagoController.reportePagosPorFechas);

module.exports = router;
