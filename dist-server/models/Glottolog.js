"use strict";var _mongoose=_interopRequireWildcard(require("mongoose"));Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;function _getRequireWildcardCache(){if("function"!=typeof WeakMap)return null;var a=new WeakMap;return _getRequireWildcardCache=function(){return a},a}function _interopRequireWildcard(a){if(a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var b=_getRequireWildcardCache();if(b&&b.has(a))return b.get(a);var c={},d=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var e in a)if(Object.prototype.hasOwnProperty.call(a,e)){var f=d?Object.getOwnPropertyDescriptor(a,e):null;f&&(f.get||f.set)?Object.defineProperty(c,e,f):c[e]=a[e]}return c.default=a,b&&b.set(a,c),c}const GlottologSchema=new _mongoose.Schema({gid:String,family_id:String,parent_id:String,name:String,level:String,latitude:Number,longitude:Number,iso639P3code:String,child_family_count:Number,child_language_count:Number,child_dialect_count:Number,country_ids:String});GlottologSchema.virtual("parentTree",{ref:"Glottologs",localField:"parent_id",foreignField:"gid",justOne:!0}),GlottologSchema.methods.getParent=async function(){const a=await _mongoose.default.model("Glottologs").findOne({gid:this.parent_id},"gid name parent_id ").exec();return a},GlottologSchema.methods.getParentBranch=async function(a=[]){if(""!=this.parent_id){const b=await this.getParent();return a.push(b),b.getParentBranch(a)}return a};// Exporting User Schema
var _default=_mongoose.default.model("Glottologs",GlottologSchema);exports.default=_default;