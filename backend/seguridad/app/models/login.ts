import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Usuario from './usuario.js'

export default class Login extends BaseModel {
  public static table = 'logins'
  
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare usuario_id: number

  @column()
  declare ip: string

  @column()
  declare token: string

  @column()
  declare token_estado: string

  @column()
  declare fecha: Date

  @belongsTo(() => Usuario)
  declare usuario: BelongsTo<typeof Usuario>
}
