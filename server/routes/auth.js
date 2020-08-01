import {Router} from 'express'

// Creating an instance from the express router
const router = new Router();

// Import Controllers
import authController from '@controllers/auth'

// Import validator midlewares
import emailConfirmValidator from '@validators/email-confirm'
import duplicateUserValidation from '@validators/duplicateUserValidation'

// Auth Controllers
router.get('/register', authController.register)
router.post('/register/user',duplicateUserValidation, authController.registerUser)
router.get('/email/confirm/:token', emailConfirmValidator, authController.emailConfirmed)
router.get('/login', authController.login)
router.get('/login/error', authController.loginError)
router.post('/login/user', authController.loginUser)
router.get('/logout', authController.logoutUser)
    
export default router
