// database/migrations/xxxx_activaciones.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Activaciones extends BaseSchema {
  protected tableName = 'activaciones'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('usuario_id')
        .unsigned()
        .references('id')
        .inTable('usuarios')
        .onDelete('CASCADE')

      table.string('token').notNullable().unique()
      table.boolean('usado').defaultTo(false)
      table.timestamp('fecha_creacion', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
