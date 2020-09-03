"use strict";var _Collection=_interopRequireDefault(require("../models/Collection"));Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}// Home Controllers
const index=(a,b)=>{b.locals.user?b.redirect("/dashboard"):b.render("index/welcome",{})},contact=(a,b)=>{b.render("index/contact",{title:"Contact",content:"Contact the administrator"})},credits=(a,b)=>{b.render("index/contact",{title:"Credits",content:"Site builded by Drako-YonceCe"})},dashboard=async(a,b)=>{// Get Collecionts
const c=await _Collection.default.find().populate("user").exec();// Collections to JSON
let d=c.map(a=>a.toJSON());b.render("index/dashboard",{collections:d})},documentation=(a,b)=>{b.render("index/documentation",{title:"Sylard Documentation",content:"You can find the instructions to use Sylard in this place."})},usermanual=(a,b)=>{b.render("index/register",{title:"User Manual",content:"Terms and conditions are presenting bellow...."})},terms=(a,b)=>{b.render("index/register",{title:"Terms",content:"Terms and conditions are presenting bellow...."})};// Exporting Controllers
var _default={index,contact,credits,dashboard,documentation,usermanual,terms};exports.default=_default;