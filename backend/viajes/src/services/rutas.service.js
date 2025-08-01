const rutasRepository = require("../repositories/rutas.repository");

const crearRuta = async (datosRuta) => {
  const rutaExistente = await rutasRepository.buscarPorNombre(datosRuta.nombre_ruta);
  if (rutaExistente) {
    throw new Error("Ya existe un cliente con ese correo");
  }
  return await rutasRepository.crear(datosRuta);
};

const obtenerRutas = async () => {
  return await rutasRepository.obtenerTodas();
};

const obtenerRutaPorId = async (id) => {
  return await rutasRepository.obtenerPorId(id);
};

const actualizarRuta = async (id, nuevosDatos) => {
  const ruta = await rutasRepository.obtenerPorId(id);
  if (!ruta) {
    throw new Error("Ruta no encontrada");
  }

  return await rutasRepository.actualizar(id, nuevosDatos);
};

const eliminarRuta = async (id) => {
  const ruta = await rutasRepository.obtenerPorId(id);
  if (!ruta) {
    throw new Error("Ruta no encontrada");
  }

  return await rutasRepository.eliminar(id);
};

module.exports = {
  crearRuta,
  obtenerRutas,
  obtenerRutaPorId,
  actualizarRuta,
  eliminarRuta,
};
