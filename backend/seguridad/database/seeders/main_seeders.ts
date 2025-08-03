import db from '@adonisjs/lucid/services/db'

import PermisoSeeder from './permiso_seeder.js'
import RolSeeder from './rol_seeder.js'
import RolPermisoSeeder from './rol_permiso_seeder.js'
import UsuarioSeeder from './usuario_seeder.js'
import ActivacionSeeder from './activacion_seeder.js'
import LoginSeeder from './login_seeder.js'

export default async function () {
  const client = db.connection()

  try {
    console.log('➡️ Ejecutando PermisoSeeder')
    await new PermisoSeeder(client).run()

    console.log('➡️ Ejecutando RolSeeder')
    await new RolSeeder(client).run()

    console.log('➡️ Ejecutando RolPermisoSeeder')
    await new RolPermisoSeeder(client).run()

    console.log('➡️ Ejecutando UsuarioSeeder')
    await new UsuarioSeeder(client).run()

    console.log('➡️ Ejecutando ActivacionSeeder')
    await new ActivacionSeeder(client).run()

    console.log('➡️ Ejecutando LoginSeeder')
    await new LoginSeeder(client).run()

    console.log('✅ Todos los seeders ejecutados exitosamente.')
  } catch (error) {
    console.error('❌ Error al ejecutar los seeders:', error)
  }
}
