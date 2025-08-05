import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddTwofaSecretToUsuarios extends BaseSchema {
  protected tableName = 'usuarios'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('twofa_secret').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('twofa_secret')
    })
  }
}