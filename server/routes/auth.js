import {Router} from 'express'

// Creating an instance from the express router
const router = new Router();

// Import Controllers
import authController from '@controllers/auth'

// Auth Controllers
router.get('/register', authController.register)
router.post('/register/user', authController.registerUser)
router.get('/login', authController.login)
router.post('/login/user', authController.loginUser)

export default router
