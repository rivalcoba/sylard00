import {Router} from 'express'

// Creating an instance from the express router
const router = new Router();

// Import Controllers
import authController from '@controllers/auth'

// Authorization Check Middleware
import ensureAuthenticated from '@helpers/ensureAuth'
// Import validator midlewares
import emailConfirmValidator from '@validators/email-confirm'
import registerValidation from '@validators/registerValidation'

// Auth Controllers
router.get('/register', authController.register)
router.post('/register/user', registerValidation, authController.registerUser)
router.get('/email/confirm/:token', emailConfirmValidator, authController.emailConfirmed)
router.get('/login', authController.login)
router.post('/login/user', authController.loginUser)
router.get('/logout', authController.logoutUser)

export default router
