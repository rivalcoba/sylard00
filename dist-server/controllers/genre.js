"use strict";var _Genre=_interopRequireDefault(require("../models/Genre"));Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}// Genre Controllers
// Genre API
// CREATE - POST
const api_postGenres=async(a,b)=>{// Destructuring genre
let{genre:c}=a;// Create Validates genre
try{const a=await _Genre.default.create(c);b.status(200).json(a)}catch(a){b.status(500).json(a)}},api_getGenres=async(a,b)=>{const c=await _Genre.default.find().exec();b.status(200).json(c)},api_putGenres=async(a,b)=>{// Extracting data to update
let{genreDoc:c}=a,d={};// Saving Document
try{d=await c.save()}catch(a){a.reason=`Error when saving document`,b.status(500).json(a)}b.status(200).json(d)},api_deleteGenres=async(a,b)=>{const{genre_id:c}=a.params;try{let a=await _Genre.default.deleteOne({_id:c});b.status(200).json(a)}catch(a){a.reason=`Document with id ${c} not deleted because it was not found`,b.status(404).json(a)}};// READ - GET
var _default={api_postGenres,api_getGenres,api_putGenres,api_deleteGenres};exports.default=_default;