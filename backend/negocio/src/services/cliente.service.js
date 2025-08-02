const clienteRepository = require('../repositories/cliente.repository');

const crearCliente = async (datosCliente) => {
  const clienteExistente = await clienteRepository.buscarPorCorreo(datosCliente.correo);
  if (clienteExistente) {
    throw new Error('Ya existe un cliente con ese correo');
  }

  return await clienteRepository.crear(datosCliente);
};

const obtenerClientes = async () => {
  return await clienteRepository.obtenerTodos();
};

const obtenerClientePorId = async (id) => {
  return await clienteRepository.obtenerPorId(id);
};

const actualizarCliente = async (id, nuevosDatos) => {
  const cliente = await clienteRepository.obtenerPorId(id);
  if (!cliente) {
    throw new Error('Cliente no encontrado');
  }

  return await clienteRepository.actualizar(id, nuevosDatos);
};

const eliminarCliente = async (id) => {
  const cliente = await clienteRepository.obtenerPorId(id);
  if (!cliente) {
    throw new Error('Cliente no encontrado');
  }

  return await clienteRepository.eliminar(id);
};

module.exports = {
  crearCliente,
  obtenerClientes,
  obtenerClientePorId,
  actualizarCliente,
  eliminarCliente,
};
