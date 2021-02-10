"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _Collection=_interopRequireDefault(require("../models/Collection")),_Glottolog=_interopRequireDefault(require("../models/Glottolog")),_Location=_interopRequireDefault(require("../models/Location")),_AudioAnnotations=_interopRequireDefault(require("../models/AudioAnnotations"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}// Collections Controllers
// Import model
// import User from '@models/User'
// List all the collaborators collections
// Read and list all the Collaborators Collections
const index=async(a,b)=>{// Query
let c="su"==b.locals.user.role?{}:{user:a.user._id};// Get Collecionts
const d=await _Collection.default.find(c).populate("user").exec();// Collections to JSON
let e=d.map(a=>a.toJSON());// List all the collections
b.render("collections/index",{title:"Mis colecciones",collections:e})},createCollection=async(a,b)=>{// Getting languages
try{const a=await _Glottolog.default.find({$or:[{country_ids:"MX"},{country_ids:"US"}],parent_id:{$ne:""}},"gid name parent_id iso639P3code").exec(),c=await _Location.default.distinct("Nom_Ent");let d=a.map(a=>{let b={};return b=a.toJSON(),b});b.render("collections/create",{title:"Agregar colecci\xF3n",languages:d,entities:c})}catch(c){return a.flash("error_msg","El servidor no esta disponible, intente mas tarde"),b.redirect("/dashboard")}},addCollection=async(a,b)=>{// Grab collections from body
let{collection:c}=a.body;// Add user
c.user=a.user._id;const d=await _Collection.default.create(c);// Se encuentra usuario
console.log(`addCollection> Colection Created: ${d.name}`),b.redirect("/collections")},deleteCollection=async(a,b)=>{const c=a.params.collection_id;try{// Owner Validation
let d=await _Collection.default.findById(c).exec();// Am I the collection owner or su?
if(d.user+""!=a.user._id+""&&"su"!=a.user.role+"")return a.flash("error_msg","No eres el propietario de esta colecci\xF3n"),b.redirect("/collections");const e=await _Collection.default.deleteOne({_id:c}).exec();console.log(`deleteCollection> Result: ${e}`),b.redirect("/collections")}catch(a){return b.status(400).json(a)}},editCollectionForm=async(a,b)=>{const c=a.params.collection_id;console.log(`controllers>collections> COL ID: ${c}`);// Grab the collection to edit
try{let d=await _Collection.default.findById(c).exec();// Am I the collection owner or su?
if(d.user+""!=a.user._id+""&&"su"!=a.user.role+"")return a.flash("error_msg","No eres el propietario de esta colecci\xF3n"),b.redirect("/collections");// Validaciones
// Is a valid collection?
if(!d)return a.flash("error_msg","No se encontro la coleccion solicitada"),b.redirect("/dashboard");// parsing Lanugages
// ---- TESTING
d=d.toJSON(),d.languages=JSON.stringify(d.languages),d.localities=JSON.stringify(d.localities),b.render("collections/edit",{collectionDoc:d})}catch(c){return console.log(`controller>collections> Error: ${c.message}`),a.flash("error_msg",c.message),b.redirect("/collections")}},editCollection=async(a,b)=>{const{collection:c}=a.body,d=a.params.collection_id;let e;try{// am I the collection owner or su?
if(e=await _Collection.default.findById(d).exec(),e.user+""!=a.user._id+""&&"su"!=a.user.role+"")return a.flash("error_msg","No eres el propietario de esta colecci\xF3n"),b.redirect("/dashboard");// Update collection
let f=await e.updateCollection(c);f.ok?a.flash("success_msg","La colecci\xF3n se ha actualizado con \xE9xito"):a.flash("error_msg","No se ha podido actualizar la colecci\xF3n"),b.redirect("/collections")}catch(c){// Se flashea Exito
// Get the info from
return a.flash("error_msg","No se ha podido encontrar la coleccion que se desea editar"),b.render("index/dashboard")}},indexCollection=async(a,b)=>{b.render("audioannotations/indexByCollection",{})},api_getCollectionAll=async(a,b)=>{//let collectionDoc = {}
const c={page:a.params.page,limit:5,sort:{title:1},populate:"colection",customLabels:{totalDocs:"itemCount",docs:"itemsList",limit:"perPage",page:"currentPage",nextPage:"next",prevPage:"prev",totalPages:"pageCount",pagingCounter:"slNo",meta:"paginator"}};try{_Collection.default.paginate({},c,function(a,c){return a?(console.log("El error esta aqui"),console.err(a),b.status(400).json({mensaje:"Ocurrio un error",err:a})):void b.json(c)})}catch(a){return b.status(400).json({mensaje:"Ocurrio un error",error:a})}// try {
//     collectionDoc = await Collection.find().exec()
//     res.status(200).json(collectionDoc)
// } catch (error) {
//     res.status(404).json({ error: error.message })
// }
},api_getCollectionById=async(a,b)=>{const c=a.params.collection_id;let d={};try{d=await _Collection.default.findById(c).exec(),b.status(200).json(d)}catch(a){b.status(404).json({error:a.message})}},api_getCollectionByUser=async(a,b)=>{const{userId:c}=a.params;try{let a=await _Collection.default.find({user:c}).exec();return b.status(200).json({collectionDocs:a})}catch(a){b.status(400).json({error:a.message})}};var _default={// List Collections from a particular Colaborator User
index,// Indexa audio anotaciones que corresponden a alguna coleccion
indexCollection,// Create Add Collection FORM
createCollection,// Process ADD Collection FORM
addCollection,// Delete Collection
deleteCollection,// Update Collection FORM
editCollectionForm,// Process Update Collection FORM
editCollection,// Lists Collections from the logged user
// Show single Collection
// Process Delete Collection
api_getCollectionById,api_getCollectionByUser,api_getCollectionAll};exports.default=_default;