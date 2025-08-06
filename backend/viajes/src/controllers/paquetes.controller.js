const PaquetesService = require('../services/paquetes.service');
const VehiculosService = require('../services/vehiculos.service');
const HotelesService = require('../services/hoteles.service');
const RutasService = require('../services/rutas.service');
const PromocionesService = require('../services/promociones.service');

const crearPaquete = async (req, res) => {
  try {
    const nuevoPaquete = await PaquetesService.crearPaquete(req.body);
    res.status(201).json(nuevoPaquete);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear paquete', error: error.message });
  }
};

const obtenerPaquetes = async (req, res) => {
  try {
    const paquetes = await PaquetesService.obtenerPaquetes();
    res.json(paquetes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener paquetes', error: error.message });
  }
};

const obtenerPaquetesConPromocion = async (req, res) => {
  try {
    const paquetes = await PaquetesService.obtenerConPromocion();
    res.json(paquetes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener paquetes con promoción', error: error.message });
  }
};

const obtenerPaquetePorId = async (req, res) => {
  try {
    const paquete = await PaquetesService.obtenerPaquetePorId(req.params.id);
    if (!paquete) return res.status(404).json({ mensaje: 'Paquete no encontrado' });
    res.json(paquete);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener paquete', error: error.message });
  }
};

const actualizarPaquete = async (req, res) => {
  try {
    const paqueteActualizado = await PaquetesService.actualizarPaquete(req.params.id, req.body);
    res.json(paqueteActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar paquete', error: error.message });
  }
};

const eliminarPaquete = async (req, res) => {
  try {
    await PaquetesService.eliminarPaquete(req.params.id);
    res.json({ mensaje: 'Paquete eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar paquete', error: error.message });
  }
};

module.exports = {
  crearPaquete,
  obtenerPaquetes,
  obtenerPaquetePorId,
  actualizarPaquete,
  eliminarPaquete,
};