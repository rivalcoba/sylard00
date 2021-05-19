import { Router } from 'express'

// Creating an instance from the express router
const router = new Router()

// Import Controller
import genreController from '@controllers/genre'

// Import Validator
import genreValidator from '@validators/genres/genre'
import ensureAuthenticated from '@helpers/ensureAuth'
// Assing Routers
router.get(
    '/',
    ensureAuthenticated,
    genreController.genresindex
);
router.get('/contact', genreController.genresindex)
// CREATE - POST
router.post('/api/create', genreValidator.genrePost, genreController.api_postGenres)
// READ - GET
router.get('/api/index', genreController.api_getGenres)
router.get('/api', genreController.api_getGenres)
// UPDATE - PUT
// url example: http://localhost:3000/genres/api/update/:genre_id
router.put('/api/update/:genre_id',genreValidator.genrePut, genreController.api_putGenres)
// DELETE - DELETE
router.delete('/api/delete/:genre_id', genreController.api_deleteGenres)

//   ___  ______ _____ 
//  / _ \ | ___ \_   _|
// / /_\ \| |_/ / | |  
// |  _  ||  __/  | |  
// | | | || |    _| |_ 
// \_| |_/\_|    \___/ 


export default router
