import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Activacion from '#models/activacion'
import { DateTime } from 'luxon'

export default class ActivacionSeeder extends BaseSeeder {
  public async run() {
    await Activacion.updateOrCreateMany('usuario_id', [
      {
        usuario_id: 1,
        token: 'ACTIVACION-ADMIN-001',
        usado: true,
        fecha_creacion: DateTime.local().toJSDate(),
      },
      {
        usuario_id: 2,
        token: 'ACTIVACION-CLIENTE-001',
        usado: true,
        fecha_creacion: DateTime.local().toJSDate(),
      },
    ])
  }
}
