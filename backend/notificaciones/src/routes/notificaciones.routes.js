const express = require('express');
const router = express.Router();
const NotificacionesController = require('../controllers/notificaciones.controller');

router.post('/email', NotificacionesController.enviarEmail);
router.post('/sms', NotificacionesController.enviarSMS);

module.exports = router;