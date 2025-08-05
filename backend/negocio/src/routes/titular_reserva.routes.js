const express = require('express');
const router = express.Router();
const TitularReservaController = require('../controllers/titular_reserva.controller');

router.post('/', TitularReservaController.crearTitular);
router.get('/', TitularReservaController.obtenerTitulares);
router.get('/:id', TitularReservaController.obtenerTitularPorId);
router.put('/:id', TitularReservaController.actualizarTitular);
router.delete('/:id', TitularReservaController.eliminarTitular);

module.exports = router;
