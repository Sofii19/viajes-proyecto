import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Rol from '#models/rol'
import Permiso from '#models/permiso'

export default class RolPermisoSeeder extends BaseSeeder {
  public async run() {
    const permisos = await Permiso.all()
    const admin = await Rol.findByOrFail('nombre', 'administrador')
    const cliente = await Rol.findByOrFail('nombre', 'cliente')

    // Asignar todos los permisos al administrador
    await admin.related('permisos').sync(permisos.map(p => p.id))

    // Filtrar permisos específicos para el cliente
  const permisosCliente = permisos.filter((p) =>
    ['ver_reservas', 'crear_reserva', 'editar_reserva', 'cancelar_reserva'].includes(p.nombre)
  )
    await cliente.related('permisos').sync(permisosCliente.map(p => p.id))
  }
}
