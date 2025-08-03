import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class RolPermiso extends BaseModel {
  public static table = 'rol_permiso'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare rol_id: number

  @column()
  declare permiso_id: number
}
