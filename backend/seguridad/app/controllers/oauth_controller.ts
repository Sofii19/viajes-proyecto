import type { HttpContext } from '@adonisjs/core/http'
import OAuthService from '#services/oauth_service'

export default class SocialAuthController {
  async redirectToProvider({ ally, params, response }: HttpContext) {
    const provider = params.provider

    if (!['google', 'facebook', 'microsoft'].includes(provider)) {
      return response.badRequest({ mensaje: 'Proveedor no soportado' })
    }

    const url = await ally.use(provider).redirectUrl()
    return response.redirect(url)
  }

  async handleCallback(ctx: HttpContext) {
    const service = new OAuthService()
    return service.handleCallback(ctx)
  }
}
