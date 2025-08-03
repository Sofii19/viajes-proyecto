import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Usuarios extends BaseSchema {
  protected tableName = 'usuarios'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('primer_nombre', 100).notNullable()
      table.string('segundo_nombre', 100)
      table.string('apellido_paterno', 100).notNullable()
      table.string('apellido_materno', 100)

      table.string('email', 100).notNullable().unique()
      table.string('password', 180).notNullable()

      table
        .integer('rol_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('roles')
        .onDelete('SET NULL')

      // Soporte OAuth
      table.string('google_id').nullable().unique()
      table.string('facebook_id').nullable().unique()
      table.string('microsoft_id').nullable().unique()

      // Two-Factor Authentication
      table.string('twofa_secret').nullable()

      table.boolean('activo').defaultTo(false)
      table.timestamp('fecha_registro', { useTz: true }).defaultTo(this.now())
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
