"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _Collection=_interopRequireDefault(require("../models/Collection")),_Glottolog=_interopRequireDefault(require("../models/Glottolog")),_Location=_interopRequireDefault(require("../models/Location"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}// Collections Controllers
// Import model
// import User from '@models/User'
// List all the collaborators collections
// Read and list all the Collaborators Collections
const index=(a,b)=>{// List all the collections
b.render("collections/index",{title:"Contact",content:"Contact the administrator"})},createCollection=async(a,b)=>{// Getting languages 
const c=await _Glottolog.default.find({$or:[{country_ids:/MX/},{country_ids:/US/}]},"gid name parent_id").exec();let d=c.map(a=>{let b={};return b=a.toJSON(),b});const e=await _Location.default.distinct("Nom_Ent");b.render("collections/create",{languages:d,entities:e})},addCollection=async(a,b)=>{// Grab collections from body
let{collection:c}=a.body;// Add user
c.user=a.user._id;const d=await _Collection.default.create(c);// Se encuentra usuario
b.status(200).json(d)},deleteCollection=async(a,b)=>{const c=a.params.collection_id;try{const a=await _Collection.default.deleteOne({_id:c}).exec();return b.status(200).json(a)}catch(a){return b.status(400).json(a)}},editCollectionForm=async(a,b)=>{const c=a.params.collection_id;// Grab the collection to edit
try{let d=await _Collection.default.findById(c).exec();// Im the collection owner?
if(d.user+""!=a.user._id+"")return a.flash("error_msg","No eres el propietario de esta colecci\xF3n"),b.redirect("/dashboard");// Validaciones
// Is a valid collection?
if(!d)return a.flash("error_msg","No se encontro la coleccion solicitada"),b.redirect("/dashboard");b.render("collections/edit",{collectionDoc:d.toJSON()})}catch(c){return console.log(`controller>collections> Error: ${c.message}`),a.flash("error_msg",c.message),b.redirect("/dashboard")}},editCollection=async(a,b)=>{const{collection:c}=a.body,d=a.params.collection_id;let e;try{// Im the collection owner?
if(e=await _Collection.default.findById(d).exec(),e.user+""!=a.user._id+"")return a.flash("error_msg","No eres el propietario de esta colecci\xF3n"),b.redirect("/dashboard");// Update collection
let f=await e.updateCollection(c);f.ok&&b.render("collections/edit",{collectionDoc:e.toJSON()})}catch(c){// Get the info from
return a.flash("error_msg","No se ha podido encontrar la coleccion que se desea editar"),b.render("index/dashboard")}};var _default={// List Collections from a particular Colaborator User
index,// Create Add Collection FORM
createCollection,// Process ADD Collection FORM
addCollection,// Delete Collection
deleteCollection,// Update Collection FORM
editCollectionForm,// Process Update Collection FORM
editCollection// Lists Collections from the logged user
// Show single Collection
// Process Delete Collection
};exports.default=_default;