// database/migrations/xxxx_roles.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Roles extends BaseSchema {
  protected tableName = 'roles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nombre', 50).notNullable().unique() // Ej: admin, cliente
      table.string('descripcion', 255)
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
