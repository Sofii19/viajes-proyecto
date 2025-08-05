import router from '@adonisjs/core/services/router'
import AuthController from '#controllers/auth_controller'

router
  .group(() => {
    router.post('/register/cliente', [AuthController, 'registerCliente'])
    router.post('/register/administrador', [AuthController, 'registerAdmin'])
    router.post('/login', [AuthController, 'login'])
  })
  .prefix('/auth')
