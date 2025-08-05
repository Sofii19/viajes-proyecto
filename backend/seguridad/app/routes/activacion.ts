import router from '@adonisjs/core/services/router'
import ActivacionController from '#controllers/activacion_controller'

router.group(() => {
  router.get('/activar/:token', [ActivacionController, 'activarCuenta'])
}).prefix('/auth')
