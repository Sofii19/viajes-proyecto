const express = require('express');
const router = express.Router();
const PromocionesController = require('../controllers/promociones.controller');

router.post('/', PromocionesController.crearPromocion);
router.get('/', PromocionesController.obtenerPromociones);
router.get('/:id', PromocionesController.obtenerPromocionPorId);
router.put('/:id', PromocionesController.actualizarPromocion);
router.delete('/:id', PromocionesController.eliminarPromocion);

module.exports = router;