const vehiculosRepository = require("../repositories/vehiculos.repository");

const crearVehiculo = async (datosVehiculo) => {
  // Puedes agregar validaciones aquí si lo necesitas
  return await vehiculosRepository.crear(datosVehiculo);
};

const obtenerVehiculos = async () => {
  return await vehiculosRepository.obtenerTodos();
};

const obtenerVehiculoPorId = async (id) => {
  return await vehiculosRepository.obtenerPorId(id);
};

const actualizarVehiculo = async (id, nuevosDatos) => {
  const vehiculo = await vehiculosRepository.obtenerPorId(id);
  if (!vehiculo) {
    throw new Error("Vehículo no encontrado");
  }
  return await vehiculosRepository.actualizar(id, nuevosDatos);
};

const eliminarVehiculo = async (id) => {
  const vehiculo = await vehiculosRepository.obtenerPorId(id);
  if (!vehiculo) {
    throw new Error("Vehículo no encontrado");
  }
  return await vehiculosRepository.eliminar(id);
};

module.exports = {
  crearVehiculo,
  obtenerVehiculos,
  obtenerVehiculoPorId,
  actualizarVehiculo,
  eliminarVehiculo,
};
