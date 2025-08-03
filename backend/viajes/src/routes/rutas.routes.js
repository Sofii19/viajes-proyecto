const express = require('express');
const router = express.Router();
const RutasController = require('../controllers/rutas.controller');

router.post('/', RutasController.crearRuta);
router.get('/', RutasController.obtenerRutas);
router.get('/:id', RutasController.obtenerRutaPorId);
router.put('/:id', RutasController.actualizarRuta);
router.delete('/:id', RutasController.eliminarRuta);

module.exports = router;