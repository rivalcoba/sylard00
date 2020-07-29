import {Router} from 'express'

// Creating an instance from the express router
const router = new Router();

// Import Controllers
import homeController from '@controllers/home'

/* GET home page. */
// Index Controllers
router.get('/', homeController.index);
router.get('/index', homeController.index);
router.get('/contact', homeController.contact)
router.get('/credits', homeController.credits)
router.get('/dashboard', homeController.dashboard)
router.get('/documentation', homeController.documentation)
router.get('/usermanual', homeController.usermanual)
router.get('/terms', homeController.terms)

export default router
