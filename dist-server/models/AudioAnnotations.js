"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _mongoose=_interopRequireWildcard(require("mongoose")),_fs=_interopRequireDefault(require("fs")),_path=_interopRequireDefault(require("path"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _getRequireWildcardCache(){if("function"!=typeof WeakMap)return null;var a=new WeakMap;return _getRequireWildcardCache=function(){return a},a}function _interopRequireWildcard(a){if(a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var b=_getRequireWildcardCache();if(b&&b.has(a))return b.get(a);var c={},d=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var e in a)if(Object.prototype.hasOwnProperty.call(a,e)){var f=d?Object.getOwnPropertyDescriptor(a,e):null;f&&(f.get||f.set)?Object.defineProperty(c,e,f):c[e]=a[e]}return c.default=a,b&&b.set(a,c),c}//import { promises as fs } from 'fs'
const mongoosePaginate=require("mongoose-paginate-v2"),AudioAnnotationsSchema=new _mongoose.Schema({//name: String,
// a_id:String,
eaf:String,title:String,description:String,genre:{name:{type:String,required:!0},description:{type:String,default:"Description not assigned"}},duration:String,mp3_url:String,//location: { type: Schema.ObjectId, ref:"Locations" },
location:{},//location:String,
collection_id:{type:_mongoose.Schema.Types.ObjectId,ref:"Collection"},//glottolog:{type:Schema.ObjectId,ref:"Glottologs"},
//gid:String,//cambiar por L_gid
gid:{},siglas:String,user:{type:_mongoose.Schema.Types.ObjectId,ref:"Users"},header:[String],participant:{name:String,canal:String},TIER:[{PARTICIPANT:String,Visible:String,value:String,color:String,LINGUISTIC_TYPE_REF:String,TIER_ID:String}]});//first step
AudioAnnotationsSchema.pre("deleteOne",{query:// error
// error
// error
!1,document:!0},function(){// Deleting eaf file
let a=this.eaf,b=_path.default.join(__dirname,"..","public","eaf"),c=_path.default.join(__dirname,"..","public","eaf","tmp");// ref: https://stackoverflow.com/questions/10265798/determine-project-root-from-a-running-node-js-application
console.log(`$>> Deleting file: ${a}`),_fs.default.unlink(_path.default.join(b,a),b=>{if(b)throw console.log(`$>> error: ${b.message}`),b;console.log(`$>> File deleted: ${a} OK!`),_fs.default.unlink(_path.default.join(c,`${a}.json`),b=>{if(b)throw b;console.log(`$>> File deleted: ${a}.json OK!`)})})}),AudioAnnotationsSchema.plugin(mongoosePaginate);//second step
var _default=_mongoose.default.model("AudioAnnotations",AudioAnnotationsSchema);exports.default=_default;