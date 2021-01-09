"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _fs=_interopRequireDefault(require("fs")),_path=_interopRequireDefault(require("path")),_Collection=_interopRequireDefault(require("../models/Collection")),_Glottolog=_interopRequireDefault(require("../models/Glottolog")),_Location=_interopRequireDefault(require("../models/Location")),_AudioAnnotations=_interopRequireDefault(require("../models/AudioAnnotations")),_converteaftojson=_interopRequireDefault(require("../helpers/converteaftojson")),_deletejson=_interopRequireDefault(require("../helpers/deletejson")),_converteaf=_interopRequireDefault(require("../helpers/converteaf")),_Genre=_interopRequireDefault(require("../models/Genre")),_multer=_interopRequireDefault(require("multer")),_express=require("express");function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}const index=async(a,b)=>{// Get Collecionts
//const collectionsDocs = await Collection.find({user : req.user._id}).populate('user').exec()
// Collections to JSON
// const audioannotationsDocs2 = await Audioannotations.aggregate([
//    { "$match": { "user": req.user._id } },
//   {
//     $lookup:
//     {
//       from: "Collection",
//       localField:"location",
//       foreignField:"localities._id",
//       as:"localidades"
//     }
//   }
// ]).exec(function(err, results){
//     console.log(results);
//  })
//console.log('Aqui')
const c=await _AudioAnnotations.default.find({user:a.user._id}).populate("user").populate("colection").exec();// let locality_found
// audioannotationsDocs.forEach((audioannotation, index) => {
//   let loc_id = audioannotation.location.id
//   audioannotation.colection.localities.forEach(location => {
//     console.log(
//       `>ln40> loc_id: ${loc_id} - ${location._id} - ${index} - ${location.Nom_Loc}`
//     )
//     if (String(loc_id) === String(location._id)) {
//       console.log(
//         `>>>>> ENCONTRADO: ln40> loc_id: ${loc_id} - ${location._id} - ${index} - ${location.Nom_Loc}`
//       )
//       console.log('Antes de asignar')
//       console.log(location)
//       audioannotationsDocs[index].location = location
//       console.log('Asignado')
//       console.log(audioannotationsDocs[index].location)
//     }
//   })
//   let glotid = audioannotation.gid
//   audioannotation.colection.languages.forEach(gid => {
//     //console.log(`>ln40> loc_id: ${loc_id} - ${gid._id} - ${index} - ${gid.Nom_Loc}`);
//     if (String(glotid) === String(gid._id)) {
//       //console.log(`>>>>> ENCONTRADO: ln40> loc_id: ${loc_id} - ${gid._id} - ${index} - ${gid.Nom_Loc}`);
//       //console.log("Antes de asignar")
//       //console.log(gid)
//       audioannotationsDocs[index].gid = gid
//       //console.log("Asignado")
//       //console.log(audioannotationsDocs[index].gid)
//     }
//   })
// })
let d=c.map(a=>a.toJSON());// let collections = collectionsDocs.map(collection=>{
//   return collection.toJSON()
// })
//return res.status(200).json(audioannotationsDocs);
// console.log("Aqui")
//console.log(collections)
b.render("audioannotations/index",{//enviar
audioannotations:d})},indexById=async(a,b)=>{const c=a.params.audioannotationId;console.log(`>finding ${c}`);// Find audio annotation to visualize
try{let a=await _AudioAnnotations.default.findById(c).populate("collection_id").populate("user").exec();// TODO: TOÑO
// >>>>>>>>>>>>>>>>>>>>>>>>> ---------------------------------------- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// >>>>>>>>>>>>>>>>>>>>>>>>> AQUI ESTA EL JSON DE LA AUDIO ANNOTACION <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// >>>>>>>>>>>>>>>>>>>>>>>>> ---------------------------------------- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
b.json(a)}catch(a){b.json(a)}},filtrarAudioannotation=async(a,b)=>{// ,page = Math.max(0, req.param('page'))
// var arregloAudio=[]
//console.log("Aqui esta el parametro"+req.param('page'))
// Aqui me quede le quite el await
try{const c={page:a.params.page,limit:1,sort:{title:1},populate:"colection",customLabels:{totalDocs:"itemCount",docs:"itemsList",limit:"perPage",page:"currentPage",nextPage:"next",prevPage:"prev",totalPages:"pageCount",pagingCounter:"slNo",meta:"paginator"}};_AudioAnnotations.default.paginate({},c,function(a,c){return a?(console.log("El error esta aqui"),console.err(a),b.status(400).json({mensaje:"Ocurrio un error",err:a})):void b.json(c)})}catch(a){return b.status(400).json({mensaje:"Ocurrio un error",error:a})}},createAudioannotation=(a,b)=>{// Getting languages
b.render("audioannotations/create",{title:"Agregar audionotaci\xF3n"})},addAudioannotation=async(a,b)=>{let{eaf:c,// ok
mp3_url:d,// ok
duration:e,//ok
title:f,// ok
description:g,// ok
colection:h,// ok
gid:i,// ok
location:j,// ok
genre:k,// ok
PARTICIPANT:l,Visible:m,value:n,color:o,LINGUISTIC_TYPE_REF:p,TIER_ID:q,header:r}=a.body,s=[];// Audioannotations Creations.
l.forEach((a,b)=>{s.push({PARTICIPANT:a,Visible:m[b],value:n[b],color:o[b],LINGUISTIC_TYPE_REF:p[b],TIER_ID:q[b]})});// Building audioannotation
let t=await _Genre.default.findById(k).exec(),u=await _Collection.default.findById(h).exec(),v=u.languages.id(i),w=u.localities.id(j),x={eaf:c,// ok
title:f,// ok
description:g,//
genre:t,// ok - ARMAR
duration:e,// ok
mp3_url:d,// ok
location:w,// ok
collection_id:h,// ok
gid:v,// ok
user:a.user._id,header:r,TIER:s};try{const a=await _AudioAnnotations.default.create(x);// return res.status(200).json(audioannotationDoc)
//res.redirect(`/audioannotations/index/${audioannotationDoc._id}`)
//enviar a visualizar audioanootation con parametro
console.log("> Audioanotations Created: "+JSON.stringify(a)),b.redirect(`/audioannotations/vuetest/${a._id}`)}catch(a){return b.status(200).json({error:a,from:"controller/audioannotations/addAudioannotation"})}},uploadfileAudioannotation=async(a,b,c)=>{const d=a.file;if(!d){const a=new Error("Please upload a file");return a.httpStatusCode=400,c(a)}//convertir nuevoJSON Aqui
// console.log("-----------ARCHIVO CARGADO EN SERVER----------")
// console.log(file.filename)
try{(0,_deletejson.default)(d.filename),(0,_converteaf.default)(d.filename),(0,_converteaftojson.default)(d.filename)}catch(a){console.log("Erorroesss al convertir EAF2JSON"),console.log(a)}try{// Obteniendo datos de las collections
const c=await _Collection.default.find({user:a.user._id}).populate("user").exec();let e=c.map(a=>a.toJSON());// Getting genere
const f=await _Genre.default.find().exec();let g=f.map(a=>a.toJSON());b.render("audioannotations/create",{filename:d.filename,collections:e,genreArray:g})}catch(a){// Borrar eaf cargado
_fs.default.unlinkSync(_path.default.join(__dirname,"..","public","eaf",d.filename)),b.status(500).json(a)}},editAudioannotation=async(a,b)=>{// let genreDoc = await Genre.findById(genre).exec()
// let collectionDoc = await Collection.findById(collection_id).exec()
// let gidDoc = collectionDoc.languages.id(gid)
// let locationDoc = collectionDoc.localities.id(location)
const c=a.params.audioannotation_id;console.log("--------------Aqui Edit--------------"),console.log(c),b.render("audioannotations/edit",{audioannotationid:c})},deleteAudioannotaion=async(a,b)=>{//console.log("Aqui no entro")
const c=a.params.audioannotation_id;try{let a=await _AudioAnnotations.default.findById(c).exec();var d=a.eaf;// console.log(file);
const b=await _AudioAnnotations.default.deleteOne({_id:c}).exec();//console.log(`deleteAudioannotation> Result: ${result}`);  
console.log(`deleteAudioannotation> Result: ${b}`,JSON.stringify(b))}catch(a){return console.log("no borro en la bd",a),b.status(404).json(a)}try{//console.log("Borrar este")
//console.log(req.)
//Borrado del archivo fisicamente
const a=require("fs");//res.redirect('/audioannotations')
//console.error("despues del borrado fisico")
return a.unlinkSync("server/public/eaf/"+d),b.status(200).json({file:"ok"})}catch(a){return console.error("error en el borrado fisico"),console.error(a),b.status(400).json(a)}},vuetestAudioannotaion=async(a,b)=>{const c=a.params.audioannotation_id;console.log("--------------Aqui--------------"),console.log(c),b.render("audioannotations/vuetest",{audioannotationid:c})},color=(a,b)=>{b.render("audioannotations/color")},api_updateAudioAnnot=async(a,b)=>{try{const{audioannotationId:c}=a.params;let d=await _AudioAnnotations.default.findById(c).exec();d.set(a.body);let e=await d.save();b.status(200).json(e)}catch(a){b.status(500).json({error:a.message})}};// Visualize Audio Annotations By Id
var _default={index,createAudioannotation,editAudioannotation,deleteAudioannotaion,addAudioannotation,uploadfileAudioannotation,vuetestAudioannotaion,filtrarAudioannotation,indexById,api_updateAudioAnnot,color};exports.default=_default;