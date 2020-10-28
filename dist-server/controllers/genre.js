"use strict";var _Genre=_interopRequireDefault(require("../models/Genre"));Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}// Genre Controllers
// Genre API
// CREATE - POST
const api_postGenres=async(a,b)=>{// Destructuring genere
let{genere:c}=a;// Create Validates genere
try{const a=await _Genre.default.create(c);b.status(200).json(a)}catch(a){b.status(500).json(a)}},api_getGenres=async(a,b)=>{const c=await _Genre.default.find().exec();b.status(200).json(c)},api_putGenres=async(a,b)=>{// TODO: Not implemented
// // Destructuring genere
// let { genere } = req
// // Create Validates genere
// try {
//   const genreDoc = await Genre.create(genere)
//   res.status(200).json(genreDoc)
// } catch (error) {
//   res.status(500).json(error)
// }
// 
b.status(200).json({result:"Not implemented"})},api_deleteGenres=(a,b)=>{// TODO: Not implemented
const{genre_id:c}=a.params;b.status(200).json({result:"Not implemented",genre_id:c})};// READ - GET
var _default={api_postGenres,api_getGenres,api_putGenres,api_deleteGenres};exports.default=_default;