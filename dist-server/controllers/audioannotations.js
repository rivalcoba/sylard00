"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _Collection=_interopRequireDefault(require("../models/Collection")),_Glottolog=_interopRequireDefault(require("../models/Glottolog")),_Location=_interopRequireDefault(require("../models/Location")),_AudioAnnotations=_interopRequireDefault(require("../models/AudioAnnotations"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}const index=async(a,b)=>{b.render("audioannotations/index",{})},createAudioannotation=async(a,b)=>{b.render("audioannotations/create",{})},addAudioannotation=async(a,b)=>{const{titulo:c,description:d,genero:e,mp3_url:f}=a.body;//const audioannotations = new Audioannotations({
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
const g=await _AudioAnnotations.default.create({titulo:c,description:d,genero:e,mp3_url:f});// Se encuentra usuario  
//console.log(res);
console.log(`addAudioannotation> Audioannotation Created: ${g}`),console.log(a.body),b.send("POST request to the homepage")},editAudioannotation=async(a,b)=>{b.render("audioannotations/edit",{})},deleteAudioannotaion=async()=>{};var _default={index,createAudioannotation,editAudioannotation,deleteAudioannotaion,addAudioannotation};exports.default=_default;