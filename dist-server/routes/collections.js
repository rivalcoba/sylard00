"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _express=require("express"),_ensureAuth=_interopRequireDefault(require("../helpers/ensureAuth")),_ensureColabUser=_interopRequireDefault(require("../validators/ensureColabUser")),_collections=_interopRequireDefault(require("../controllers/collections"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}// Imporntando el Enrutador
// Creating an instance from the express router
const router=new _express.Router;// Authorization Check Middleware
router.get("/",_ensureAuth.default,_ensureColabUser.default,_collections.default.index);// Se exportan rutas
var _default=router;exports.default=_default;