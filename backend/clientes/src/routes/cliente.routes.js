const express = require('express');
const router = express.Router();

const ClienteController = require('../controllers/cliente.controller');

// Rutas CRUD 
router.get('/', ClienteController.obtenerClientes);   
router.get('/:id', ClienteController.obtenerClientePorId);
router.post('/', ClienteController.crearCliente);
router.put('/:id', ClienteController.actualizarCliente);
router.delete('/:id', ClienteController.eliminarCliente);

module.exports = router;
