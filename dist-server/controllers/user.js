"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _path=_interopRequireDefault(require("path")),_jsonReader=_interopRequireDefault(require("../helpers/jsonReader")),_User=_interopRequireDefault(require("../models/User")),_Collection=_interopRequireDefault(require("../models/Collection"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}// DELETE async
const edit=(a,b)=>{let c=_jsonReader.default.readFileSync(_path.default.join(__dirname,"..","assets","languages.json")),d=_jsonReader.default.readFileSync(_path.default.join(__dirname,"..","assets","countries.json")),e="";a.user.spokenLanguages.forEach(a=>{e=e.concat(`${a.name} | ${a.gid}\n`)}),e=e.trim(),console.log(e),b.render("user/edit",{spokenLang:e,nativeLanguages:c,countries:d})},editUser=async(a,b)=>{// Get values from req.body
const{name:c,lastName:d,secLastName:e,email:f,spokenLanguages:g,country:h,about:i}=a.body;// Update user
// Flash Message
// Get the info from
await a.user.editUser({name:c,lastName:d,secLastName:e,email:f,spokenLanguages:g,country:h,about:i}),a.flash("success_msg","Sus cambios se han guardado"),b.redirect("/dashboard")},editPassword=(a,b)=>{b.render("user/editPassword")},editUserPassword=async(a,b)=>{const{password:c}=a.body;await a.user.editPassword(c),a.flash("success_msg","Password editado con exito"),b.redirect("/dashboard")},resetPassword=(a,b)=>{b.render("user/resetPassword")},resetUserPassword=async(a,b)=>{// Se busca usuario con el password
await a.user.resetPassword(),a.flash("success_msg","Su password provisional se ha enviado a su correo"),b.redirect("/")},index=async(a,b)=>{// res.render('user/index', { usersObjs })
const c=await _User.default.find({role:{$ne:"su"}}).lean().exec();// let usersDocs = usersObjs.map((usr)=>{
//   usr.role = usr.role==="colaborator"?"checked":""
//   // Attach user collections
//   // let collectionsDocs = await Collection.find({"user": usr._id})
//   // TODO: Terminar esta sección NO SE PUEDE LLENAR COLECCIONES
//    usr.collections = [{"name":usr._id},{"name":usr._id}]
//   return usr
// })
/*
  #THESIS
  REF: https://advancedweb.hu/how-to-use-async-functions-with-array-map-in-javascript/#:~:text=The%20map%20function,-The%20map%20is&text=An%20async%20version%20needs%20to,the%20results%20in%20an%20Array.
  */let d=await Promise.all(c.map(async a=>{a.role="colaborator"===a.role?"checked":"";let b=await _Collection.default.find({user:a._id});return a.collectionsDocs=b.map(a=>a.toJSON()),a}));// Buscando las colecciones de este usuario
//let collectionsDoc = Collection.find({"user":})
b.render("user/index",{usersObjs:d})},delUsers=async(a,b)=>{let{usersIds:c}=a.body;// Normalizing 
c="string"==typeof c?[c]:c,console.log("========================================================"),console.log("========================================================"),console.log(">>>>>>>>>>>>>>>>>>>>>>> TODO <<<<<<<<<<<<<<<<<<<<<<<<<<<"),console.log("> FALTA QUE SE IMPLEMENTE BORRADO DE AUDIO ANOTACIONES"),console.log("> CUANDO SEBORRAN USUARIOS cotrollers/users.js"),console.log("========================================================"),console.log("========================================================");//
let d={},e={user:{$in:c}};// DELETE USERS COLLECTIONS
try{d=await _Collection.default.find(e,{name:!0}).remove().exec()}catch(a){// Error al borrar audio anotaciones
return b.status(404).json(a)}// Building Query
e={_id:{$in:c}},d={};try{d=await _User.default.find(e,{name:!0,role:!0}).remove().exec(),console.log(JSON.stringify(d)),a.flash("success_msg",`Usuarios borrados con exito: ${d.deletedCount}`)}catch(b){console.log(b),a.flash("error_msg","No se ha podido actualizar la colecci\xF3n")}finally{b.redirect("/user")}},api_getUsers=async(a,b)=>{const c=await _User.default.find().exec();b.status(200).json(c)},api_delUsers=async(a,b)=>{let{usersIds:c}=a.body;// TODO: IMPLEMENTAR BORRADO DE AUDIOANOTATIONS DE USUARIOS QUE SERAN BORRADOS  
// TODO: IMPLEMENTAR BORRADO DE COLLECTIONS DE USUARIOS QUE SERAN BORRADOS
// Normalizing 
c="string"==typeof c?[c]:c;// Building Query
let d={_id:{$in:c}},e={};try{e=await _User.default.find(d,{name:!0,role:!0}).remove().exec(),b.status(200).json({result:e})}catch(a){b.status(500).json({error:a})}};var _default={edit,editUser,editPassword,editUserPassword,resetPassword,resetUserPassword,index,delUsers,api_getUsers,api_delUsers};exports.default=_default;