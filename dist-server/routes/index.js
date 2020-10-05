"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _express=require("express"),_ensureAuth=_interopRequireDefault(require("../helpers/ensureAuth")),_home=_interopRequireDefault(require("../controllers/home"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}// Creating an instance from the express router
const router=new _express.Router;// Authorization Check Middleware
router.get("/",_home.default.index),router.get("/index",_home.default.index),router.get("/contact",_home.default.contact),router.get("/credits",_home.default.credits),router.get("/dashboard",_ensureAuth.default,_home.default.dashboard),router.get("/documentation",_home.default.documentation),router.get("/usermanual",_home.default.usermanual),router.get("/terms",_home.default.terms),router.get("/test",_home.default.test),router.get("/vuetest",_home.default.vuetest);//router.get('/audioannotations',homeController.audioannotations)
var _default=router;exports.default=_default;