import router from '@adonisjs/core/services/router'
import AdminController from '#controllers/admin_controller'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.post('/crear', [AdminController, 'crearAdministrador'])
  })
  .prefix('/admin')
  .use([middleware.verificarJWT(), middleware.verificarRol(['administrador'])])
