import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  belongsTo,
} from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Rol from './rol.js'

export default class Usuario extends BaseModel {
  public static table = 'usuarios'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare primerNombre: string

  @column()
  declare segundoNombre?: string

  @column()
  declare apellidoPaterno: string

  @column()
  declare apellidoMaterno?: string

  @column()
  declare email: string

  @column()
  declare password: string

  @column()
  declare rolId: number | null

  @belongsTo(() => Rol)
  declare rol: BelongsTo<typeof Rol>

  // OAuth
  @column()
  declare googleId?: string

  @column()
  declare facebookId?: string

  @column()
  declare microsoftId?: string

  // 2FA
  @column()
  declare twofaSecret?: string

  @column()
  declare activo: boolean

  @column.dateTime({ autoCreate: true })
  declare fechaRegistro: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
