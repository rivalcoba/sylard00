"use strict";function _typeof(a){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},_typeof(a)}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0,require("@babel/polyfill");var _mongoose=_interopRequireWildcard(require("mongoose")),_bcryptjs=_interopRequireDefault(require("bcryptjs")),_randomstring=_interopRequireDefault(require("randomstring")),_mail=_interopRequireDefault(require("@fullstackjs/mail")),_keys=_interopRequireDefault(require("../config/keys"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _getRequireWildcardCache(){if("function"!=typeof WeakMap)return null;var a=new WeakMap;return _getRequireWildcardCache=function(){return a},a}function _interopRequireWildcard(a){if(a&&a.__esModule)return a;if(null===a||"object"!==_typeof(a)&&"function"!=typeof a)return{default:a};var b=_getRequireWildcardCache();if(b&&b.has(a))return b.get(a);var c={},d=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var e in a)if(Object.prototype.hasOwnProperty.call(a,e)){var f=d?Object.getOwnPropertyDescriptor(a,e):null;f&&(f.get||f.set)?Object.defineProperty(c,e,f):c[e]=a[e]}return c["default"]=a,b&&b.set(a,c),c}function asyncGeneratorStep(a,b,c,d,e,f,g){try{var h=a[f](g),i=h.value}catch(a){return void c(a)}h.done?b(i):Promise.resolve(i).then(d,e)}function _asyncToGenerator(a){return function(){var b=this,c=arguments;return new Promise(function(d,e){function f(a){asyncGeneratorStep(h,d,e,f,g,"next",a)}function g(a){asyncGeneratorStep(h,d,e,f,g,"throw",a)}var h=a.apply(b,c);f(void 0)})}}// Creatnig a User Schema
var UserSchema=new _mongoose.Schema({name:{type:String// required: true
},lastName:{type:String},secLastName:{type:String},shortBio:{type:String},country:{name_en:String,name_es:String,code:String},spokenLanguages:[{name:String,gid:String}],email:{type:String// required: true
},password:{type:String// required: true
},role:{type:String,default:"visitor"// required: true
},about:String,image:{type:String,default:"https://img.icons8.com/fluent/48/000000/user-male-circle.png"},terms:{type:Boolean,default:// error
// error
// error
!1// required: true
},emailConfirmationToken:String,createdAt:Date,updatedAt:Date,emailConfirmedAt:Date});// Creating a Pre 
// ref: https://mongoosejs.com/docs/middleware.html#pre
UserSchema.pre("save",function(){// Hashing Password before Save
this.password=_bcryptjs["default"].hashSync(this.password),this.emailConfirmationToken=_randomstring["default"].generate(64),this.createdAt=new Date,this.updatedAt=new Date}),UserSchema.post("save",/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function a(){return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,console.log("LN68@models/User.js>: Sending email to ".concat(this.email)),a.next=4,new _mail["default"]("confirm-account").from("yoncece@sylard.com").to(this.email,this.name).subject("Sylard, please confirm your account").data({name:this.name,url:"".concat(_keys["default"].homeUrl,"/auth/email/confirm/").concat(this.emailConfirmationToken)}).send();case 4:console.log("models/User.js>: Email send correctly!!!"),a.next=11;break;case 7:throw a.prev=7,a.t0=a["catch"](0),console.log("models/User.js> ERROR SENDING MAIL: ".concat(a.t0.message)),a.t0;case 11:case"end":return a.stop();}},a,this,[[0,7]])}))),UserSchema.methods.activateUser=/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function a(){var b,c=arguments;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return b=0<c.length&&void 0!==c[0]?c[0]:"visitor",a.next=3,this.updateOne({emailConfirmationToken:null,updatedAt:new Date,emailConfirmedAt:new Date,role:b}).exec();case 3:case"end":return a.stop();}},a,this)})),UserSchema.methods.upGradeToColaborator=/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function a(){return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,this.updateOne({updatedAt:new Date,role:"colaborator"}).exec();case 2:case"end":return a.stop();}},a,this)})),UserSchema.methods.editUser=/*#__PURE__*/function(){var a=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function a(b){return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,this.updateOne(b).exec();case 2:case"end":return a.stop();}},a,this)}));return function(){return a.apply(this,arguments)}}(),UserSchema.methods.editPassword=/*#__PURE__*/function(){var a=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function a(b){return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,this.updateOne({password:_bcryptjs["default"].hashSync(b),updatedAt:new Date}).exec();case 2:case"end":return a.stop();}},a,this)}));return function(){return a.apply(this,arguments)}}(),UserSchema.methods.resetPassword=/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function a(){var b;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return b=_randomstring["default"].generate({length:12,charset:"alphanumeric"}),a.next=3,this.updateOne({password:_bcryptjs["default"].hashSync(b),updatedAt:new Date}).exec();case 3:return a.next=5,new _mail["default"]("resetPassword").from("yoncece@sylard.com").to(this.email,this.name).subject("Sylard, Password Reset").data({name:this.name,password:b}).send();case 5:case"end":return a.stop();}},a,this)}));// Exporting User Schema
var _default=_mongoose["default"].model("Users",UserSchema);exports["default"]=_default;