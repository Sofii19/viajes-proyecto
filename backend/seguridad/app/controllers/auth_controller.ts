import type { HttpContext } from '@adonisjs/core/http'
import { cuid } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import jwt from 'jsonwebtoken'
import { DateTime } from 'luxon'

import Usuario from '#models/usuario'
import Activacion from '#models/activacion'
import Rol from '#models/rol'

import { registroUsuarioValidator } from '#validators/registrar_usuario'
import { loginUsuarioValidator } from '#validators/login_usuario'
import { enviarCorreoActivacion, enviarCodigo2FA } from '../utils/email.js'
import { generarCodigo2FA } from '../utils/codigo2fa.js'

export default class AuthController {
  public async registerCliente({ request, response }: HttpContext) {
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

  public async registerAdmin({ request, response }: HttpContext) {
    const datos = await request.validateUsing(registroUsuarioValidator)

    const existe = await Usuario.findBy('email', datos.email)
    if (existe) {
      return response.status(400).json({ mensaje: 'El correo electrónico ya está registrado' })
    }

    const rol = await Rol.findBy('nombre', 'administrador')
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
      activo: true,
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
      mensaje: 'Administrador registrado correctamente.',
      usuario: {
        id: usuario.id,
        email: usuario.email,
        rol: rol.nombre,
        activo: usuario.activo,
      },
    })
  }

  public async login({ request, response }: HttpContext) {
    const datos = await request.validateUsing(loginUsuarioValidator)

    const usuario = await Usuario.query().where('email', datos.email).preload('rol').first()

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
      const payload = { sub: usuario.id, email: usuario.email, rol: usuario.rol.nombre }
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
      mensaje: 'Ingresa el codigo de Authenticator Google',
      requiere2fa: true,
      usuario_id: usuario.id,
    })
  }
}
