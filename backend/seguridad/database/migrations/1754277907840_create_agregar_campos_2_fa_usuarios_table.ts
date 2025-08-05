import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'usuarios'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('twofa_secret') // ❌ Eliminar campo antiguo
      table.boolean('twofa_activo').defaultTo(false) // ✅ Nuevo: indica si está activado el 2FA
      table.string('codigo_2fa', 10).nullable() // ✅ Nuevo: código temporal enviado
      table.timestamp('codigo_2fa_expira_en', { useTz: true }).nullable() // ✅ Nuevo: expiración
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('twofa_secret').nullable()
      table.dropColumn('twofa_activo')
      table.dropColumn('codigo_2fa')
      table.dropColumn('codigo_2fa_expira_en')
    })
  }
}
