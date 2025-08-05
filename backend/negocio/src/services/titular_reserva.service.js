const titularRepository = require('../repositories/titular_reserva.repository');

const crearTitular = async (datosTitular) => {
  const titularExistente = await titularRepository.buscarPorCorreo(datosTitular.correo);
  if (titularExistente) {
    throw new Error('Ya existe un titular con ese correo');
  }

  return await titularRepository.crear(datosTitular);
};

const obtenerTitulares = async () => {
  return await titularRepository.obtenerTodos();
};

const obtenerTitularPorId = async (id) => {
  return await titularRepository.obtenerPorId(id);
};

const actualizarTitular = async (id, nuevosDatos) => {
  const titular = await titularRepository.obtenerPorId(id);
  if (!titular) {
    throw new Error('Titular no encontrado');
  }

  return await titularRepository.actualizar(id, nuevosDatos);
};

const eliminarTitular = async (id) => {
  const titular = await titularRepository.obtenerPorId(id);
  if (!titular) {
    throw new Error('Titular no encontrado');
  }

  return await titularRepository.eliminar(id);
};

module.exports = {
  crearTitular,
  obtenerTitulares,
  obtenerTitularPorId,
  actualizarTitular,
  eliminarTitular,
};
