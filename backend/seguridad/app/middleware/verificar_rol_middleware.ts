// app/middleware/verificar_rol_middleware.ts
import type { HttpContext } from '@adonisjs/core/http'
import Rol from '#models/rol'

export default class VerificarRolMiddleware {
  /**
   * Middleware para verificar si el usuario tiene el rol requerido.
   * Se usa como middleware.verificarRol('administrador')
   */
  async handle(ctx: HttpContext, next: () => Promise<void>, guards: string[]) {
    const rolRequerido = guards[0]
    const usuario = ctx.authUser

    if (!usuario) {
      return ctx.response.unauthorized({ mensaje: 'Usuario no autenticado' })
    }

    if (!usuario.rolId) {
      return ctx.response.forbidden({ mensaje: 'Rol no asignado' })
    }

    const rol = await Rol.find(usuario.rolId)
    if (!rol || rol.nombre !== rolRequerido) {
      return ctx.response.forbidden({
        mensaje: `Acceso restringido. Solo para rol: ${rolRequerido}`,
      })
    }

    await next()
  }
}
