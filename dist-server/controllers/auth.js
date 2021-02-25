"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _User=_interopRequireDefault(require("../models/User")),_Glottolog=_interopRequireDefault(require("../models/Glottolog")),_passport=_interopRequireDefault(require("passport")),_path=_interopRequireDefault(require("path")),_jsonReader=_interopRequireDefault(require("../helpers/jsonReader")),_mail=_interopRequireDefault(require("@fullstackjs/mail")),_keys=_interopRequireDefault(require("../config/keys"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}// Importing user model
// Show Loginform
const login=(a,b)=>{b.render("auth/login",{title:"SYLARD Login"})},loginUser=(a,b,c)=>{// 1 Se agrega authenticacion
// y se pasa una estrategia
_passport.default.authenticate("local",{successRedirect:"/",failureRedirect:"/auth/login",failureFlash:!0})(a,b,c)},register=async(a,b)=>{// let languages = jsonReader.readFileSync(path.join(__dirname, '..', 'assets', 'languages.json'))
let c=await _Glottolog.default.find({},{name:!0,gid:!0,iso639P3code:!0,country_ids:!0,country_ids:"MX"}).exec(),d=c.map(a=>a.toJSON()),e=_jsonReader.default.readFileSync(_path.default.join(__dirname,"..","assets","countries.json"));b.render("auth/register",{title:"SYLARD Registro",onRegisterPage:!0,nativeLanguages:d,countries:e})},registerUser=async(a,b)=>{// Extracting Data from the request
const{name:c,lastName:d,secLastName:e,email:f,password:g,role:h,spokenLanguages:i,country:j,terms:k,about:l}=a.body;try{// Back en Validation
// Creating the new user
const a=await _User.default.create({name:c,lastName:d,secLastName:e,email:f,password:g,role:h,spokenLanguages:i,country:j,terms:"on"===k,about:l});let m=a.toJSON();b.render("auth/confirmMailSent",m)}catch(a){return console.log(`controllers/auth.js> ERROR registering user: ${a.message}`),b.status(409).send(`> Error : ${a.message}`)}},emailConfirmed=async(a,b)=>{try{// Activating Account
const c=await _User.default.findOne({emailConfirmationToken:a.user.emailConfirmationToken}).exec();let d=c.role;c.activateUser(),"visitor"==d?b.render("auth/confirmedMail",a.user.toJSON()):(await new _mail.default("request-upgradeAccount").from("yoncece@sylard.com").to(_keys.default.authMail,"Sylard Auth System").subject("Sylard, Authorize Collaboration Account").data({name:c.name,lastName:c.lastName,email:c.email,loginUrl:`${_keys.default.homeUrl}/auth/login`,url:`${_keys.default.homeUrl}/auth/enable/colaborator/${c.email}`}).send(),console.log(`authController>emailConfirmed> Correo enviado a ${_keys.default.authMail}`),b.render("auth/colabAuthRequested",a.user.toJSON()))}catch(c){console.log(`Controllers>auth>emailConfirmed> ${c.message}`),b.render("failed",{title:"Editar usuario",iconTitle:"fa fa-frown-o",message:"Error al actualizar usuario.",error:`${a.body.email}`})}},enableColaborator=async(a,b)=>{try{// Upgrading account
const c=await _User.default.findOne({email:a.user2Validate.email});// Se promociona cuenta
// Se notifica al usuario
// We update the user with the confirmation
c.upGradeToColaborator(),await new _mail.default("upgradeAccepted").from("yoncece@sylard.com").to(c.email,"Sylard Auth System").subject("Sylard, Collaboration Account accepted").data({name:c.name,lastName:c.lastName,email:c.email,url:`${_keys.default.homeUrl}/auth/login`}).send(),b.render("result",{title:"Promoci\xF3n a colaborador",iconTitle:"fa fa-certificate",message:`El usuario con el correo: ${c.email} se ha promocionado correctamente.`,error:``})}catch(c){console.log(`Controllers>auth>emailConfirmed> ${c.message}`),b.render("failed",{title:"Promoci\xF3n a colaborador",iconTitle:"fa fa-frown-o",message:"Ha ocurrido un desafortunado error en el proceso de promoci\xF3n de la cuenta.",error:`El usuario con este correo ${a.body.email} no se ha podido promocionar a colaborador.`})}},logoutUser=(a,b)=>{// Funcion para salirse
a.logout(),a.flash("success_msg","Ha cerrado sesi\xF3n correctamente"),b.redirect("/auth/login")};// Processes login form
var _default={register,registerUser,login,loginUser,emailConfirmed,logoutUser,enableColaborator};exports.default=_default;