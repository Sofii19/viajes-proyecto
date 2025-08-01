const express = require('express');
const router = express.Router();
const HotelesController = require('../controllers/hoteles.controller');

router.post('/', HotelesController.crearHotel);
router.get('/', HotelesController.obtenerHoteles);
router.get('/:id', HotelesController.obtenerHotelPorId);
router.put('/:id', HotelesController.actualizarHotel);
router.delete('/:id', HotelesController.eliminarHotel);

module.exports = router;