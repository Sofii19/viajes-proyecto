import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import Rol from '#models/rol'
import hash from '@adonisjs/core/services/hash'
import { registroAdministradorValidator } from '#validators/registro_administrador'

export default class AdminController {
  public async crearAdministrador({ request, response }: HttpContext) {
    const datos = await request.validateUsing(registroAdministradorValidator)

    const existente = await Usuario.findBy('email', datos.email)
    if (existente) {
      return response.badRequest({ mensaje: 'El correo ya está registrado' })
    }

    const rolAdmin = await Rol.findByOrFail('nombre', 'administrador')

    const nuevoAdmin = await Usuario.create({
      primerNombre: datos.primerNombre,
      segundoNombre: datos.segundoNombre ?? undefined,
      apellidoPaterno: datos.apellidoPaterno,
      apellidoMaterno: datos.apellidoMaterno ?? undefined,
      email: datos.email,
      password: await hash.make(datos.password),
      rolId: rolAdmin.id,
      activo: true,
    })

    return response.created({
      mensaje: 'Administrador creado correctamente',
      usuario: {
        id: nuevoAdmin.id,
        email: nuevoAdmin.email,
        rol: rolAdmin.nombre,
      },
    })
  }
}
