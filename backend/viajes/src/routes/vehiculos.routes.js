const express = require('express');
const router = express.Router();
const VehiculosController = require('../controllers/vehiculos.controller');

router.post('/', VehiculosController.crearVehiculo);
router.get('/', VehiculosController.obtenerVehiculos);
router.get('/:id', VehiculosController.obtenerVehiculoPorId);
router.put('/:id', VehiculosController.actualizarVehiculo);
router.delete('/:id', VehiculosController.eliminarVehiculo);

module.exports = router;