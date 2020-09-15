"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var Yup=_interopRequireWildcard(require("yup")),_Glottolog=_interopRequireDefault(require("../../models/Glottolog")),_Location=_interopRequireDefault(require("../../models/Location"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _getRequireWildcardCache(){if("function"!=typeof WeakMap)return null;var a=new WeakMap;return _getRequireWildcardCache=function(){return a},a}function _interopRequireWildcard(a){if(a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var b=_getRequireWildcardCache();if(b&&b.has(a))return b.get(a);var c={},d=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var e in a)if(Object.prototype.hasOwnProperty.call(a,e)){var f=d?Object.getOwnPropertyDescriptor(a,e):null;f&&(f.get||f.set)?Object.defineProperty(c,e,f):c[e]=a[e]}return c.default=a,b&&b.set(a,c),c}// Validation Library
// Model
// Validation Schema
const CollectionValidationSchema=Yup.object().shape({name:Yup.string().required("Se requiere ingresar un nombre"),description:Yup.string().required("Se requiere ingresar una descripcion"),languages:Yup.array().of(Yup.string(),"Se requiere un Arreglo de Strings"),localities:Yup.array().of(Yup.string(),"Se requiere un Arreglo de Strings"),license:Yup.string().required("Se requiere ingresar una licencia").oneOf(["CC-BY-NC-SA","CC BY-SA"],"Debe proporcionarse un tipo de licencia valida: CC-BY-NC-SA o CC BY-SA")});var _default=async(a,b,c)=>{const{name:d,description:e,languages:f,localities:g,license:h}=a.body;try{// Form collection document
let b={name:d,description:e,languages:f,localities:"string"==typeof g?[g]:g,license:h};// Se validan datos del formulario
await CollectionValidationSchema.validate(b,{abortEarly:// error
// error
// error
!1});// Se Buscan los lenguajes
// Get collections
let i=await _Glottolog.default.find({gid:{$in:f}},"gid family_id parent_id name level latitude longitude iso639P3code child_family_count child_language_count child_dialect_count country_ids").exec();if(0==i.length)throw new Yup.ValidationError(`Lenguajes incorrectos`,a.body.languages,"No se proporcionaron lenguajes correctos");// Populate the language array
b.languages=f.map(a=>{let b;return i.forEach(c=>{c.gid==a&&(b=c)}),b});// Se puede refactorar y hacer desde el modelo
// collection.languages = languagesDocs.map((doc) => {
//   let obj = doc.toJSON()
//   delete obj._id
//   return obj
// })
//Building languages array
let j=[];for(let a,c=0;c<b.languages.length;c+=2)a={},a.language=b.languages[c],a.LanguageGroup=b.languages[c+1],j.push(a);b.languages=j;// Extracting localities signarures (Ent, mun, loc)
let k=[],l=[],m=[];for(let a=0;a<g.length;a+=3)k.push(g[a]),l.push(g[a+1]),m.push(g[a+2]);let n=await _Location.default.find({Nom_Ent:{$in:k},Nom_Mun:{$in:l},Nom_Loc:{$in:m}},"Cve_Ent Nom_Ent Nom_Abr Cve_Mun Nom_Mun Cve_Loc Nom_Loc Lat_Decimal Lon_Decimal Altitud").exec();if(0==n.length)throw new Yup.ValidationError(`Localidades Incorrectas`,a.body.localities,"No se proporcionaron localidades correctas");// Se puede refactorar y hacer desde el modelo
// collection.localities = localitiesDocs.map((doc) => {
//   let obj = doc.toJSON()
//   delete obj._id
//   return obj
// })
b.localities=n,a.body.collection=b,c()}catch(c){//res.render('index/dashboard')
console.log(`validator>collection> ${c}`),console.log(JSON.stringify(c.errors)),a.flash("error_msg",`Error al crear coleccion: ${c.message}`),b.redirect("/dashboard")}};exports.default=_default;