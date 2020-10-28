"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _express=require("express"),_ensureAuth=_interopRequireDefault(require("../helpers/ensureAuth")),_ensureColabUser=_interopRequireDefault(require("../validators/ensureColabUser")),_audioannotations=_interopRequireDefault(require("../controllers/audioannotations")),_multer=_interopRequireDefault(require("multer"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}// Imporntando el Enrutador
// Creating an instance from the express router
const router=new _express.Router;// Authorization Check Middleware
var cors=require("cors");router.get("/",_ensureAuth.default,_ensureColabUser.default,_audioannotations.default.index),router.post("/add",_ensureAuth.default,_ensureColabUser.default,//me quede aqui guardando este error 
_audioannotations.default.addAudioannotation);var storage=_multer.default.diskStorage({destination:function(a,b,c){// cb(null, 'uploads')
c(null,"server/public/eaf")},filename:function(a,b,c){let d=b.originalname+"-"+Date.now()+".eaf";a.fname=d,c(null,d)}}),upload=(0,_multer.default)({storage:storage});router.post("/uploadfile",upload.single("myFile"),cors(),_ensureAuth.default,_ensureColabUser.default,_audioannotations.default.uploadfileAudioannotation),router.get("/create",_ensureAuth.default,cors(),_ensureColabUser.default,_audioannotations.default.createAudioannotation),router.get("/edit/:audioannotation_id",_ensureAuth.default,_ensureColabUser.default,_audioannotations.default.editAudioannotation),router.put("/edit/:audioannotation_id",_ensureAuth.default,_ensureColabUser.default,_audioannotations.default.editAudioannotation),router.delete("/delete/:audioannotation_id",_ensureAuth.default,_ensureColabUser.default,_audioannotations.default.deleteAudioannotaion),router.get("/vuetest",_ensureAuth.default,_ensureColabUser.default,_audioannotations.default.vuetestAudioannotaion);// Configurar cabeceras y cors https://filesamples.com/formats/mp3 //no funciona marca error en cors
//router.get('/', function(req, res) {
//    res.setHeader('Access-Control-Allow-Origin', '*');
//    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
//    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
//    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
//    res.send('cors problem fixed:)');
//});
// Se exportan rutas
var _default=router;exports.default=_default;