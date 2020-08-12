"use strict";var _express=require("express"),_user=_interopRequireDefault(require("../controllers/user")),_editUserFormValidation=_interopRequireDefault(require("../validators/editUserFormValidation")),_ensureAuth=_interopRequireDefault(require("../helpers/ensureAuth"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}// Creating an instance from the express router
var router=new _express.Router;// Import Controllers
/* GET users listing. */ // Cambiar a put
router.get("/edit",_ensureAuth["default"],_user["default"].edit),router.put("/edit",_ensureAuth["default"],_editUserFormValidation["default"],_user["default"].editUser),module.exports=router;