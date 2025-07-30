const ClienteService = require('../services/cliente.service');

const crearCliente = async (req, res) => {
  try {
    const nuevoCliente = await ClienteService.crearCliente(req.body);
    res.status(201).json(nuevoCliente);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear cliente', error: error.message });
  }
};

const obtenerClientes = async (req, res) => {
  try {
    const clientes = await ClienteService.obtenerClientes();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener clientes', error: error.message });
  }
};

const obtenerClientePorId = async (req, res) => {
  try {
    const cliente = await ClienteService.obtenerClientePorId(req.params.id);
    if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener cliente', error: error.message });
  }
};

const actualizarCliente = async (req, res) => {
  try {
    const clienteActualizado = await ClienteService.actualizarCliente(req.params.id, req.body);
    res.json(clienteActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar cliente', error: error.message });
  }
};

const eliminarCliente = async (req, res) => {
  try {
    await ClienteService.eliminarCliente(req.params.id);
    res.json({ mensaje: 'Cliente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar cliente', error: error.message });
  }
};

module.exports = {
  crearCliente,
  obtenerClientes,
  obtenerClientePorId,
  actualizarCliente,
  eliminarCliente
};
