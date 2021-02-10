// Imporntando el Enrutador
import { Router } from 'express'
// IMporntando Path
import path from 'path'
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

router.get(
  '/index/:audioannotationId',
  ensureAuthenticated,
  ensureColabUser,
  audioannotationsController.indexById
)

router.post(
  '/add',
  ensureAuthenticated,
  ensureColabUser,
  audioannotationsController.addAudioannotation
)

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // resolving temp path
    let eafPath = path.join(__dirname,'..','public','eaf')
    console.log(`>> eafPath: ${eafPath}`);
    cb(null, eafPath)
  },
  filename: function(req, file, cb) {
    let fileName = file.originalname + '-' + Date.now() + '.eaf'
    req.fname = fileName
    cb(null, fileName)
    // save this on the app object as a configuration
  },
})

var upload = multer({ storage: storage })
router.post(
  '/uploadfile',
  upload.single('myFile'),
  cors(),
  ensureAuthenticated,
  ensureColabUser,
  audioannotationsController.uploadfileAudioannotation
)

// Show Form to create a audioannotation
router.get(
  '/create',
  ensureAuthenticated,
  cors(),
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
  //ensureAuthenticated,
  //ensureColabUser,
  audioannotationsController.deleteAudioannotaion
)

//router.get(
//  '/vuetest/:audioannotation_id',
router.get(
  '/vuetest/:audioannotation_id',
  
  ensureAuthenticated,
  ensureColabUser,
  audioannotationsController.vuetestAudioannotaion
)

router.get(
  '/filter/:page',
   ensureAuthenticated,
   ensureColabUser,
  audioannotationsController.filtrarAudioannotation
)


router.get(
  '/color',
  ensureAuthenticated,
  ensureColabUser,
  audioannotationsController.color)
  
  // Configurar cabeceras y cors https://filesamples.com/formats/mp3 //no funciona marca error en cors
  //router.get('/', function(req, res) {
    //    res.setHeader('Access-Control-Allow-Origin', '*');
    //    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    //    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    //    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    
    //    res.send('cors problem fixed:)');
    //});
    
    //   ___  ______ _____ 
    //  / _ \ | ___ \_   _|
    // / /_\ \| |_/ / | |  
    // |  _  ||  __/  | |  
    // | | | || |    _| |_ 
    // \_| |_/\_|    \___/ 
    
    router.post('/api/update/:audioannotationId',
    /*ensureAuthenticated,
    ensureColabUser,*/ // TODO: Uncomment to protect route
    audioannotationsController.api_updateAudioAnnot
    )
    
    router.get(
      '/api/index/:id/:page',
      //ensureAuthenticated,
      //ensureColabUser,
      audioannotationsController.api_indexAudioannotationsByCollection
    )
// Se exportan rutas
export default router
