import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Login from '#models/login'
import { DateTime } from 'luxon'

export default class LoginSeeder extends BaseSeeder {
  public async run() {
    await Login.updateOrCreateMany('usuario_id', [
      {
        usuario_id: 1,
        ip: '192.168.0.1',
        token: 'token_admin_001',
        token_estado: 'activo',
        fecha: DateTime.local().toJSDate(),
      },
      {
        usuario_id: 2,
        ip: '192.168.0.2',
        token: 'token_cliente_001',
        token_estado: 'activo',
        fecha: DateTime.local().toJSDate(),
      },
    ])
  }
}
