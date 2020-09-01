"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var Yup=_interopRequireWildcard(require("yup")),_Glottolog=_interopRequireDefault(require("../../models/Glottolog")),_Location=_interopRequireDefault(require("../../models/Location"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _getRequireWildcardCache(){if("function"!=typeof WeakMap)return null;var a=new WeakMap;return _getRequireWildcardCache=function(){return a},a}function _interopRequireWildcard(a){if(a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var b=_getRequireWildcardCache();if(b&&b.has(a))return b.get(a);var c={},d=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var e in a)if(Object.prototype.hasOwnProperty.call(a,e)){var f=d?Object.getOwnPropertyDescriptor(a,e):null;f&&(f.get||f.set)?Object.defineProperty(c,e,f):c[e]=a[e]}return c.default=a,b&&b.set(a,c),c}// Validation Library
// Model
// Validation Schema
const CollectionValidationSchema=Yup.object().shape({name:Yup.string().required("Se requiere ingresar un nombre"),description:Yup.string().required("Se requiere ingresar una descripcion"),languages:Yup.array().of(Yup.string(),"Se requiere un Arreglo de Strings"),localities:Yup.array().of(Yup.string(),"Se requiere un Arreglo de Strings"),license:Yup.string().required("Se requiere ingresar una licencia").oneOf(["CC-BY-NC-SA","CC BY-SA"],"Debe proporcionarse un tipo de licencia valida: CC-BY-NC-SA o CC BY-SA")});var _default=async(a,b,c)=>{const{name:d,description:e,license:f}=a.body;let g=[],h=Object.keys(a.body);// Extract name keys of params
// Validar que sea mayor que 'n'
// Extract the languages
for(let d=2;d<h.length-1;d++){let b=a.body[h[d]].split("|"),c=b[0],e=b[1];g.push(c,e)}return b.send(JSON.stringify(g));// Get Params from req
// let { languages, localities } = req.body
};exports.default=_default;