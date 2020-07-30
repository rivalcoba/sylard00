"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;var _express=require("express"),_auth=_interopRequireDefault(require("../controllers/auth")),_emailConfirm=_interopRequireDefault(require("../validators/email-confirm"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}// Creating an instance from the express router
var router=new _express.Router;// Import Controllers
router.get("/register",_auth["default"].register),router.post("/register/user",_auth["default"].registerUser),router.get("/email/confirm/:token",_emailConfirm["default"],_auth["default"].emailConfirmed),router.get("/login",_auth["default"].login),router.post("/login/user",_auth["default"].loginUser);var _default=router;exports["default"]=_default;