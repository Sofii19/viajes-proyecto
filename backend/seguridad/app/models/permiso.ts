import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Rol from './rol.js'

export default class Permiso extends BaseModel {
  public static table = 'permisos'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre: string

  @column()
  declare descripcion: string

  @manyToMany(() => Rol, {
    pivotTable: 'rol_permiso',
  })
  declare roles: ManyToMany<typeof Rol>
}
