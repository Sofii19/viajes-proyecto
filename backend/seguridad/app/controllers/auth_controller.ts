import type { HttpContext } from '@adonisjs/core/http'
import { cuid } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import Usuario from '#models/usuario'
import Activacion from '#models/activacion'
import Rol from '#models/rol'
import { registroUsuarioValidator } from '#validators/registrar_usuario'
import { enviarCorreoActivacion } from '../utils/email.js'
import { loginUsuarioValidator } from '#validators/login_usuario'
import jwt from 'jsonwebtoken'

export default class AuthController {
public async register({ request, response }: HttpContext) {
    const datos = await request.validateUsing(registroUsuarioValidator)

    // Verificar si el correo ya está registrado
    const existe = await Usuario.findBy('email', datos.email)
    if (existe) {
      return response.status(400).json({
        mensaje: 'El correo electrónico ya está registrado',
      })
    }

    // Asignar el rol 'cliente' por defecto
    const rol = await Rol.findBy('nombre', 'cliente')
    if (!rol) {
      return response.status(400).json({
        mensaje: 'El rol especificado no es válido',
      })
    }

    // Crear el usuario con los campos seguros (sin permitir rol ni activo desde el request)
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

    // Generar y guardar token de activación si no está activo
    const token = cuid()
    await Activacion.create({
      usuario_id: usuario.id,
      token,
      usado: false,
      fecha_creacion: new Date(),
    })

    // Enviar correo de activación
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

  // ✅ Activar cuenta
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

  // ✅ Inicio de sesión
  public async login({ request, response }: HttpContext) {
    const datos = await request.validateUsing(loginUsuarioValidator)

    const usuario = await Usuario.query()
      .where('email', datos.email)
      .preload('rol')
      .first()

    if (!usuario) {
      return response.status(401).json({ mensaje: 'Credenciales incorrectas' })
    }

    const contrasenaValida = await hash.verify(usuario.password, datos.password)
    if (!contrasenaValida) {
      return response.status(401).json({ mensaje: 'Credenciales incorrectas' })
    }

    if (!usuario.activo) {
      return response.status(403).json({ mensaje: 'La cuenta no ha sido activada' })
    }

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
}
