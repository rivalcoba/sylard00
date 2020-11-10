// Imporntando el Enrutador
import { Router } from 'express'
// Creating an instance from the express router
const router = new Router()
// Authorization Check Middleware
import ensureAuthenticated from '@helpers/ensureAuth'
import ensureColabUser from '@validators/ensureColabUser'

import audioannotationsController from '@controllers/audioannotations'

import multer from 'multer'

var cors = require('cors')

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
  audioannotationsController.addAudioannotation
)

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
   // cb(null, 'uploads')
   cb(null, 'server/public/eaf')
  },
  filename: function (req, file, cb) {
    let fileName = file.originalname+'-' + Date.now()+'.eaf'
    req.fname = fileName;
    cb(null,fileName)
   // save this on the app object as a configuration
       
  }
})

var upload = multer({ storage: storage })
router.post(
  '/uploadfile',upload.single('myFile'),cors(),
   ensureAuthenticated,
  ensureColabUser,
audioannotationsController.uploadfileAudioannotation
)

// Show Form to create a audioannotation
router.get(
  '/create',
  ensureAuthenticated,cors(),
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

router.get(
  '/vuetest',
   ensureAuthenticated,
  ensureColabUser,
   audioannotationsController.vuetestAudioannotaion
   )
// Configurar cabeceras y cors https://filesamples.com/formats/mp3 //no funciona marca error en cors
//router.get('/', function(req, res) {
//    res.setHeader('Access-Control-Allow-Origin', '*');
//    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
//    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
//    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

//    res.send('cors problem fixed:)');
//});

// Se exportan rutas
export default router