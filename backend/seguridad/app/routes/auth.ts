import router from '@adonisjs/core/services/router'
import AuthController from '#controllers/auth_controller'

// Agrupar todas las rutas de autenticación bajo /auth
router.group(() => {
  router.post('/register', [AuthController, 'register'])
  router.get('/activar/:token', [AuthController, 'activarCuenta'])
  router.post('/login', [AuthController, 'login'])
}).prefix('/auth')
