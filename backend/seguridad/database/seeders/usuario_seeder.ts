import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Usuario from '#models/usuario'
import Rol from '#models/rol'
import hash from '@adonisjs/core/services/hash'
import { DateTime } from 'luxon'

export default class UsuarioSeeder extends BaseSeeder {
  public async run() {
    const adminRol = await Rol.findBy('nombre', 'administrador')
    const clienteRol = await Rol.findBy('nombre', 'cliente')

    await Usuario.createMany([
      {
        primerNombre: 'Jorge',
        segundoNombre: 'Andrés',
        apellidoPaterno: 'Rivera',
        apellidoMaterno: 'García',
        email: 'admin@viajes.com',
        password: await hash.make('admin123'),
        rolId: adminRol?.id ?? null,
        activo: true,
        twofaActivo: false,
        fechaRegistro: DateTime.now(),
      },
      {
        primerNombre: 'Laura',
        segundoNombre: '',
        apellidoPaterno: 'López',
        apellidoMaterno: '',
        email: 'cliente@viajes.com',
        password: await hash.make('cliente123'),
        rolId: clienteRol?.id ?? null,
        activo: false,
        twofaActivo: false,
        fechaRegistro: DateTime.now(),
      },
    ])
  }
}
