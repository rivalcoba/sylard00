"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var Yup=_interopRequireWildcard(require("yup")),_Genre=_interopRequireDefault(require("../../models/Genre"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _getRequireWildcardCache(){if("function"!=typeof WeakMap)return null;var a=new WeakMap;return _getRequireWildcardCache=function(){return a},a}function _interopRequireWildcard(a){if(a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var b=_getRequireWildcardCache();if(b&&b.has(a))return b.get(a);var c={},d=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var e in a)if(Object.prototype.hasOwnProperty.call(a,e)){var f=d?Object.getOwnPropertyDescriptor(a,e):null;f&&(f.get||f.set)?Object.defineProperty(c,e,f):c[e]=a[e]}return c.default=a,b&&b.set(a,c),c}// Importing Validation Tool
// Imporntado Modelos
const MAX_GENRE_NAME_LENGTH=10,MAX_GENRE_NAME_DESCRIPTION=300,GenreValidationSchema=Yup.object().shape({name:Yup.string().max(10,"Name length should not be bigger than 10 characters").required("You must enter a name"),description:Yup.string().max(MAX_GENRE_NAME_DESCRIPTION,"Description length should not be bigger than 300 characters")});// Auxiliary Function
// const capitalize = (str)=>{
//     if(typeof str !== 'string') return ''
//     return str.charAt(0).toUpperCase() + str.slice(1)
// }
var _default=async(a,b,c)=>{let{name:d,description:e}=a.body;// Normalize genreName
d=d.toUpperCase(),console.log(d);let f={name:d,description:e};// Validating Schema
try{await GenreValidationSchema.validate(f,{abortEarly:// error
// error
// error
!1})}catch(a){console.trace(`Errores: ${a}`),b.status(400).json(a)}// Checking Duplicates
let g;try{g=await _Genre.default.findOne({name:f.name}),g?(console.trace(`LN50>This Genre aready exist in the DB`),b.status(409).json({error:"This Genre aready exist in the Data Base"})):(a.genere=f,c())}catch(a){console.trace(`LN50>Errores: ${a}`),b.status(400).json(a)}};exports.default=_default;