import {Router} from 'express'
// Creating an instance from the express router
const router = new Router();

// Import Controllers
import userController from '@controllers/user'

// Validators
import editUserFormValidation from '@validators/editUserFormValidation'
import editPasswordFormValidation from '@validators/editPasswordFormValidation'
import confirmEmailAccount from '@validators/confirmEmailAccount'

// Authorization Check Middleware
import ensureAuthenticated from '@helpers/ensureAuth'

/* GET users listing. */
router.get('/',ensureAuthenticated, userController.index)

router.get('/edit', ensureAuthenticated, userController.edit);
router.put('/edit', ensureAuthenticated, editUserFormValidation, userController.editUser);

router.get('/edit/password', ensureAuthenticated, userController.editPassword);
router.put('/edit/password', ensureAuthenticated, editPasswordFormValidation, userController.editUserPassword);

router.get('/reset/password', userController.resetPassword);
router.put('/reset/password',confirmEmailAccount, userController.resetUserPassword);

// API
router.get('/api/getusers', userController.api_getUsers)

module.exports = router;
