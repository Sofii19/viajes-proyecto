// IMPORTACIONES
import type { HttpContext } from '@adonisjs/core/http'
import { authenticator } from 'otplib'
import qrcode from 'qrcode'
import Usuario from '#models/usuario'
import { DateTime } from 'luxon'

// OPCIÓN DE TOLERANCIA DE TIEMPO
authenticator.options = { window: 1 }

export default class TwoFactorAuthController {
  // GET /auth/2fa/setup

  // Genera el codigo qr y el secreto para la app de autenticación
  public async setup({ authUser, response }: HttpContext) {
    if (!authUser) {
      return response.unauthorized({ mensaje: 'No autenticado' })
    }

    const usuario = await Usuario.findOrFail(authUser.id)

    if (!usuario.twofaSecret) {
      const secret = authenticator.generateSecret().trim()
      usuario.twofaSecret = secret
      await usuario.save()
    }

    const otpauth = authenticator.keyuri(usuario.email, 'Agencia de Viajes', usuario.twofaSecret)

    const qr = await qrcode.toDataURL(otpauth)

    console.log('Secreto generado:', usuario.twofaSecret)
    console.log('otpauth:', otpauth)
    console.log('QR base64:', qr.slice(0, 50) + '...') // para no imprimir todo

    return response.ok({
      mensaje: 'Escanea el código QR en tu aplicación',
      qr,
      secret: usuario.twofaSecret, // opcional
    })
  }

  // PATCH /auth/2fa/activar
  public async activar({ authUser, response }: HttpContext) {
    if (!authUser) {
      return response.unauthorized({ mensaje: 'No autenticado' })
    }

    const usuario = await Usuario.findOrFail(authUser.id)

    if (!usuario.twofaSecret) {
      return response.badRequest({ mensaje: '2FA no está configurado' })
    }

    usuario.twofaActivo = true
    await usuario.save()

    return response.ok({ mensaje: '2FA activado correctamente' })
  }

  // PATCH /auth/2fa/desactivar
  public async desactivar({ authUser, response }: HttpContext) {
    if (!authUser) {
      return response.unauthorized({ mensaje: 'No autenticado' })
    }

    const usuario = await Usuario.findOrFail(authUser.id)

    usuario.twofaActivo = false
    usuario.twofaSecret = undefined
    await usuario.save()

    return response.ok({ mensaje: '2FA desactivado correctamente' })
  }

  // POST /auth/2fa/verificar-login
  public async verificarLogin({ request, response }: HttpContext) {
    const { usuario_id, codigo } = request.only(['usuario_id', 'codigo'])

    const usuario = await Usuario.find(usuario_id)

    if (!usuario || !usuario.twofaActivo || !usuario.twofaSecret) {
      return response.badRequest({ mensaje: 'No se puede verificar 2FA' })
    }

    const esValido = authenticator.verify({
      token: codigo,
      secret: usuario.twofaSecret,
    })

    if (!esValido) {
      return response.unauthorized({ mensaje: 'Código 2FA inválido' })
    }

    const { default: jwt } = await import('jsonwebtoken')
    const token = jwt.sign({ sub: usuario.id, email: usuario.email }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    })

    return response.ok({
      mensaje: 'Código verificado correctamente',
      token,
      usuario: {
        id: usuario.id,
        email: usuario.email,
      },
    })
  }
}
