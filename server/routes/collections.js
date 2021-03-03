// Imporntando el Enrutador
import { Router } from 'express'
// Creating an instance from the express router
const router = new Router()
    // Authorization Check Middleware
import ensureAuthenticated from '@helpers/ensureAuth'
import ensureColabUser from '@validators/ensureColabUser'
// Import Controllers
import collectionsController from '@controllers/collections'
// Import validators
import collectionValidator from '@validators/collections/collection'
import collectionEditionValidator from '@validators/collections/collectionsEdition'

// Collections Routes
// Lista las colecciones del usuario
router.get(
        '/',
        ensureAuthenticated,
        ensureColabUser,
        collectionsController.index
    )
    // Show Form to create a collection
router.get(
        '/create',
        ensureAuthenticated,
        ensureColabUser,
        collectionsController.createCollection
    )
    // Process a collection creation request
router.post(
        '/add',
        ensureAuthenticated,
        ensureColabUser,
        collectionValidator,
        collectionsController.addCollection
    )
    // Index Collection
router.get('/index/:collectionId',
    ensureAuthenticated,
    ensureColabUser,
    collectionsController.indexCollection)



// Show the edition of a collection form
router.get(
    '/edit/:collection_id',
    ensureAuthenticated,
    ensureColabUser,
    collectionsController.editCollectionForm
)

// Update a Collection
router.put(
        '/edit/:collection_id',
        ensureAuthenticated,
        ensureColabUser,
        collectionEditionValidator,
        collectionsController.editCollection
    )
    // Delete a Collection
router.delete(
    '/delete/:collection_id',
    ensureAuthenticated,
    ensureColabUser,
    collectionsController.deleteCollection
)

// API
router.get(
    '/api/read/:collection_id',
    /*ensureAuthenticated,
    ensureColabUser,*/ // TODO: Uncomment to protect route
    collectionsController.api_getCollectionById
)

// API ALL WITH PAG
router.get(
    '/api/read_all/:page',
    /*ensureAuthenticated,
    ensureColabUser,*/ // TODO: Uncomment to protect route
    collectionsController.api_getCollectionAll
)

router.get('/api/index/:userId',
    /*ensureAuthenticated,
      ensureColabUser,*/ // TODO: Uncomment to protect route
    collectionsController.api_getCollectionByUser
)

router.delete('/api/delete/:collection_id',
    /*ensureAuthenticated,
    ensureColabUser,*/ // TODO: Uncomment to protect route,
    collectionsController.api_delCollectionById)

router.delete('/api/delete', collectionsController.api_delete)

// Se exportan rutas
export default router