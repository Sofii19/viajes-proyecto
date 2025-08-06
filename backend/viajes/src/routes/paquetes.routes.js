const express = require('express');
const router = express.Router();
const PaquetesController = require('../controllers/paquetes.controller');

router.post('/', PaquetesController.crearPaquete);
router.get('/', PaquetesController.obtenerPaquetes);
router.get('/promocion', PaquetesController.obtenerPaquetesConPromocion);
router.get('/:id', PaquetesController.obtenerPaquetePorId);
router.put('/:id', PaquetesController.actualizarPaquete);
router.delete('/:id', PaquetesController.eliminarPaquete);

module.exports = router;