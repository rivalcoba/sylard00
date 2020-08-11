import {Router} from 'express'
// Creating an instance from the express router
const router = new Router();

// Import Controllers
import userController from '@controllers/user'

// Authorization Check Middleware
import ensureAuthenticated from '@helpers/ensureAuth'

/* GET users listing. */
router.get('/edit', ensureAuthenticated, userController.edit);

module.exports = router;
