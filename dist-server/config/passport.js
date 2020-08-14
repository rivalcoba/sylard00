"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=_default;var _passportLocal=require("passport-local"),_mongoose=_interopRequireDefault(require("mongoose")),_bcryptjs=_interopRequireDefault(require("bcryptjs")),_User=_interopRequireDefault(require("../models/User"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}// Load user model
function _default(a){// Esto genera y mantiene las cookies
a.use(new _passportLocal.Strategy({usernameField:"email"},(a,b,c)=>{// Use mongoose to validate user
// MATCH USER
_User.default.findOne({email:a}).then(a=>a?(console.log("--------------------------"),console.log(`> CUENTA ${a.emailConfirmedAt?"ACTIVA":"INACTIVA"}`),console.log("--------------------------"),a.emailConfirmedAt?void// MATCH PASSWORD
_bcryptjs.default.compare(b,a.password).then(b=>b?c(null,a):c(null,// error
// error
// error
!1,// user
{message:"Password Incorrecto"}// Message
)).catch(a=>{throw console.log(`config>passport>bcryp> Error: ${a}`),a}):c(null,!1,// user
{message:"Cuenta inactiva, favor de activarla haciendo clic en el enlace previamente enviado a su correo."})):c(null,!1,// user
{message:"Usuario incorrecto"}// Message
))})),a.serializeUser(function(a,b){b(null,a.id)}),a.deserializeUser(function(a,b){_User.default.findById(a,function(a,c){b(a,c)})})}