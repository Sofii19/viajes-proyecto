const express = require('express');
const router = express.Router();
const ReservaController = require('../controllers/reserva.controller');

// Crear nueva reserva
router.post('/', ReservaController.crearReserva);

// Obtener todas las reservas
router.get('/', ReservaController.obtenerReservas);

// Obtener reserva por ID
router.get('/:id', ReservaController.obtenerReservaPorId);

// Actualizar reserva
router.put('/:id', ReservaController.actualizarReserva);

// Eliminar reserva
router.delete('/:id', ReservaController.eliminarReserva);

// Obtener reservas por id de usuario
router.get('/usuario/:usuarioId', ReservaController.obtenerReservasPorUsuario);

module.exports = router;
