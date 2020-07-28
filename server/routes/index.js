import {Router} from 'express'

// Creating an instance from the express router
const router = new Router();

// Import Controllers
import homeController from '@controllers/home'

/* GET home page. */
router.get('/', homeController.index);
router.get('/dashboard', homeController.dashboard)

export default router
