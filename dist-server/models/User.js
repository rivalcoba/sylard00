"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _mongoose=_interopRequireWildcard(require("mongoose")),_bcryptjs=_interopRequireDefault(require("bcryptjs")),_randomstring=_interopRequireDefault(require("randomstring")),_mail=_interopRequireDefault(require("@fullstackjs/mail")),_keys=_interopRequireDefault(require("../config/keys"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _getRequireWildcardCache(){if("function"!=typeof WeakMap)return null;var a=new WeakMap;return _getRequireWildcardCache=function(){return a},a}function _interopRequireWildcard(a){if(a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var b=_getRequireWildcardCache();if(b&&b.has(a))return b.get(a);var c={},d=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var e in a)if(Object.prototype.hasOwnProperty.call(a,e)){var f=d?Object.getOwnPropertyDescriptor(a,e):null;f&&(f.get||f.set)?Object.defineProperty(c,e,f):c[e]=a[e]}return c.default=a,b&&b.set(a,c),c}// Creatnig a User Schema
const UserSchema=new _mongoose.Schema({name:{type:String// required: true
},lastName:{type:String},secLastName:{type:String},about:{type:String},country:{name_en:String,name_es:String,code:String},spokenLanguages:[{name:String,gid:String,iso639P3code:String}],email:{type:String// required: true
},password:{type:String// required: true
},role:{type:String,default:"visitor"// visitor | colaborator | su
// required: true
},about:String,image:{type:String,default:"https://img.icons8.com/fluent/48/000000/user-male-circle.png"},terms:{type:Boolean,default:// error
// error
// error
!1// required: true
},emailConfirmationToken:String,createdAt:Date,updatedAt:Date,emailConfirmedAt:Date});// Creating a Pre 
// ref: https://mongoosejs.com/docs/middleware.html#pre
UserSchema.pre("save",function(){// Hashing Password before Save
this.password=_bcryptjs.default.hashSync(this.password),this.emailConfirmationToken=_randomstring.default.generate(64),this.createdAt=new Date,this.updatedAt=new Date}),UserSchema.post("save",async function(){try{console.log(`LN68@models/User.js>: Sending email to ${this.email}`),await new _mail.default("confirm-account").from("yoncece@sylard.com").to(this.email,this.name).subject("Sylard, please confirm your account").data({name:this.name,url:`${_keys.default.homeUrl}/auth/email/confirm/${this.emailConfirmationToken}`}).send(),console.log(`models/User.js>: Email send correctly!!!`)}catch(a){throw console.log(`models/User.js> ERROR SENDING MAIL: ${a.message}`),a}}),UserSchema.methods.activateUser=async function(a="visitor"){await this.updateOne({emailConfirmationToken:null,updatedAt:new Date,emailConfirmedAt:new Date,role:a}).exec()},UserSchema.methods.upGradeToColaborator=async function(){await this.updateOne({updatedAt:new Date,role:"colaborator"}).exec()},UserSchema.methods.editUser=async function(a){await this.updateOne(a).exec()},UserSchema.methods.editPassword=async function(a){await this.updateOne({password:_bcryptjs.default.hashSync(a),updatedAt:new Date}).exec()},UserSchema.methods.resetPassword=async function(){// Creating a new password
let a=_randomstring.default.generate({length:12,charset:"alphanumeric"});await this.updateOne({password:_bcryptjs.default.hashSync(a),updatedAt:new Date}).exec(),await new _mail.default("resetPassword").from("yoncece@sylard.com").to(this.email,this.name).subject("Sylard, Password Reset").data({name:this.name,password:a}).send()};// Exporting User Schema
var _default=_mongoose.default.model("Users",UserSchema);exports.default=_default;