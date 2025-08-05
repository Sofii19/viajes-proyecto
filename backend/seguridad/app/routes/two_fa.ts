import router from '@adonisjs/core/services/router'
import TwoFactorAuthController from '#controllers/two_fa_controller'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('/setup', [TwoFactorAuthController, 'setup'])
    router.patch('/activar', [TwoFactorAuthController, 'activar'])
    router.patch('/desactivar', [TwoFactorAuthController, 'desactivar'])
  })
  .prefix('/auth/2fa')
  .use([middleware.verificarJWT()]) // Usuario debe estar autenticado

// Esta ruta no requiere auth porque se llama desde el login
router.post('/auth/2fa/verificar-login', [TwoFactorAuthController, 'verificarLogin'])
