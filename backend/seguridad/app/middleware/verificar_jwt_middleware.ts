import type { HttpContext } from '@adonisjs/core/http'
import jwt from 'jsonwebtoken'
import env from '#start/env'
import Usuario from '#models/usuario'

export default class VerificarJWT {
  async handle(ctx: HttpContext, next: () => Promise<void>) {
    const { request, response } = ctx
    console.log('🔐 Ejecutando middleware VerificarJWT')

    try {
      
      const authHeader = request.header('Authorization')

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return response.unauthorized({ mensaje: 'Token no proporcionado o inválido' })
      }

      const token = authHeader.replace('Bearer ', '')
      const decoded = jwt.verify(token, env.get('JWT_SECRET')!) as unknown as { sub: number }
      const usuario = await Usuario.find(decoded.sub)


      if (!usuario || !usuario.activo) {
        return response.unauthorized({ mensaje: 'Usuario no autorizado' })
      }

      ctx.authUser = usuario // puedes usar esto luego en controladores
      console.log('✅ Token verificado, pasando al handler...')
      await next()
    } catch (error) {
      return response.unauthorized({ mensaje: 'Token inválido o expirado' })
    }
  }
}
