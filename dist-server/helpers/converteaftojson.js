"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=_default;var _path=_interopRequireDefault(require("path")),_xml2js=_interopRequireDefault(require("xml2js")),_fs=_interopRequireDefault(require("fs"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}//var objson ;
var tiempo_ids="",tiempo_buscado=0,tier_arreglo=[],bandera_grabar=!0,arreglo_tiempo=[],arreglo_ref_tiempo=[],obj_datos_tier={PARTICIPANT:"",TIER_ID:"",LINGUISTIC_TYPE_REF:"",DEFAULT_LOCALE:""},obj={tier:[]//datos_tier:[]
};//aqui me quede 13 de agosto 2020 hay que convertir el tiempo para  sincronizar con el mp3
function convertir_tiempo(a){var b=Math.trunc;return a/=1e3,b(a)}function buscar_referencia_tier(a){//console.log("-------ts----------")
//console.log(ts)
//console.log("-----------------")
//console.log("--------busqueda ref---------")
console.log(arreglo_ref_tiempo.find(b=>b.ANNOTATION_ID===a).TIME_SLOT_REF1),console.log(arreglo_ref_tiempo.find(b=>b.ANNOTATION_ID===a).TIME_SLOT_REF2)}function buscar_time_slot(a){//  if (ts.TIME_SLOT_ID[0] === "ts2")
//if (ts.TIME_SLOT_ID[0] ===tiempo_ids)
//{
//  tiempo_buscado= ts.TIME_VALUE[0];
//    return tiempo_buscado
//}
return a.TIME_SLOT_ID[0]===tiempo_ids}function add_tiempo(a){arreglo_tiempo.push(a)}function add_datos_tier(a){var b={};// sin participante
b.PARTICIPANT=null==a.PARTICIPANT?"":a.PARTICIPANT,b.TIER_ID=a.TIER_ID,b.LINGUISTIC_TYPE_REF=a.LINGUISTIC_TYPE_REF,b.DEFAULT_LOCALE=a.DEFAULT_LOCALE,tier_arreglo.push(b)}function add_REF_ANNOTATION(a){var b={};//añadir el tiempo inicial de la ref1
//console.log(buscar_referencia_tier(tiempo_ids))
//console.log(arreglo_ref_tiempo.find(x=>x.ANNOTATION_ID===tiempo_ids).TIME_SLOT_REF1)
//console.log(arreglo_ref_tiempo.find(x=>x.ANNOTATION_ID===tiempo_ids).TIME_SLOT_REF2)
//aqui falta convertir el tiempo
//console.log("---------")convertir_tiempo
//console.log(convertir_tiempo(arreglo_ref_tiempo.find(x=>x.ANNOTATION_ID===tiempo_ids).TIME_SLOT_REF1))
//console.log("---------")
//añadir el tiempo inicial de la ref2
//tiempo_ids=id_tier.TIME_SLOT_REF2[0];
b.ANNOTATION_ID=a.ANNOTATION_ID[0],b.ANNOTATION_REF=a.ANNOTATION_REF[0],b.ANNOTATION_VALUE=a.ANNOTATION_VALUE[0],tiempo_ids=a.ANNOTATION_REF[0],b.TIME_SLOT_REF1=arreglo_ref_tiempo.find(a=>a.ANNOTATION_ID===tiempo_ids).TIME_SLOT_REF1,b.TIME_SLOT_REF2=arreglo_ref_tiempo.find(a=>a.ANNOTATION_ID===tiempo_ids).TIME_SLOT_REF2,tier_arreglo.push(b)}function add_Tier_Json(a){//1 de Agosto
// me quede modificando el objeto con  tier0 y tier1  y  falta buscar y remplazar TIME_SLOT_REF1
// me quede por guardar el json y leerlo en vue tmb cambiar el archivo eaf a ver si funciona el codigo con cualquier eaf
var b={},c={};//obj_tier.TIME_SLOT_REF1=id_tier.TIME_SLOT_REF1[0];
//obj_tier.TIME_SLOT_REF2=id_tier.TIME_SLOT_REF2[0];
//obj.table.push(id_tier);
//añade a vector todos las anotaciones con tiempo para poder buscar referencias
//console.log("---------")
//console.log(obj_ref_tier.TIME_SLOT_REF1)
//console.log(convertir_tiempo(obj_ref_tier.TIME_SLOT_REF1))
//console.log(obj_ref_tier.TIME_SLOT_REF2)
//console.log(convertir_tiempo(obj_ref_tier.TIME_SLOT_REF2))
//console.log("---------")
b.ANNOTATION_ID=a.ANNOTATION_ID[0],tiempo_ids=a.TIME_SLOT_REF1[0],b.TIME_SLOT_REF1=convertir_tiempo(arreglo_tiempo.find(buscar_time_slot).TIME_VALUE[0]),tiempo_ids=a.TIME_SLOT_REF2[0],b.TIME_SLOT_REF2=convertir_tiempo(arreglo_tiempo.find(buscar_time_slot).TIME_VALUE[0]),b.ANNOTATION_VALUE=a.ANNOTATION_VALUE[0],tier_arreglo.push(b),c.ANNOTATION_ID=b.ANNOTATION_ID,c.TIME_SLOT_REF1=b.TIME_SLOT_REF1,c.TIME_SLOT_REF2=b.TIME_SLOT_REF2,arreglo_ref_tiempo.push(c)}function leer_Author_Json(){//console.log(this.objson.ANNOTATION_DOCUMENT.AUTHOR[0]);
// console.log(obj);
}function leer_Tier_Json(){// console.log(obj_tier)
}function _default(a){let b="";try{b=_fs.default.readFileSync(_path.default.join(__dirname,"..","public","eaf",a))}catch(a){console.log("> ERROR AL LEER EAF"),console.trace(a)}//const xml = fs.readFileSync('../public/eaf/asset01.eaf-1603583874596.eaf');
// convert XML to JSON
console.log(">>>> CONVIRTIENDO A XML <<<<<<<<<<<<<<"),_xml2js.default.parseString(b,{mergeAttrs:!0},(a,b)=>{if(a)throw a;// `result` is a JavaScript object
// convert it to a JSON string
const c=JSON.stringify(b,null,4);// Borrar
// try {
//   fs.unlinkSync(path.join(__dirname, '..', 'public', 'eaf', 'eaf.json'))
//   console.log('>> Se borro eaf.json.')
// } catch (error) {
//   console.log('>> No se borro eaf.json por que existe.')
// }
leer_Tier_Json(),_fs.default.writeFileSync(_path.default.join(__dirname,"..","public","eaf","eaf.json"),c)});//console.log(objson)
//var objson = require('../public/eaf/eaf.json');
var c=require(_path.default.join(__dirname,"..","public","eaf","eaf.json"));//const { Console } = require('console');
leer_Author_Json(c.ANNOTATION_DOCUMENT.AUTHOR[0]);//leer_Tier_Json(objson)
//var jsonData_tier = JSON.parse(obj_tier);
//tiempo
for(var d,e=0;e<c.ANNOTATION_DOCUMENT.TIME_ORDER[0].TIME_SLOT.length;e++)d=c.ANNOTATION_DOCUMENT.TIME_ORDER[0].TIME_SLOT[e],console.log(d),add_tiempo(d);//se envia todos los tiempos a un vector para filtrar y se encuentra uno por uno
// pruebo que busque
//console.log(" esta buscando");
//    tiempo_ids="ts54";
//console.log(arreglo_tiempo.find(buscar_time_slot).TIME_VALUE[0]);
//console.log(arreglo_tiempo);
//tiempo = leer_Author_Json(objson.ANNOTATION_DOCUMENT.TIME_ORDER[0].TIME_SLOT.length);
//
for(var f=0;f<c.ANNOTATION_DOCUMENT.TIER.length;f++){if(c.ANNOTATION_DOCUMENT.TIER[f].ANNOTATION==null)console.log("tier sin anotaciones"),bandera_grabar=// error
// error
// error
!1;else{add_datos_tier(c.ANNOTATION_DOCUMENT.TIER[f]);for(var g,h=c.ANNOTATION_DOCUMENT.TIER[f],l=0;l<c.ANNOTATION_DOCUMENT.TIER[f].ANNOTATION.length;l++)if(g=c.ANNOTATION_DOCUMENT.TIER[f].ANNOTATION[l],console.log("Tier "+f+" Annotation"+l),console.log(typeof c.ANNOTATION_DOCUMENT.TIER[f].ANNOTATION[l].ALIGNABLE_ANNOTATION),console.log(c.ANNOTATION_DOCUMENT.TIER[f].ANNOTATION[l].ALIGNABLE_ANNOTATION),null==c.ANNOTATION_DOCUMENT.TIER[f].ANNOTATION[l].ALIGNABLE_ANNOTATION){console.log("Estoy entrando a EGS Traducci\xF3n");for(var m,n=0;n<c.ANNOTATION_DOCUMENT.TIER[f].ANNOTATION[l].REF_ANNOTATION.length;n++)//console.log("Uno por uno "+j)
//console.log(ALIGNABLE_ANNOTATION);
//me quede mejorando el json y haciendo un nivel superior que se llama "TIER_ID" para los tipos de traduccion
//add_Tier_Json(REF_ANNOTATION)
m=c.ANNOTATION_DOCUMENT.TIER[f].ANNOTATION[l].REF_ANNOTATION[n],add_REF_ANNOTATION(m),console.log("Si esta a\xF1adiendo"),bandera_grabar=!0}else for(var o,n=0;n<c.ANNOTATION_DOCUMENT.TIER[f].ANNOTATION[l].ALIGNABLE_ANNOTATION.length;n++)//console.log("Uno por uno "+j)
//console.log(ALIGNABLE_ANNOTATION);
o=c.ANNOTATION_DOCUMENT.TIER[f].ANNOTATION[l].ALIGNABLE_ANNOTATION[n],add_Tier_Json(o),console.log("Si esta a\xF1adiendo"),bandera_grabar=!0}//Tier console.log(objson.ANNOTATION_DOCUMENT.TIER[i]);
//leer_Tier_Json(counter)
bandera_grabar&&obj.tier.push(tier_arreglo),tier_arreglo=[]}console.log("Imprime el nuevo json");//+console.log(obj);
// add_Tier_Json();
// save JSON in a file
const p=JSON.stringify(obj,null,4);// Borrando
// try {
//   fs.unlinkSync(path.join(__dirname, '..', 'public', 'eaf', 'Nuevoeaf.json'))
//   console.log('>> Se borro Nuevoeaf.json.')
// } catch (error) {
//   console.log('>>>>> NO se encontro Nuevoeaf.json para borrar')
// }
_fs.default.writeFileSync(_path.default.join(__dirname,"..","public","eaf","Nuevoeaf.json"),p),console.log("Grabo obj a JSON")}// read XML from a file
//console.log(objson.ANNOTATION_DOCUMENT.AUTHOR[0]);
//console.log(objson.ANNOTATION_DOCUMENT.TIER[0]);