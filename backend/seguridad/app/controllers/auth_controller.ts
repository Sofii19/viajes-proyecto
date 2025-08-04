import type { HttpContext } from '@adonisjs/core/http'
import { cuid } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import { DateTime } from 'luxon'
import jwt from 'jsonwebtoken'

import Usuario from '#models/usuario'
import Activacion from '#models/activacion'
import Rol from '#models/rol'

import { registroUsuarioValidator } from '#validators/registrar_usuario'
import { loginUsuarioValidator } from '#validators/login_usuario'
import { codigo2faValidator } from '#validators/codigo_2_fa'

import { enviarCorreoActivacion, enviarCodigo2FA } from '../utils/email.js'
import { generarCodigo2FA } from '../utils/codigo2fa.js'

export default class AuthController {
  public async register({ request, response }: HttpContext) {
    const datos = await request.validateUsing(registroUsuarioValidator)

    const existe = await Usuario.findBy('email', datos.email)
    if (existe) {
      return response.status(400).json({ mensaje: 'El correo electrónico ya está registrado' })
    }

    const rol = await Rol.findBy('nombre', 'cliente')
    if (!rol) {
      return response.status(400).json({ mensaje: 'El rol especificado no es válido' })
    }

    const usuario = await Usuario.create({
      primerNombre: datos.primerNombre,
      segundoNombre: datos.segundoNombre || undefined,
      apellidoPaterno: datos.apellidoPaterno,
      apellidoMaterno: datos.apellidoMaterno || undefined,
      email: datos.email,
      password: await hash.make(datos.password),
      activo: false,
      rolId: rol.id,
    })

    const token = cuid()
    await Activacion.create({
      usuario_id: usuario.id,
      token,
      usado: false,
      fecha_creacion: new Date(),
    })

    try {
      await enviarCorreoActivacion(usuario.email, token)
    } catch (error) {
      console.error('Error al enviar el correo de activación:', error)
      return response.status(500).json({
        mensaje: 'El usuario fue creado, pero no se pudo enviar el correo de activación.',
      })
    }

    return response.created({
      mensaje: 'Usuario registrado correctamente.',
      usuario: {
        id: usuario.id,
        email: usuario.email,
        rol: rol.nombre,
        activo: usuario.activo,
      },
    })
  }

  public async activarCuenta({ params, response }: HttpContext) {
    const { token } = params

    const activacion = await Activacion.query()
      .where('token', token)
      .andWhere('usado', false)
      .first()

    if (!activacion) {
      return response.status(400).json({
        mensaje: 'Token inválido o ya ha sido utilizado.',
      })
    }

    const usuario = await Usuario.findOrFail(activacion.usuario_id)
    usuario.activo = true
    await usuario.save()

    activacion.usado = true
    await activacion.save()

    return response.send(`
      <html>
        <head><title>Cuenta activada</title></head>
        <body style="font-family: Arial; text-align: center; margin-top: 50px;">
        <h2 style="color: green;">¡Tu cuenta ha sido activada correctamente!</h2>
        <p>Ya puedes iniciar sesión en la plataforma.</p>
        </body>
      </html>
    `)
  }

  public async login({ request, response }: HttpContext) {
    const datos = await request.validateUsing(loginUsuarioValidator)

    const usuario = await Usuario.query()
      .where('email', datos.email)
      .preload('rol')
      .first()

    if (!usuario) {
      return response.status(401).json({ mensaje: 'Usuario no existe' })
    }

    const contrasenaValida = await hash.verify(usuario.password, datos.password)
    if (!contrasenaValida) {
      return response.status(401).json({ mensaje: 'Credenciales incorrectas' })
    }

    if (!usuario.activo) {
      return response.status(403).json({ mensaje: 'La cuenta no ha sido activada' })
    }

    if (!usuario.twofaActivo) {
      const payload = {
        sub: usuario.id,
        email: usuario.email,
        rol: usuario.rol.nombre,
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' })

      return response.ok({
        mensaje: 'Inicio de sesión exitoso',
        token,
        usuario: {
          id: usuario.id,
          email: usuario.email,
          rol: usuario.rol.nombre,
        },
      })
    }

    // Si el usuario tiene 2FA activado
    const codigo = generarCodigo2FA()
    const expiracion = DateTime.now().plus({ minutes: 5 })

    usuario.codigo2fa = codigo
    usuario.expiracionCodigo2fa = expiracion
    await usuario.save()

    try {
      await enviarCodigo2FA(usuario.email, codigo)
    } catch (error) {
      console.error('Error enviando correo 2FA:', error)
      return response.status(500).json({ mensaje: 'Error enviando código de verificación 2FA' })
    }

    return response.status(202).json({
      mensaje: 'Código de verificación enviado. Verifica tu correo para completar el inicio de sesión.',
      requiere2fa: true,
      usuario_id: usuario.id,
    })
  }

  public async verificarCodigo2fa({ request, response }: HttpContext) {
    const datos = await request.validateUsing(codigo2faValidator)

    const usuario = await Usuario.query()
      .where('id', datos.usuario_id)
      .preload('rol')
      .first()

    if (!usuario || !usuario.codigo2fa || !usuario.expiracionCodigo2fa) {
      return response.status(400).json({ mensaje: 'Código inválido o expirado' })
    }

    if (usuario.codigo2fa !== datos.codigo) {
      return response.status(401).json({ mensaje: 'Código de verificación incorrecto' })
    }

    if (usuario.expiracionCodigo2fa < DateTime.now()) {
      return response.status(401).json({ mensaje: 'El código ha expirado' })
    }

    // Código correcto, generamos JWT
    const payload = {
      sub: usuario.id,
      email: usuario.email,
      rol: usuario.rol.nombre,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' })

    // Limpiamos el código de 2FA
    usuario.codigo2fa = undefined
    usuario.expiracionCodigo2fa = undefined
    await usuario.save()

    return response.ok({
      mensaje: 'Autenticación completada exitosamente.',
      token,
      usuario: {
        id: usuario.id,
        email: usuario.email,
        rol: usuario.rol.nombre,
      },
    })
  }
}
