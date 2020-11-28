"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=_default;var _path=_interopRequireDefault(require("path")),_xml2js=_interopRequireDefault(require("xml2js")),_fs=_interopRequireDefault(require("fs"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}//var objson ;
var tiempo_ids="",tiempo_buscado=0,tier_arreglo=[],bandera_grabar=!0,arreglo_tiempo=[],arreglo_ref_tiempo=[],obj_datos_tier={PARTICIPANT:"",TIER_ID:"",LINGUISTIC_TYPE_REF:"",DEFAULT_LOCALE:""},obj={tier:[]//datos_tier:[]
};function _default(a){_path.default.join(__dirname,"..","public","eaf",a);//+console.log(url)
console.log("=============================="),console.log("Aqui lee el eaf "+a);let b="";try{b=_fs.default.readFileSync(_path.default.join(__dirname,"..","public","eaf",a))}catch(a){console.log("error xml"),console.trace(a)}//const xml = fs.readFileSync('../public/eaf/asset01.eaf-1603583874596.eaf');
// convert XML to JSON
_xml2js.default.parseString(b,{mergeAttrs:!0},(b,c)=>{if(b)throw b;// `result` is a JavaScript object
// convert it to a JSON string
const d=JSON.stringify(c,null,4);//+leer_Tier_Json();
// add_Tier_Json();
//console.log(obj);
// save JSON in a file 
// fs.writeFileSync('../public/eaf/eaf.json', json);   
_fs.default.writeFileSync(_path.default.join(__dirname,"..","public","eaf",a+"eaf.json"),d),console.log("Aqui graba "+a+"eaf.json")})}