// Imporntando el Enrutador
import {Router} from 'express'
// Creating an instance from the express router
const router = new Router();
// Authorization Check Middleware
import ensureAuthenticated from '@helpers/ensureAuth'
import ensureColabUser from '@validators/ensureColabUser'
// Import Controllers
import collectionsController from '@controllers/collections'
// Import validators
import collectionValidator from '@validators/collection'

// Collections Routes
// Lista las colecciones del usuario
router.get('/',ensureAuthenticated, ensureColabUser,collectionsController.index)
router.get('/create',ensureAuthenticated, ensureColabUser,collectionsController.createCollection)
router.post('/add',/*ensureAuthenticated, ensureColabUser,*/collectionValidator,collectionsController.addCollection)

// Se exportan rutas
export default router