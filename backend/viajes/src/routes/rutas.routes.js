const express = require('express');
const router = express.Router();
const RutasController = require('../controllers/rutas.controller');

router.post('/rutas', RutasController.crearRuta);
router.get('/rutas', RutasController.obtenerRutas);
router.get('/rutas/:id', RutasController.obtenerRutaPorId);
router.put('/rutas/:id', RutasController.actualizarRuta);
router.delete('/rutas/:id', RutasController.eliminarRuta);

module.exports = router;