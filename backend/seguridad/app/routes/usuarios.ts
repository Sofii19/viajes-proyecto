import router from '@adonisjs/core/services/router'
import UsuariosController from '#controllers/usuarios_controller'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('/', [UsuariosController, 'index'])
    router.get('/:id', [UsuariosController, 'show'])
    router.post('/', [UsuariosController, 'store'])
    router.put('/:id', [UsuariosController, 'update'])
    router.delete('/:id', [UsuariosController, 'destroy'])
  })
  .prefix('/admin/usuario')
  .use([
    middleware.verificarJWT(),
    middleware.verificarRol(['administrador']),
  ])