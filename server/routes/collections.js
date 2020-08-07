// Imporntando el Enrutador
import {Router} from 'express'
// Creating an instance from the express router
const router = new Router();
// Authorization Check Middleware
import ensureAuthenticated from '@helpers/ensureAuth'
import ensureColabUser from '@validators/ensureColabUser'
// Import Controllers
import collectionsController from '@controllers/collections'

// Collections Routes
// Lista las colecciones del usuario
router.get('/',ensureAuthenticated, ensureColabUser,collectionsController.index)

// Se exportan rutas
export default router