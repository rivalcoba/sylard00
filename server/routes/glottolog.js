// Imporntando el Enrutador
import {Router} from 'express'

// Creating an instance from the express router
const router = new Router();

// Authorization Check Middleware
// import ensureAuthenticated from '@helpers/ensureAuth'
// import ensureColabUser from '@validators/ensureColabUser'

// Import Controllers
import glottologController from '@controllers/glottolog'

// Show test form
router.get('/index', glottologController.index)
router.get('/getLanguageList', glottologController.getLanguageList)
router.get('/parentTree/gid/:gid', glottologController.parentTreeByGid)
router.get('/getLanguageList/:name', glottologController.getLanguageListByName)

export default router