import type { HttpContext } from '@adonisjs/core/http'
import Activacion from '#models/activacion'
import Usuario from '#models/usuario'

export default class ActivacionController {
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
}
