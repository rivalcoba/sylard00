"use strict";var _mongoose=_interopRequireWildcard(require("mongoose"));Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;function _getRequireWildcardCache(){if("function"!=typeof WeakMap)return null;var a=new WeakMap;return _getRequireWildcardCache=function(){return a},a}function _interopRequireWildcard(a){if(a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var b=_getRequireWildcardCache();if(b&&b.has(a))return b.get(a);var c={},d=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var e in a)if(Object.prototype.hasOwnProperty.call(a,e)){var f=d?Object.getOwnPropertyDescriptor(a,e):null;f&&(f.get||f.set)?Object.defineProperty(c,e,f):c[e]=a[e]}return c.default=a,b&&b.set(a,c),c}const CollectionSchema=new _mongoose.Schema({name:{type:String,required:!0},description:{type:String},languages:[{language:{gid:String,family_id:String,parent_id:String,name:String,level:String,latitude:Number,longitude:Number,iso639P3code:String,child_family_count:Number,child_language_count:Number,child_dialect_count:Number,country_ids:String},LanguageGroup:{gid:String,family_id:String,parent_id:String,name:String,level:String,latitude:Number,longitude:Number,iso639P3code:String,child_family_count:Number,child_language_count:Number,child_dialect_count:Number,country_ids:String}}],localities:[{Cve_Ent:String,Nom_Ent:String,Nom_Abr:String,Cve_Mun:String,Nom_Mun:String,Cve_Loc:String,Nom_Loc:String,Lat_Decimal:Number,Lon_Decimal:Number,Altitud:Number}],license:String,user:{type:_mongoose.Schema.Types.ObjectId,ref:"Users"}});CollectionSchema.methods.updateCollection=async function(a){return await this.updateOne(a).exec()};var _default=_mongoose.default.model("Collection",CollectionSchema);exports.default=_default;