"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _express=require("express"),_path=_interopRequireDefault(require("path")),_ensureAuth=_interopRequireDefault(require("../helpers/ensureAuth")),_ensureColabUser=_interopRequireDefault(require("../validators/ensureColabUser")),_audioannotations=_interopRequireDefault(require("../controllers/audioannotations")),_multer=_interopRequireDefault(require("multer"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}// Imporntando el Enrutador
// IMporntando Path
// Creating an instance from the express router
const router=new _express.Router;// Authorization Check Middleware
var cors=require("cors");router.get("/",_ensureAuth.default,_ensureColabUser.default,_audioannotations.default.index),router.get("/index/:audioannotationId",_ensureAuth.default,_ensureColabUser.default,_audioannotations.default.indexById),router.post("/add",_ensureAuth.default,_ensureColabUser.default,_audioannotations.default.addAudioannotation);var storage=_multer.default.diskStorage({destination:function(a,b,c){// resolving temp path
let d=_path.default.join(__dirname,"..","public","eaf");console.log(`>> eafPath: ${d}`),c(null,d)},filename:function(a,b,c){let d=b.originalname+"-"+Date.now()+".eaf";a.fname=d,c(null,d)}}),upload=(0,_multer.default)({storage:storage});router.post("/uploadfile",upload.single("myFile"),cors(),_ensureAuth.default,_ensureColabUser.default,_audioannotations.default.uploadfileAudioannotation),router.get("/create",_ensureAuth.default,cors(),_ensureColabUser.default,_audioannotations.default.createAudioannotation),router.get("/edit/:audioannotation_id",_ensureAuth.default,_ensureColabUser.default,_audioannotations.default.editAudioannotation),router.put("/edit/:audioannotation_id",_ensureAuth.default,_ensureColabUser.default,_audioannotations.default.editAudioannotation),router.delete("/delete/:audioannotation_id",_ensureAuth.default,_ensureColabUser.default,_audioannotations.default.deleteAudioannotaion),router.get("/vuetest/:audioannotation_id",_ensureAuth.default,_ensureColabUser.default,_audioannotations.default.vuetestAudioannotaion);/*
router.get(
  '/filter',
  ensureAuthenticated,
  ensureColabUser,
  audioannotationsController.filtrarAudioannotation
)*/ // Configurar cabeceras y cors https://filesamples.com/formats/mp3 //no funciona marca error en cors
//router.get('/', function(req, res) {
//    res.setHeader('Access-Control-Allow-Origin', '*');
//    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
//    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
//    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
//    res.send('cors problem fixed:)');
//});
// Se exportan rutas
var _default=router;exports.default=_default;