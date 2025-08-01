const NotificacionesService = require('../services/notificaciones.service');

const enviarEmail = async (req, res) => {
  try {
    await NotificacionesService.enviarEmail(req.body);
    res.json({ mensaje: 'Email enviado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al enviar email', error: error.message });
  }
};

const enviarSMS = async (req, res) => {
  try {
    await NotificacionesService.enviarSMS(req.body);
    res.json({ mensaje: 'SMS enviado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al enviar SMS', error: error.message });
  }
};

module.exports = { enviarEmail, enviarSMS };