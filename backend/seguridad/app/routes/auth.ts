import router from '@adonisjs/core/services/router'
import AuthController from '#controllers/auth_controller'

router.group(() => {
  router.post('/register', [AuthController, 'register'])
  router.post('/login', [AuthController, 'login'])
}).prefix('/auth')
