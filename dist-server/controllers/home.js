"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _fs=_interopRequireDefault(require("fs")),_path=_interopRequireDefault(require("path")),_Collection=_interopRequireDefault(require("../models/Collection")),_keys=_interopRequireDefault(require("../config/keys")),_mail=_interopRequireDefault(require("@fullstackjs/mail"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}// Home Controllers
const index=(a,b)=>{b.locals.user&&"colaborator"==b.locals.user.role?b.redirect(`/collections`):b.locals.user?b.redirect("/dashboard"):b.render("index/home",{title:"SYLARD Synchronized Language Annotation Result Display"})},contact=(a,b)=>{b.render("index/contact",{title:"Contact",content:"Contact the administrator"})},audioannotation=(a,b)=>{b.render("index/audioannotation",{title:"Cat\xE1logo por audioanotaci\xF3n"})},credits=(a,b)=>{b.render("index/contact",{title:"Credits",content:"Site builded by Drako-YonceCe"})},dashboard=async(a,b)=>{// Get Collecionts
const c=await _Collection.default.find().populate("user").exec();// Collections to JSON
let d=c.map(a=>a.toJSON());b.render("index/dashboard",{title:"Cat\xE1logo por colecci\xF3n",collections:d})},documentation=(a,b)=>{b.render("index/documentation",{title:"Sylard Documentation",content:"You can find the instructions to use Sylard in this place."})},usermanual=(a,b)=>{b.render("index/usermanual",{title:"User Manual",content:"Terms and conditions are presenting bellow...."})},terms=(a,b)=>{b.render("index/terms",{title:"Terms",content:"Terms and conditions are presenting bellow...."})},test=(a,b)=>{b.render("index/test")},vuetest=(a,b)=>{b.render("index/vuetest")},audioannotations=(a,b)=>{b.render("index/audioannotations")},cleanEaf=(a,b)=>{let c=_path.default.join(__dirname,"..","public","eaf");_fs.default.readdir(c,(a,d)=>{if(a)return b.json(a);for(const e of d)".eaf"==_path.default.extname(e)&&_fs.default.unlink(_path.default.join(c,e),a=>{if(a)return b.json(a)})});let d=_path.default.join(__dirname,"..","public","eaf","tmp");_fs.default.readdir(d,(a,c)=>{for(const e of c)".json"==_path.default.extname(e)&&_fs.default.unlink(_path.default.join(d,e),a=>{if(a)return b.json(a)})}),b.json({return:"ok"})},i18n=(a,b)=>{b.status(200).json(a.app.locals.translation)},testMail=async(a,b)=>{let{email:c}=a.params;console.log(`Api Email>: Sending email to ${c}`),console.log(`Api Email>: Sending email from ${_keys.default.authMail}`),console.log(`Api Email>: user mail service ${_keys.default.mailUserName}`);try{let a=await new _mail.default("email-test").from(_keys.default.authMail).to(c,"Sr. Steve").subject("Sylard, This is an email test").data({name:"Sr. Steve"}).send();console.log(`Api Email>: user mail service ${JSON.stringify(a)}`),b.status(200).json({email:c,result:a})}catch(a){b.status(400).json({error:a.message})}};// Exporting Controllers
var _default={index,contact,credits,dashboard,documentation,usermanual,terms,test,vuetest,audioannotations,audioannotation,cleanEaf,i18n,testMail};exports.default=_default;