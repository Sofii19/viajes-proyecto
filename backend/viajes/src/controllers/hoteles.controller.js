const HotelesService = require('../services/hoteles.service');

const crearHotel = async (req, res) => {
  try {
    const nuevoHotel = await HotelesService.crearHotel(req.body);
    res.status(201).json(nuevoHotel);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear hotel', error: error.message });
  }
};

const obtenerHoteles = async (req, res) => {
  try {
    const hoteles = await HotelesService.obtenerHoteles();
    res.json(hoteles);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener hoteles', error: error.message });
  }
};

const obtenerHotelPorId = async (req, res) => {
  try {
    const hotel = await HotelesService.obtenerHotelPorId(req.params.id);
    if (!hotel) return res.status(404).json({ mensaje: 'Hotel no encontrado' });
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener hotel', error: error.message });
  }
};

const actualizarHotel = async (req, res) => {
  try {
    const hotelActualizado = await HotelesService.actualizarHotel(req.params.id, req.body);
    res.json(hotelActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar hotel', error: error.message });
  }
};

const eliminarHotel = async (req, res) => {
  try {
    await HotelesService.eliminarHotel(req.params.id);
    res.json({ mensaje: 'Hotel eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar hotel', error: error.message });
  }
};

module.exports = {
  crearHotel,
  obtenerHoteles,
  obtenerHotelPorId,
  actualizarHotel,
  eliminarHotel,
};