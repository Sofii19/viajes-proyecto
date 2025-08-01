const hotelesRepository = require('../repositories/hoteles.repository');

const crearHotel = async (datosHotel) => {
  // Puedes agregar validaciones aquí si lo necesitas
  return await hotelesRepository.crear(datosHotel);
};

const obtenerHoteles = async () => {
  return await hotelesRepository.obtenerTodos();
};

const obtenerHotelPorId = async (id) => {
  return await hotelesRepository.obtenerPorId(id);
};

const actualizarHotel = async (id, nuevosDatos) => {
  const hotel = await hotelesRepository.obtenerPorId(id);
  if (!hotel) {
    throw new Error('Hotel no encontrado');
  }
  return await hotelesRepository.actualizar(id, nuevosDatos);
};

const eliminarHotel = async (id) => {
  const hotel = await hotelesRepository.obtenerPorId(id);
  if (!hotel) {
    throw new Error('Hotel no encontrado');
  }
  return await hotelesRepository.eliminar(id);
};

module.exports = {
  crearHotel,
  obtenerHoteles,
  obtenerHotelPorId,
  actualizarHotel,
  eliminarHotel,
};