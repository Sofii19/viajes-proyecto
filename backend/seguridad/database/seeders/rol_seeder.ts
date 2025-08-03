import Rol from '#models/rol'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class RolSeeder extends BaseSeeder {
  public async run() {
    await Rol.updateOrCreateMany('nombre', [
      { nombre: 'administrador', descripcion: 'Administrador del sistema' },
      { nombre: 'cliente', descripcion: 'Cliente que realiza reservas' },
    ])
  }
}
