import {Router} from 'express'

// Creating an instance from the express router
const router = new Router();

// Import Controllers
import homeController from '@controllers/home'

/* GET home page. */
router.get('/', homeController.index);
router.get('/index', homeController.index);
router.get('/contact', homeController.contact)
router.get('/credits', homeController.credits)
router.get('/dashboard', homeController.dashboard)
router.get('/documentation', homeController.documentation)
router.get('/login', homeController.login)
router.get('/register', homeController.register)
router.get('/usermanual', homeController.usermanual)

export default router
