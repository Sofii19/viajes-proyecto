const paquetesRepository = require('../repositories/paquetes.repository');

const crearPaquete = async (datosPaquete) => {
  return await paquetesRepository.crear(datosPaquete);
};

const obtenerPaquetes = async () => {
  return await paquetesRepository.obtenerTodos();
};
const obtenerConPromocion = async () => {
  return await paquetesRepository.obtenerConPromocion();
};

const obtenerPaquetePorId = async (id) => {
  return await paquetesRepository.obtenerPorId(id);
};

const actualizarPaquete = async (id, nuevosDatos) => {
  const paquete = await paquetesRepository.obtenerPorId(id);
  if (!paquete) {
    throw new Error('Paquete no encontrado');
  }
  return await paquetesRepository.actualizar(id, nuevosDatos);
};

const eliminarPaquete = async (id) => {
  const paquete = await paquetesRepository.obtenerPorId(id);
  if (!paquete) {
    throw new Error('Paquete no encontrado');
  }
  return await paquetesRepository.eliminar(id);
};

module.exports = {
  crearPaquete,
  obtenerPaquetes,
  obtenerPaquetePorId,
  actualizarPaquete,
  eliminarPaquete,
};