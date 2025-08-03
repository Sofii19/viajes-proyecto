import Permiso from '#models/permiso'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class PermisoSeeder extends BaseSeeder {
  public async run() {
    await Permiso.updateOrCreateMany('nombre', [
      // Gestión de usuarios (solo admins)
      { nombre: 'ver_usuarios', descripcion: 'Permite ver la lista de usuarios' },
      { nombre: 'crear_usuarios', descripcion: 'Permite crear nuevos usuarios' },
      { nombre: 'editar_usuarios', descripcion: 'Permite editar usuarios existentes' },
      { nombre: 'eliminar_usuarios', descripcion: 'Permite eliminar usuarios' },

      // Gestión de reservas (admin y cliente)
      { nombre: 'ver_reservas', descripcion: 'Permite ver todas las reservas' },
      { nombre: 'crear_reserva', descripcion: 'Permite realizar una nueva reserva' },
      { nombre: 'cancelar_reserva', descripcion: 'Permite cancelar una reserva existente' },
      { nombre: 'editar_reserva', descripcion: 'Permite editar datos de una reserva' },

      // Gestión de paquetes (solo admins)
      { nombre: 'gestionar_paquetes', descripcion: 'Permite crear, editar o eliminar paquetes de viaje' },

      // Roles y permisos (solo admins)
      { nombre: 'ver_roles', descripcion: 'Permite ver los roles del sistema' },
      { nombre: 'asignar_roles', descripcion: 'Permite asignar roles a los usuarios' },
      { nombre: 'ver_permisos', descripcion: 'Permite ver los permisos existentes' },
      { nombre: 'asignar_permisos', descripcion: 'Permite asignar permisos a roles' },
    ])
  }
}
