"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=_default;var _path=_interopRequireDefault(require("path")),_xml2js=_interopRequireDefault(require("xml2js")),_fs=_interopRequireDefault(require("fs"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}//var objson ;
function _default(a){_path.default.join(__dirname,"..","public","eaf",a);//+console.log(url)
console.log("=============================="),console.log("Aqui lee el eaf "+a);try{_fs.default.unlinkSync(_path.default.join(__dirname,"..","public","eaf","eaf.json")),console.log(">> Se borro eaf.json.")}catch(a){console.log(">> No se borro eaf.json por que existe.")}try{_fs.default.unlinkSync(_path.default.join(__dirname,"..","public","eaf","Nuevoeaf.json")),console.log(">> Se borro Nuevoeaf.json.")}catch(a){console.log(">>>>> NO se encontro Nuevoeaf.json para borrar")}//const xml = fs.readFileSync('../public/eaf/asset01.eaf-1603583874596.eaf');
// convert XML to JSON
}