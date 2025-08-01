const PromocionesService = require('../services/promociones.service');

const crearPromocion = async (req, res) => {
  try {
    const nuevaPromocion = await PromocionesService.crearPromocion(req.body);
    res.status(201).json(nuevaPromocion);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear promoción', error: error.message });
  }
};

const obtenerPromociones = async (req, res) => {
  try {
    const promociones = await PromocionesService.obtenerPromociones();
    res.json(promociones);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener promociones', error: error.message });
  }
};

const obtenerPromocionPorId = async (req, res) => {
  try {
    const promocion = await PromocionesService.obtenerPromocionPorId(req.params.id);
    if (!promocion) return res.status(404).json({ mensaje: 'Promoción no encontrada' });
    res.json(promocion);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener promoción', error: error.message });
  }
};

const actualizarPromocion = async (req, res) => {
  try {
    const promocionActualizada = await PromocionesService.actualizarPromocion(req.params.id, req.body);
    res.json(promocionActualizada);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar promoción', error: error.message });
  }
};

const eliminarPromocion = async (req, res) => {
  try {
    await PromocionesService.eliminarPromocion(req.params.id);
    res.json({ mensaje: 'Promoción eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar promoción', error: error.message });
  }
};

module.exports = {
  crearPromocion,
  obtenerPromociones,
  obtenerPromocionPorId,
  actualizarPromocion,
  eliminarPromocion,
};