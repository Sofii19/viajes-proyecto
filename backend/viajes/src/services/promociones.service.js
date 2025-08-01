const promocionesRepository = require('../repositories/promociones.repository');

const crearPromocion = async (datosPromocion) => {
  return await promocionesRepository.crear(datosPromocion);
};

const obtenerPromociones = async () => {
  return await promocionesRepository.obtenerTodas();
};

const obtenerPromocionPorId = async (id) => {
  return await promocionesRepository.obtenerPorId(id);
};

const actualizarPromocion = async (id, nuevosDatos) => {
  const promocion = await promocionesRepository.obtenerPorId(id);
  if (!promocion) {
    throw new Error('Promoción no encontrada');
  }
  return await promocionesRepository.actualizar(id, nuevosDatos);
};

const eliminarPromocion = async (id) => {
  const promocion = await promocionesRepository.obtenerPorId(id);
  if (!promocion) {
    throw new Error('Promoción no encontrada');
  }
  return await promocionesRepository.eliminar(id);
};

module.exports = {
  crearPromocion,
  obtenerPromociones,
  obtenerPromocionPorId,
  actualizarPromocion,
  eliminarPromocion,
};