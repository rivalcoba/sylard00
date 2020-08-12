import {Router} from 'express'
// Creating an instance from the express router
const router = new Router();

// Import Controllers
import userController from '@controllers/user'

// Validators
import editUserFormValidation from '@validators/editUserFormValidation'

// Authorization Check Middleware
import ensureAuthenticated from '@helpers/ensureAuth'

/* GET users listing. */
router.get('/edit', ensureAuthenticated, userController.edit);
// Cambiar a put
router.put('/edit', ensureAuthenticated, editUserFormValidation, userController.editUser);

module.exports = router;
