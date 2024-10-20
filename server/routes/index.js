import { Router } from 'express'

// Creating an instance from the express router
const router = new Router();

// Authorization Check Middleware
import ensureAuthenticated from '@helpers/ensureAuth'
import ensureSuAuth from '@helpers/ensureSuAuth'
// Import Controllers
import homeController from '@controllers/home'


/* GET home page. */
// Index Controllers
router.get('/', homeController.index);
router.get('/index', homeController.index);
router.get('/contact', homeController.contact)
router.get('/credits', homeController.credits)
router.get('/dashboard', ensureAuthenticated, homeController.dashboard)
router.get('/suCollectionsDashboard', ensureSuAuth, homeController.suCollectionsDashboard)
router.get('/suAudiosDashboard', ensureSuAuth, homeController.suAudiosDashboard)
router.get('/catalog',homeController.catalog)
router.get('/source_code',homeController.source_code)
router.get('/audioannotation', ensureAuthenticated, homeController.audioannotation)
router.get('/documentation', homeController.documentation)
router.get('/usermanual', homeController.usermanual)
router.get('/terms', homeController.terms)
router.get('/cleaneafs', homeController.cleanEaf)
    //router.get('/test', homeController.test)
    //router.get('/vuetest', homeController.vuetest)
    //router.get('/audioannotations',homeController.audioannotations)
// =====================> API <===============
router.get('/i18n', homeController.i18n)
router.get('/testmail/:email', homeController.testMail)

export default router