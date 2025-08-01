const VehiculosService = require("../services/vehiculos.service");

const crearVehiculo = async (req, res) => {
  try {
    const nuevoVehiculo = await VehiculosService.crearVehiculo(req.body);
    res.status(201).json(nuevoVehiculo);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al crear vehículo", error: error.message });
  }
};

const obtenerVehiculos = async (req, res) => {
  try {
    const vehiculos = await VehiculosService.obtenerVehiculos();
    res.json(vehiculos);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener vehículos", error: error.message });
  }
};

const obtenerVehiculoPorId = async (req, res) => {
  try {
    const vehiculo = await VehiculosService.obtenerVehiculoPorId(req.params.id);
    if (!vehiculo)
      return res.status(404).json({ mensaje: "Vehículo no encontrado" });
    res.json(vehiculo);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener vehículo", error: error.message });
  }
};

const actualizarVehiculo = async (req, res) => {
  try {
    const vehiculoActualizado = await VehiculosService.actualizarVehiculo(
      req.params.id,
      req.body
    );
    res.json(vehiculoActualizado);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al actualizar vehículo", error: error.message });
  }
};

const eliminarVehiculo = async (req, res) => {
  try {
    await VehiculosService.eliminarVehiculo(req.params.id);
    res.json({ mensaje: "Vehículo eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al eliminar vehículo", error: error.message });
  }
};

module.exports = {
  crearVehiculo,
  obtenerVehiculos,
  obtenerVehiculoPorId,
  actualizarVehiculo,
  eliminarVehiculo,
};
