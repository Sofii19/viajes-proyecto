// app/services/oauth_service.ts
import Usuario from '#models/usuario'
import Rol from '#models/rol'
import env from '#start/env'
import jwt from 'jsonwebtoken'
import type { HttpContext } from '@adonisjs/core/http'

export default class OAuthService {
  async handleCallback({ ally, params, response }: HttpContext) {
    const provider = params.provider
    const social = ally.use(provider)

    if (social.accessDenied()) {
      throw new Error('Acceso denegado')
    }
    if (social.stateMisMatch()) {
      throw new Error('Estado inválido')
    }
    if (social.hasError()) {
      throw new Error('Error en OAuth: ' + social.getError())
    }

    const profile = await social.user()
    const providerId = profile.id
    const email = profile.email

    const primerNombre = profile.givenName || 'Nombre'
    const segundoNombre = ''
    const [apellidoPaterno = 'SinApellido', apellidoMaterno = ''] = (
      profile.familyName || ''
    ).split(' ')
    const field = `${provider}Id` as keyof Usuario

    let usuario = await Usuario.query().where(field, providerId).orWhere('email', email).first()

    if (!usuario) {
      const rol = await Rol.findByOrFail('nombre', 'cliente')

      usuario = await Usuario.create({
        primerNombre,
        segundoNombre,
        apellidoPaterno,
        apellidoMaterno,
        email,
        password: Math.random().toString(36).slice(2),
        [field]: providerId,
        rolId: rol.id,
        activo: true,
        twofaActivo: false,
      })
    }

    await usuario.load('rol')

    const token = jwt.sign(
      {
        sub: usuario.id,
        email: usuario.email,
        rol: usuario.rol.nombre,
      },
      env.get('JWT_SECRET'),
      { expiresIn: '1h' }
    )

    return {
      mensaje: `Login exitoso con ${provider}`,
      token,
    }
  }
}
