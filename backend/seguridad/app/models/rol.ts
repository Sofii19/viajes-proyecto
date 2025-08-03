import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Usuario from './usuario.js'
import Permiso from './permiso.js'

export default class Rol extends BaseModel {
  public static table = 'roles' 
  
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre: string

  @column()
  declare descripcion: string

  @hasMany(() => Usuario)
  declare usuarios: HasMany<typeof Usuario>

  @manyToMany(() => Permiso, {
    pivotTable: 'rol_permiso',
  })
  declare permisos: ManyToMany<typeof Permiso>
}
