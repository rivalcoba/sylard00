"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _express=require("express"),_glottolog=_interopRequireDefault(require("../controllers/glottolog"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}// Imporntando el Enrutador
// Creating an instance from the express router
const router=new _express.Router;// Authorization Check Middleware
// import ensureAuthenticated from '@helpers/ensureAuth'
// import ensureColabUser from '@validators/ensureColabUser'
// Import Controllers
router.get("/index",_glottolog.default.index),router.get("/getLanguageList",_glottolog.default.getLanguageList),router.get("/parentTree/gid/:gid",_glottolog.default.parentTreeByGid),router.get("/parentTree/:id",_glottolog.default.parentTree),router.get("/getLanguageList/:name",_glottolog.default.getLanguageListByName);var _default=router;exports.default=_default;