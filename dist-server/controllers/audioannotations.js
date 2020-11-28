"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _fs=_interopRequireDefault(require("fs")),_path=_interopRequireDefault(require("path")),_Collection=_interopRequireDefault(require("../models/Collection")),_Glottolog=_interopRequireDefault(require("../models/Glottolog")),_Location=_interopRequireDefault(require("../models/Location")),_AudioAnnotations=_interopRequireDefault(require("../models/AudioAnnotations")),_converteaftojson=_interopRequireDefault(require("../helpers/converteaftojson")),_converteaf=_interopRequireDefault(require("../helpers/converteaf")),_Genre=_interopRequireDefault(require("../models/Genre")),_multer=_interopRequireDefault(require("multer")),_express=require("express");function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}const index=async(a,b)=>{console.log("Aqui");const c=await _AudioAnnotations.default.find({user:a.user._id}).populate("user").populate("colection").exec();c.forEach((a,b)=>{let d=a.location;a.colection.localities.forEach(a=>{console.log(`>ln40> loc_id: ${d} - ${a._id} - ${b} - ${a.Nom_Loc}`),d+""===a._id+""&&(console.log(`>>>>> ENCONTRADO: ln40> loc_id: ${d} - ${a._id} - ${b} - ${a.Nom_Loc}`),console.log("Antes de asignar"),console.log(a),c[b].location=a,console.log("Asignado"),console.log(c[b].location))});let e=a.gid;a.colection.languages.forEach(a=>{e+""===a._id+""&&(c[b].gid=a)})});let d=c.map(a=>a.toJSON());// let collections = collectionsDocs.map(collection=>{
//   return collection.toJSON()
// })
//return res.status(200).json(audioannotationsDocs);
// console.log("Aqui")
//console.log(collections)
b.render("audioannotations/index",{//enviar
audioannotations:d})},filtrarAudioannotation=async(a,b)=>{console.log("Aqui");// Aqui me quede le quite el await
try{const c=await _AudioAnnotations.default.find({user:a.user._id}).populate("user").populate("colection").exec();b.json(c)}catch(a){return b.status(400).json({mensaje:"Ocurrio un error",error:a})}},createAudioannotation=(a,b)=>{// Getting languages
b.render("audioannotations/create")},addAudioannotation=async(a,b)=>{let{eaf:c,// ok
mp3_url:d,// ok
duration:e,//ok
title:f,// ok
description:g,// ok
colection:h,// ok
gid:i,// ok
location:j,// ok
genre:k,// ok
PARTICIPANT:l,Visible:m,value:n,color:o,LINGUISTIC_TYPE_REF:p,TIER_ID:q}=a.body,r=[],s=m.length/l.length;l.forEach((a,b)=>{for(let c,d=0;d<s;d++)// Se calcula indice absoluto
c=d+b*s,console.log(`absIndex: ${c} - `),r.push({PARTICIPANT:a,Visible:m[c],value:n[c],color:o[c],LINGUISTIC_TYPE_REF:p[c],TIER_ID:q[c]})});// Building audioannotation
let t=await _Genre.default.findById(k).exec(),u={eaf:c,// ok
title:f,// ok
description:g,//
genre:t,// ok - ARMAR
duration:e,// ok
mp3_url:d,// ok
location:j,// ok
collection_id:h,// ok
gid:i,// ok
user:a.user._id,TIER:r};try{const a=await _AudioAnnotations.default.create(u);return console.log("> Audioanotations Created: "+JSON.stringify(a)),b.status(200).json(a);// res.redirect('/audioannotations') //TODO: Descomentar tan pronto toño acomple esto con index de audioanot
}catch(a){return b.status(200).json({error:a,from:"controller/audioannotations/addAudioannotation"})}},uploadfileAudioannotation=async(a,b,c)=>{const d=a.file;if(!d){const a=new Error("Please upload a file");return a.httpStatusCode=400,c(a)}//convertir nuevoJSON Aqui
// console.log("-----------ARCHIVO CARGADO EN SERVER----------")
// console.log(file.filename)
(0,_converteaftojson.default)(d.filename);try{// Obteniendo datos de las collections
const c=await _Collection.default.find({user:a.user._id}).populate("user").exec();let e=c.map(a=>a.toJSON());// Getting genere
const f=await _Genre.default.find().exec();let g=f.map(a=>a.toJSON());b.render("audioannotations/create",{filename:d.filename,collections:e,genreArray:g})}catch(a){// Borrar eaf cargado
_fs.default.unlinkSync(_path.default.join(__dirname,"..","public","eaf",d.filename)),b.status(500).json(a)}},editAudioannotation=async(a,b)=>{b.render("audioannotations/edit",{})},deleteAudioannotaion=async(a,b)=>{const c=a.params.audioannotation_id;try{//console.log("Borrar este")
//console.log(req.)
let a=await _AudioAnnotations.default.findById(c).exec();const d=a.eaf,e=await _AudioAnnotations.default.deleteOne({_id:c}).exec();//console.log(file);
console.log(`deleteAudioannotation> Result: ${e}`);//Borrado del archivo fisicamente
const f=require("fs");f.unlinkSync("server/public/eaf/"+d),b.redirect("/audioannotations")}catch(a){return console.error(a),b.status(400).json(a)}},vuetestAudioannotaion=async(a,b)=>{b.render("audioannotations/vuetest",{})};var _default={index,createAudioannotation,editAudioannotation,deleteAudioannotaion,addAudioannotation,uploadfileAudioannotation,vuetestAudioannotaion,filtrarAudioannotation};exports.default=_default;