import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import Rol from '#models/rol'
import { registroUsuarioValidator } from '#validators/registrar_usuario'
import { actualizarUsuarioValidator } from '#validators/actualizar_usuario'

// Función utilitaria para limpiar valores `null` en cualquier objeto
function limpiarCamposNulos<T extends Record<string, any>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, valor]) => valor !== null)
  ) as Partial<T>
}

export default class UsuariosController {
  // GET /usuarios
  async index({ response }: HttpContext) {
    const usuarios = await Usuario.query().preload('rol')
    return response.ok(usuarios)
  }

  // GET /usuarios/:id
  async show({ params, response }: HttpContext) {
    const usuario = await Usuario.find(params.id)
    if (!usuario) {
      return response.notFound({ mensaje: 'Usuario no encontrado' })
    }

    await usuario.load('rol')
    return response.ok(usuario)
  }

  // POST /usuarios
  async store({ request, response }: HttpContext) {
    const datosValidados = await request.validateUsing(registroUsuarioValidator)
    const datos = limpiarCamposNulos(datosValidados)

    if (datos.segundoNombre === null) datos.segundoNombre = undefined
    if (datos.apellidoMaterno === null) datos.apellidoMaterno = undefined

    const rol = await Rol.findBy('nombre', datos.rol)
    if (!rol) {
    return response.status(400).json({
      mensaje: 'El rol especificado no existe',
    })
  }

    const datosCompatibles = {
      ...datos,
      segundoNombre: datos.segundoNombre ?? undefined,
      apellidoMaterno: datos.apellidoMaterno ?? undefined,
      activo: true,
      rolId: rol.id,
    }

    const usuario = await Usuario.create(datosCompatibles)
    await usuario.load('rol')

    return response.created({
      mensaje: 'Usuario creado correctamente',
      usuario,
    })
  }

    // PUT /usuarios/:id
    async update({ params, request, response }: HttpContext) {
    const usuario = await Usuario.find(params.id)
    if (!usuario) {
        return response.notFound({ mensaje: 'Usuario no encontrado' })
    }

    const datosValidados = await request.validateUsing(actualizarUsuarioValidator)

    // Convertir null a undefined en campos opcionales
    if (datosValidados.segundoNombre === null) {
        datosValidados.segundoNombre = undefined
    }

    if (datosValidados.apellidoMaterno === null) {
        datosValidados.apellidoMaterno = undefined
    }

    // Eliminar claves con valor null (por seguridad extra)
    const datosCompatibles = Object.fromEntries(
        Object.entries(datosValidados).filter(([_, v]) => v !== null)
    )

    usuario.merge(datosCompatibles)
    await usuario.save()
    await usuario.load('rol')

    return response.ok({
        mensaje: 'Usuario actualizado correctamente',
        usuario,
    })
    }

  // DELETE /usuarios/:id
  async destroy({ params, response }: HttpContext) {
    const usuario = await Usuario.find(params.id)
    if (!usuario) {
      return response.notFound({ mensaje: 'Usuario no encontrado' })
    }

    await usuario.delete()
    return response.ok({ mensaje: 'Usuario eliminado correctamente' })
  }
}
