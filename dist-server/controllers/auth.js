"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;var _User=_interopRequireDefault(require("../models/User")),_passport=_interopRequireDefault(require("passport"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function asyncGeneratorStep(a,b,c,d,e,f,g){try{var h=a[f](g),i=h.value}catch(a){return void c(a)}h.done?b(i):Promise.resolve(i).then(d,e)}function _asyncToGenerator(a){return function(){var b=this,c=arguments;return new Promise(function(d,e){function f(a){asyncGeneratorStep(h,d,e,f,g,"next",a)}function g(a){asyncGeneratorStep(h,d,e,f,g,"throw",a)}var h=a.apply(b,c);f(void 0)})}}// Show Loginform
var login=function(a,b){b.render("auth/login")},loginUser=function(a,b,c){// 1 Se agrega authenticacion
// y se pasa una estrategia
_passport["default"].authenticate("local",{successRedirect:"/",failureRedirect:"/auth/login/error",failureFlash:// error
// error
!1})(a,b,c)},loginError=function(a,b){b.render("auth/login",{error:"Usuario o Password incorrecto"})},register=function(a,b){b.render("auth/register",{onRegisterPage:!0})},registerUser=/*#__PURE__*/function(){var a=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function a(b,c){var d,e,f,g,h,i,j,k;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return d=b.body,e=d.name,f=d.email,g=d.password,h=d.lastName,i=d.role,a.prev=1,a.next=4,_User["default"].create({name:e,lastName:h,email:f,password:g,role:i});case 4:j=a.sent,k=j.toJSON(),c.render("auth/confirmMailSent",k),a.next=13;break;case 9:return a.prev=9,a.t0=a["catch"](1),console.log("controllers/auth.js> ERROR registering user: ".concat(a.t0.message)),a.abrupt("return",c.status(409).send("> Error : ".concat(a.t0.message)));case 13:case"end":return a.stop();}},a,null,[[1,9]])}));return function(){return a.apply(this,arguments)}}(),emailConfirmed=/*#__PURE__*/function(){var a=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function a(b,c){var d;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,_User["default"].findOne({emailConfirmationToken:b.user.emailConfirmationToken}).exec();case 3:d=a.sent,d.activateUser(),c.render("auth/confirmedMail",b.user.toJSON()),a.next=12;break;case 8:a.prev=8,a.t0=a["catch"](0),console.log("Controllers>auth>emailConfirmed> ".concat(a.t0.message)),c.render("auth/failed",{title:"Activacion de Cuenta",iconTitle:"fa fa-frown-o",message:"Ha ocurrido un desafortunado error en el proceso de Activacion.",error:"El usuario con este correo ".concat(b.body.email," no ha podido Activar.")});case 12:case"end":return a.stop();}},a,null,[[0,8]])}));return function(){return a.apply(this,arguments)}}(),logoutUser=function(a,b){// Funcion para salirse
a.logout(),b.redirect("/auth/login")},_default={register:register,registerUser:registerUser,login:login,loginUser:loginUser,emailConfirmed:emailConfirmed,loginError:loginError,logoutUser:logoutUser};// Processes login form
exports["default"]=_default;