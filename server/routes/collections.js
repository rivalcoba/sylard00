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
// Show Form to create a collection
router.get('/create',ensureAuthenticated, ensureColabUser,collectionsController.createCollection)
// Process a collection creation request
router.post('/add',ensureAuthenticated, ensureColabUser,collectionValidator,collectionsController.addCollection)
// Show the edition of a collection form
router.get('/edit/:collection_id',ensureAuthenticated, ensureColabUser,collectionsController.editCollectionForm)
// Update a Collection
router.put('/edit/:collection_id',ensureAuthenticated, ensureColabUser,collectionValidator,collectionsController.editCollection)
// Delete a Collection
router.delete('/delete/:collection_id',ensureAuthenticated, ensureColabUser,collectionsController.deleteCollection)

// Se exportan rutas
export default router