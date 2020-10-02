"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _Collection=_interopRequireDefault(require("../models/Collection")),_Glottolog=_interopRequireDefault(require("../models/Glottolog")),_Location=_interopRequireDefault(require("../models/Location")),_AudioAnnotations=_interopRequireDefault(require("../models/AudioAnnotations"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}const index=async(a,b)=>{b.render("audioannotations/index",{})},createAudioannotation=async(a,b)=>{b.render("audioannotations/create",{})},addAudioannotation=async(a,b)=>{//const audioannotations = new Audioannotations({
//  titulo: req.body.titulo,
//  description: req.body.description,
//  genero :  req.body.genero,
//  mp3_url: req.body.mp3_url,
//});
let{audioannotations:c}=a.body;//let { audioannotations } = req.body
// Add user
//audioannotations.user = req.user._id
//checar https://bezkoder.com/node-express-mongodb-crud-rest-api/
//const AudioannotationDoc = await Audioannotations.create(audioannotations)
//console.log(`addAudioannotation> Audioannotation Created: ${AudioannotationDoc.titulo}`)
// Se encuentra usuario  
//console.log(res);
_AudioAnnotations.default.create(c).then(a=>{console.log("Aqui"),console.log(a),b.send(a)}).catch(a=>{b.status(500).send({message:a.message||"Some error occurred while creating the Tutorial."})}),console.log(a.body),b.send("POST request to the homepage")},editAudioannotation=async(a,b)=>{b.render("audioannotations/edit",{})},deleteAudioannotaion=async()=>{};var _default={index,createAudioannotation,editAudioannotation,deleteAudioannotaion,addAudioannotation};exports.default=_default;