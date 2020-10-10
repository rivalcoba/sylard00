// Imporntando el Enrutador
import { Router } from 'express'
// Creating an instance from the express router
const router = new Router()
// Authorization Check Middleware
import ensureAuthenticated from '@helpers/ensureAuth'
import ensureColabUser from '@validators/ensureColabUser'

import audioannotationsController from '@controllers/audioannotations'

import multer from 'multer'

router.get(
  '/',
    ensureAuthenticated,
  ensureColabUser,
  audioannotationsController.index
)

router.post(
  '/add',
    ensureAuthenticated,
  ensureColabUser,
  //me quede aqui guardando este error 
 audioannotationsController.addAudioannotation
)

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+'.eaf')
  }
})
var upload = multer({ storage: storage })
router.post(
  '/uploadfile',upload.single('myFile'),
   ensureAuthenticated,
  ensureColabUser,
audioannotationsController.uploadfileAudioannotation
)

// Show Form to create a audioannotation
router.get(
  '/create',
  ensureAuthenticated,
  ensureColabUser,
  audioannotationsController.createAudioannotation
)

router.get(
  '/edit/:audioannotation_id',
    ensureAuthenticated,
  ensureColabUser,
   audioannotationsController.editAudioannotation
)

// Update a Collection
router.put(
  '/edit/:audioannotation_id',
    ensureAuthenticated,
  ensureColabUser,
   audioannotationsController.editAudioannotation
)
// Delete a Collection
router.delete(
  '/delete/:audioannotation_id',
    ensureAuthenticated,
  ensureColabUser,
   audioannotationsController.deleteAudioannotaion
)

// Se exportan rutas
export default router