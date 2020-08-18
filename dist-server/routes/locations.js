"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _express=require("express"),_locations=_interopRequireDefault(require("../controllers/locations"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}// Imporntando el Enrutador
// Import Model
// Creating an instance from the express router
const router=new _express.Router;// Authorization Check Middleware
// import ensureAuthenticated from '@helpers/ensureAuth'
// import ensureColabUser from '@validators/ensureColabUser'
// Import Controllers
router.get("/index",/*ensureAuthenticated, ensureColabUser,*/_locations.default.index),router.get("/index/nomloc/:nom_loc",/*ensureAuthenticated, ensureColabUser,*/_locations.default.indexNomLoc),router.get("/index/municipalitiesOf/:nom_ent",/*ensureAuthenticated, ensureColabUser,*/_locations.default.getMunicipalities),router.get("/index/localitiesOf/:nom_ent/:nom_mun",/*ensureAuthenticated, ensureColabUser,*/_locations.default.getLocalities),router.get("/find/:nom_ent/:nom_mun/:nom_loc",/*ensureAuthenticated, ensureColabUser,*/_locations.default.findLocality);// Se exportan rutas
var _default=router;exports.default=_default;