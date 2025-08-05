// app/middleware/verificar_permiso.ts
import type { HttpContext } from '@adonisjs/core/http'
import Rol from '#models/rol'

export default class VerificarPermiso {
  async handle(ctx: HttpContext, next: () => Promise<void>, guards: string[]) {
    const permisoRequerido = guards[0]
    const usuario = ctx.authUser

    if (!usuario) {
      return ctx.response.unauthorized({ mensaje: 'Usuario no autenticado' })
    }

    if (usuario.rolId === null) {
      throw new Error('El usuario no tiene un rol asignado')
    }
    const rol = await Rol
      .query()
      .where('id', usuario.rolId)
      .preload('permisos')
      .first()

    if (!rol) {
      return ctx.response.unauthorized({ mensaje: 'Rol no encontrado' })
    }

    const permisos = rol.permisos.map((permiso) => permiso.nombre)

    if (!permisos.includes(permisoRequerido)) {
      return ctx.response.forbidden({ mensaje: 'Permiso denegado' })
    }

    await next()
  }
}
