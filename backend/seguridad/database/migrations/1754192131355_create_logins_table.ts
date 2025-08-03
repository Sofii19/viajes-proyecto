import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Logins extends BaseSchema {
  protected tableName = 'logins'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('usuario_id')
        .unsigned()
        .references('id')
        .inTable('usuarios')
        .onDelete('CASCADE')

      table.string('ip', 50)
      table.text('token')
      table.string('token_estado', 20).notNullable().defaultTo('activo')
      table.timestamp('fecha', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
