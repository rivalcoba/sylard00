"use strict";function _typeof(a){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},_typeof(a)}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0,require("@babel/polyfill");var Yup=_interopRequireWildcard(require("yup")),_User=_interopRequireDefault(require("../models/User")),_getSpokenLang=_interopRequireDefault(require("../helpers/getSpokenLang")),_getCountryObj=_interopRequireDefault(require("../helpers/getCountryObj"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _getRequireWildcardCache(){if("function"!=typeof WeakMap)return null;var a=new WeakMap;return _getRequireWildcardCache=function(){return a},a}function _interopRequireWildcard(a){if(a&&a.__esModule)return a;if(null===a||"object"!==_typeof(a)&&"function"!=typeof a)return{default:a};var b=_getRequireWildcardCache();if(b&&b.has(a))return b.get(a);var c={},d=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var e in a)if(Object.prototype.hasOwnProperty.call(a,e)){var f=d?Object.getOwnPropertyDescriptor(a,e):null;f&&(f.get||f.set)?Object.defineProperty(c,e,f):c[e]=a[e]}return c["default"]=a,b&&b.set(a,c),c}function asyncGeneratorStep(a,b,c,d,e,f,g){try{var h=a[f](g),i=h.value}catch(a){return void c(a)}h.done?b(i):Promise.resolve(i).then(d,e)}function _asyncToGenerator(a){return function(){var b=this,c=arguments;return new Promise(function(d,e){function f(a){asyncGeneratorStep(h,d,e,f,g,"next",a)}function g(a){asyncGeneratorStep(h,d,e,f,g,"throw",a)}var h=a.apply(b,c);f(void 0)})}}// Creating validation schema
// All we need from the confirmation email is the token
var UserRegistrationSchema=Yup.object().shape({name:Yup.string().required("Se requiere ingresar nombre"),lastName:Yup.string().required("Se requiere ingresar apellido"),email:Yup.string().email().required("Se requiere ingresar un correo valido"),role:Yup.string().oneOf(["colaborator","visitor"]).required("Se requiere proporcionar un rol"),password:Yup.string().min(6).required("Se requiere ingresar password de al menos 6 caracteres"),confirmationPassword:Yup.string().oneOf([Yup.ref("password")],"Los passwords ingresados no coinciden"),about:Yup.string().max(500,"El texto no debe exceder los 500 car\xE1cteres")}),_default=/*#__PURE__*/function(){var a=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function a(b,c,d){var e,f,g,h,i,j,k,l,m,n,o;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(a.prev=0,b.body.role="undefined"==typeof b.body.role?"visitor":"colaborator",e=b.body,f=e.name,g=e.lastName,h=e.email,i=e.password,j=e.confirmationPassword,k=e.role,l=b.body,m=l.spokenLanguages,n=l.country,m&&(b.body.spokenLanguages=(0,_getSpokenLang["default"])(m)),n=(0,_getCountryObj["default"])(n),!n){a.next=10;break}b.body.country=n,a.next=11;break;case 10:throw new Yup.ValidationError("Pais no reconocido: \"".concat(b.body.country,"\""),"country","/auth/register/user");case 11:return a.next=13,UserRegistrationSchema.validate({name:f,lastName:g,email:h,password:i,confirmationPassword:j,role:k});case 13:return a.next=15,_User["default"].findOne({email:b.body.email});case 15:o=a.sent,o?(b.flash("error_msg","El usuario con el correo \"".concat(b.body.email,"\" ya existe.")),c.redirect("/auth/register")):(b.user=o,d()),a.next=24;break;case 19:a.prev=19,a.t0=a["catch"](0),console.log("duplicateUserValidation> ".concat(a.t0.message)),b.flash("error_msg","Formulario incorrecto: ".concat(a.t0.message)),c.redirect("/auth/register");case 24:case"end":return a.stop();}},a,null,[[0,19]])}));return function(){return a.apply(this,arguments)}}();exports["default"]=_default;