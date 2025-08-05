const TitularService = require('../services/titular_reserva.service');

const crearTitular = async (req, res) => {
  try {
    const nuevoTitular = await TitularService.crearTitular(req.body);
    res.status(201).json(nuevoTitular);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear titular', error: error.message });
  }
};

const obtenerTitulares = async (req, res) => {
  try {
    const titulares = await TitularService.obtenerTitulares();
    res.json(titulares);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener titulares', error: error.message });
  }
};

const obtenerTitularPorId = async (req, res) => {
  try {
    const titular = await TitularService.obtenerTitularPorId(req.params.id);
    if (!titular) return res.status(404).json({ mensaje: 'Titular no encontrado' });
    res.json(titular);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener titular', error: error.message });
  }
};

const actualizarTitular = async (req, res) => {
  try {
    const titularActualizado = await TitularService.actualizarTitular(req.params.id, req.body);
    res.json(titularActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar titular', error: error.message });
  }
};

const eliminarTitular = async (req, res) => {
  try {
    await TitularService.eliminarTitular(req.params.id);
    res.json({ mensaje: 'Titular eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar titular', error: error.message });
  }
};

module.exports = {
  crearTitular,
  obtenerTitulares,
  obtenerTitularPorId,
  actualizarTitular,
  eliminarTitular
};
