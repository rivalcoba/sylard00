import { Router } from 'express'

// Creating an instance from the express router
const router = new Router()

// Import Controller
import genreController from '@controllers/genre'

// Import Validator
import genreValidator from '@validators/genres/genre'

// Assing Routers

// CREATE - POST
router.post('/api/create', genreValidator.genrePost, genreController.api_postGenres)
// READ - GET
router.get('/api/index', genreController.api_getGenres)
router.get('/api', genreController.api_getGenres)
// UPDATE - PUT
// url example: http://localhost:3000/genres/api/update/:genre_id
router.put('/api/update/:genre_id', genreController.api_putGenres)
// DELETE - DELETE
router.delete('/api/delete/:genre_id', genreController.api_deleteGenres)

export default router
