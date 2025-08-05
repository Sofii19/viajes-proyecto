import router from '@adonisjs/core/services/router'
import SocialAuthController from '#controllers/oauth_controller'

router.get('/auth/:provider', [SocialAuthController, 'redirectToProvider'])
router.get('/auth/:provider/callback', [SocialAuthController, 'handleCallback'])
