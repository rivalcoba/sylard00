"use strict";var _mongoose=_interopRequireWildcard(require("mongoose"));Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;function _getRequireWildcardCache(){if("function"!=typeof WeakMap)return null;var a=new WeakMap;return _getRequireWildcardCache=function(){return a},a}function _interopRequireWildcard(a){if(a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var b=_getRequireWildcardCache();if(b&&b.has(a))return b.get(a);var c={},d=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var e in a)if(Object.prototype.hasOwnProperty.call(a,e)){var f=d?Object.getOwnPropertyDescriptor(a,e):null;f&&(f.get||f.set)?Object.defineProperty(c,e,f):c[e]=a[e]}return c.default=a,b&&b.set(a,c),c}const AudioAnnotationsSchema=new _mongoose.Schema({name:String,// a_id:String,
eaf:String,title:String,description:String,genre:{name:{type:String,required:!0},description:{type:String,default:"Description not assigned"}},duration:String,mp3_url:String,//location: { type: Schema.ObjectId, ref:"Locations" },
location:{type:Object},//location:String,
collection_id:{type:_mongoose.Schema.ObjectId,ref:"Collection"},//glottolog:{type:Schema.ObjectId,ref:"Glottologs"},
//gid:String,//cambiar por L_gid
gid:{type:Object},siglas:String,user:{type:_mongoose.Schema.Types.ObjectId,ref:"Users"},TIER:[{TIER_ID:String,type:String,participant:String,Display:String,color:String}]});//AudioAnnotationsSchema.methods.updateCollection= async function(data){
// return await this.updateOne(data).exec()
//}
// Compile model from schema
var _default=_mongoose.default.model("AudioAnnotations",AudioAnnotationsSchema);exports.default=_default;