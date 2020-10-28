"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _Collection=_interopRequireDefault(require("../models/Collection")),_Glottolog=_interopRequireDefault(require("../models/Glottolog")),_Location=_interopRequireDefault(require("../models/Location")),_AudioAnnotations=_interopRequireDefault(require("../models/AudioAnnotations")),_converteaftojson=_interopRequireDefault(require("../helpers/converteaftojson")),_multer=_interopRequireDefault(require("multer"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}const index=async(a,b)=>{console.log("Aqui");const c=await _AudioAnnotations.default.find({user:a.user._id}).populate("user").populate("colection").exec();c.forEach((a,b)=>{let d=a.location;a.colection.localities.forEach(a=>{console.log(`>ln40> loc_id: ${d} - ${a._id} - ${b} - ${a.Nom_Loc}`),d+""===a._id+""&&(console.log(`>>>>> ENCONTRADO: ln40> loc_id: ${d} - ${a._id} - ${b} - ${a.Nom_Loc}`),console.log("Antes de asignar"),console.log(a),c[b].location=a,console.log("Asignado"),console.log(c[b].location))});let e=a.gid;a.colection.languages.forEach(a=>{e+""===a._id+""&&(c[b].gid=a)})});let d=c.map(a=>a.toJSON());// let collections = collectionsDocs.map(collection=>{
//   return collection.toJSON()
// })
//return res.status(200).json(audioannotationsDocs);
// console.log("Aqui")
//console.log(collections)
b.render("audioannotations/index",{//enviar 
audioannotations:d})},createAudioannotation=(a,b)=>{// Getting languages
b.render("audioannotations/create")},addAudioannotation=async(a,b)=>{const{eaf:c,titulo:d,description:e,genero:f,mp3_url:g,colection:h,duracion:i,location:j,gid:k,siglas:l}=a.body;let m={eaf:c,titulo:d,description:e,genero:f,mp3_url:g,colection:h,duracion:i,location:j,gid:k,siglas:l};//console.log('Duracion')
//console.log(req.body)
console.log("File"),m.user=a.user._id;//audioannotations.colection=req.colection._id
//const audioannotations = new Audioannotations({
//  titulo: req.body.titulo,
//  description: req.body.description,
//  genero :  req.body.genero,
//  mp3_url: req.body.mp3_url,
//});
//let { audioannotations } = req.body
//Audioannotations
//.create(audioannotations)
//.then(data => {
//   console.log('Aqui');
//   console.log(data);
//   res.send(data);
// })
// .catch(err => {
//   res.status(500).send({
//     message:
//       err.message || "Some error occurred while creating the Tutorial."
//  });
//});
// Add user
//audioannotations.user = req.user._id
//checar https://bezkoder.com/node-express-mongodb-crud-rest-api/
// audioannotations = {
//   name : "IvanAA",
//   titulo : "GamEaf"
// }
await _AudioAnnotations.default.create(m);//console.log(`addAudioannotation> Audioannotation Created: ${AudioannotationDoc}`)
// Se encuentra usuario  
//console.log(req.body);
//console.log('Aqui')
//res.send('POST request to the homepage')
b.redirect("/audioannotations")},uploadfileAudioannotation=async(a,b,c)=>{const d=a.file;if(!d){const a=new Error("Please upload a file");return a.httpStatusCode=400,c(a)}//convertir nuevoJSON Aqui
(0,_converteaftojson.default)("");try{// Obtenuendo datos de las collections
const c=await _Collection.default.find({user:a.user._id}).populate("user").exec();let e=c.map(a=>a.toJSON());b.render("audioannotations/create",{filename:d.filename,collections:e})}catch(a){b.status(500).json(a)}},editAudioannotation=async(a,b)=>{b.render("audioannotations/edit",{})},deleteAudioannotaion=async(a,b)=>{const c=a.params.audioannotation_id;try{//console.log("Borrar este")
//console.log(req.)
let a=await _AudioAnnotations.default.findById(c).exec();const d=a.eaf,e=await _AudioAnnotations.default.deleteOne({_id:c}).exec();//console.log(file);
console.log(`deleteAudioannotation> Result: ${e}`);//Borrado del archivo fisicamente
const f=require("fs");f.unlinkSync("server/public/eaf/"+d),b.redirect("/audioannotations")}catch(a){return console.error(err),b.status(400).json(a)}},vuetestAudioannotaion=async(a,b)=>{b.render("audioannotations/vuetest",{})};var _default={index,createAudioannotation,editAudioannotation,deleteAudioannotaion,addAudioannotation,uploadfileAudioannotation,vuetestAudioannotaion};exports.default=_default;
