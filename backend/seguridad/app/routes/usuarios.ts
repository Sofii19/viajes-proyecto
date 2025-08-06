import router from '@adonisjs/core/services/router'
import UsuariosController from '#controllers/usuarios_controller'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('/:id', [UsuariosController, 'show'])
    router.delete('/:id', [UsuariosController, 'destroy'])
    router.patch('/:id', [UsuariosController, 'updateProfile'])
  })
  .prefix('/admin/usuario')
  .use([middleware.verificarJWT()])

router
  .group(() => {
    router.get('/', [UsuariosController, 'index'])
    router.post('/', [UsuariosController, 'store'])
    router.put('/:id', [UsuariosController, 'update'])
  })
  .prefix('/admin/usuario')
  .use([middleware.verificarJWT(), middleware.verificarRol(['administrador'])])