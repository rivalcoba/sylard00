"use strict";function _typeof(a){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},_typeof(a)}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;var Yup=_interopRequireWildcard(require("yup")),_User=_interopRequireDefault(require("../models/User"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _getRequireWildcardCache(){if("function"!=typeof WeakMap)return null;var a=new WeakMap;return _getRequireWildcardCache=function(){return a},a}function _interopRequireWildcard(a){if(a&&a.__esModule)return a;if(null===a||"object"!==_typeof(a)&&"function"!=typeof a)return{default:a};var b=_getRequireWildcardCache();if(b&&b.has(a))return b.get(a);var c={},d=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var e in a)if(Object.prototype.hasOwnProperty.call(a,e)){var f=d?Object.getOwnPropertyDescriptor(a,e):null;f&&(f.get||f.set)?Object.defineProperty(c,e,f):c[e]=a[e]}return c["default"]=a,b&&b.set(a,c),c}function asyncGeneratorStep(a,b,c,d,e,f,g){try{var h=a[f](g),i=h.value}catch(a){return void c(a)}h.done?b(i):Promise.resolve(i).then(d,e)}function _asyncToGenerator(a){return function(){var b=this,c=arguments;return new Promise(function(d,e){function f(a){asyncGeneratorStep(h,d,e,f,g,"next",a)}function g(a){asyncGeneratorStep(h,d,e,f,g,"throw",a)}var h=a.apply(b,c);f(void 0)})}}var ConfirmEmailAccountSchema=Yup.string().email("Ingrese un correo valido").required("Se requiere ingresar un correo electronico"),_default=/*#__PURE__*/function(){var a=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function a(b,c,d){var e,f;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,e=b.body.email,a.next=4,ConfirmEmailAccountSchema.validate(e);case 4:return a.next=6,_User["default"].findOne({email:e});case 6:if(f=a.sent,f){a.next=10;break}throw console.log("confirmEmailAccount> No se encontro usuario"),new Yup.ValidationError("Invalid Confirmation Code: No se encontro usuario",b.body,"email");case 10:console.log("confirmEmailAccount> Existe el Correo en la base de datos"),b.user=f,d(),a.next=19;break;case 15:a.prev=15,a.t0=a["catch"](0),b.flash("error_msg","Cuenta o correo inexistentes"),c.redirect("/");case 19:case"end":return a.stop();}},a,null,[[0,15]])}));return function(){return a.apply(this,arguments)}}();exports["default"]=_default;