const RutasService = require('../services/rutas.service');

const crearRuta = async (req, res) => {
  try {
    console.log("Llegué a rutas controller");
    const nuevaRuta = await RutasService.crearRuta(req.body);
    res.status(201).json(nuevaRuta);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear ruta', error: error.message });
  }
};

const obtenerRutas = async (req, res) => {
  try {
    const rutas = await RutasService.obtenerRutas();
    res.json(rutas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener rutas', error: error.message });
  }
};

const obtenerRutaPorId = async (req, res) => {
  try {
    const ruta = await RutasService.obtenerRutaPorId(req.params.id);
    if (!ruta) return res.status(404).json({ mensaje: 'Ruta no encontrada' });
    res.json(ruta);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener ruta', error: error.message });
  }
};

const actualizarRuta = async (req, res) => {
  try {
    const rutaActualizada = await RutasService.actualizarRuta(req.params.id, req.body);
    res.json(rutaActualizada);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar ruta', error: error.message });
  }
};

const eliminarRuta = async (req, res) => {
  try {
    await RutasService.eliminarRuta(req.params.id);
    res.json({ mensaje: 'Ruta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar ruta', error: error.message });
  }
};

module.exports = {
  crearRuta,
  obtenerRutas,
  obtenerRutaPorId,
  actualizarRuta,
  eliminarRuta
};