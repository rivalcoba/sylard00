// Imporntando el Enrutador
import {Router} from 'express'
// Import Model

// Creating an instance from the express router
const router = new Router();

// Authorization Check Middleware
// import ensureAuthenticated from '@helpers/ensureAuth'
// import ensureColabUser from '@validators/ensureColabUser'

// Import Controllers
import locationsController from '@controllers/locations'

// Collections Routes
router.get('/index',/*ensureAuthenticated, ensureColabUser,*/locationsController.index)
// API Lista las colecciones del usuario
router.get('/index/nomloc/:nom_loc',/*ensureAuthenticated, ensureColabUser,*/locationsController.indexNomLoc)
router.get('/index/municipalitiesOf/:nom_ent',/*ensureAuthenticated, ensureColabUser,*/locationsController.getMunicipalities)
router.get('/index/localitiesOf/:nom_ent/:nom_mun',/*ensureAuthenticated, ensureColabUser,*/locationsController.getLocalities)
router.get('/find/:nom_ent/:nom_mun/:nom_loc',/*ensureAuthenticated, ensureColabUser,*/locationsController.findLocality)


// Se exportan rutas
export default router