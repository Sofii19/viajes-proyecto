// database/migrations/xxxx_rol_permiso.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class RolPermiso extends BaseSchema {
  protected tableName = 'rol_permiso'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('rol_id')
        .unsigned()
        .references('id')
        .inTable('roles')
        .onDelete('CASCADE')

      table
        .integer('permiso_id')
        .unsigned()
        .references('id')
        .inTable('permisos')
        .onDelete('CASCADE')

      table.unique(['rol_id', 'permiso_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
