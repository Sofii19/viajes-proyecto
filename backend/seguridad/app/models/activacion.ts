import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Usuario from './usuario.js'

export default class Activacion extends BaseModel {
  public static table = 'activaciones' 

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare usuario_id: number

  @column()
  declare token: string

  @column()
  declare usado: boolean

  @column()
  declare fecha_creacion: Date

  @belongsTo(() => Usuario)
  declare usuario: BelongsTo<typeof Usuario>
}
