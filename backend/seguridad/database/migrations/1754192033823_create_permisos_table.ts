// database/migrations/xxxx_permisos.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Permisos extends BaseSchema {
  protected tableName = 'permisos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nombre', 100).notNullable().unique() // Ej: crear_usuario, ver_reserva
      table.string('descripcion', 255)
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
