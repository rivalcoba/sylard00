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
}function _default(a){_path.default.join(__dirname,"..","public","eaf",a);//console.log(objson)
//var objson = require('../public/eaf/eaf.json');
var b=require(_path.default.join(__dirname,"..","public","eaf","eaf.json"));leer_Author_Json(b.ANNOTATION_DOCUMENT.AUTHOR[0]);//leer_Tier_Json(objson)
//var jsonData_tier = JSON.parse(obj_tier);
//tiempo
for(var c,d=0;d<b.ANNOTATION_DOCUMENT.TIME_ORDER[0].TIME_SLOT.length;d++)//+console.log(tiempo);
c=b.ANNOTATION_DOCUMENT.TIME_ORDER[0].TIME_SLOT[d],add_tiempo(c);//se envia todos los tiempos a un vector para filtrar y se encuentra uno por uno
// pruebo que busque
//console.log(" esta buscando");
//    tiempo_ids="ts54";  
//console.log(arreglo_tiempo.find(buscar_time_slot).TIME_VALUE[0]);
//console.log(arreglo_tiempo);
//tiempo = leer_Author_Json(objson.ANNOTATION_DOCUMENT.TIME_ORDER[0].TIME_SLOT.length);
//
for(var e=0;e<b.ANNOTATION_DOCUMENT.TIER.length;e++){if(b.ANNOTATION_DOCUMENT.TIER[e].ANNOTATION==null)//+ console.log("tier sin anotaciones")
bandera_grabar=// error
// error
// error
!1;else{add_datos_tier(b.ANNOTATION_DOCUMENT.TIER[e]);for(var f,g=b.ANNOTATION_DOCUMENT.TIER[e],h=0;h<b.ANNOTATION_DOCUMENT.TIER[e].ANNOTATION.length;h++)//04 08 2020 me quede unas capas tiene REF_ANNOTATION es donde me marca error y otras ALIGNABLE_ANNOTATION que es la que funciona
//filtrar por LINGUISTIC_TYPE son 3 tipos y cada uno tiene su estructura 
//Transcripción
//"Comentarios"
//"Traducción"
//checar tier 7 vs tier 1
//+console.log("Tier "+i+" Annotation"+j)
//+console.log(typeof(objson.ANNOTATION_DOCUMENT.TIER[i].ANNOTATION[j].ALIGNABLE_ANNOTATION)); 
//+console.log(objson.ANNOTATION_DOCUMENT.TIER[i].ANNOTATION[j].ALIGNABLE_ANNOTATION); 
if(f=b.ANNOTATION_DOCUMENT.TIER[e].ANNOTATION[h],null==b.ANNOTATION_DOCUMENT.TIER[e].ANNOTATION[h].ALIGNABLE_ANNOTATION)//++console.log("Estoy entrando a EGS Traducción");
for(var l,m=0;m<b.ANNOTATION_DOCUMENT.TIER[e].ANNOTATION[h].REF_ANNOTATION.length;m++)//console.log("Uno por uno "+j)
//console.log(ALIGNABLE_ANNOTATION);
//me quede mejorando el json y haciendo un nivel superior que se llama "TIER_ID" para los tipos de traduccion
//add_Tier_Json(REF_ANNOTATION)
//+console.log("Si esta añadiendo")
l=b.ANNOTATION_DOCUMENT.TIER[e].ANNOTATION[h].REF_ANNOTATION[m],add_REF_ANNOTATION(l),bandera_grabar=!0;else for(var n,m=0;m<b.ANNOTATION_DOCUMENT.TIER[e].ANNOTATION[h].ALIGNABLE_ANNOTATION.length;m++)//console.log("Uno por uno "+j)
//console.log(ALIGNABLE_ANNOTATION);
//+console.log("Si esta añadiendo")
n=b.ANNOTATION_DOCUMENT.TIER[e].ANNOTATION[h].ALIGNABLE_ANNOTATION[m],add_Tier_Json(n),bandera_grabar=!0}//Tier console.log(objson.ANNOTATION_DOCUMENT.TIER[i]);
//leer_Tier_Json(counter)
bandera_grabar&&obj.tier.push(tier_arreglo),tier_arreglo=[]}console.log("Imprime el nuevo json");//+console.log(obj);
// add_Tier_Json();
// save JSON in a file
var o=JSON.stringify(obj,null,4);// path.join(__dirname,'..','public','eaf','eaf.json')  
try{_fs.default.unlinkSync(_path.default.join(__dirname,"..","public","eaf","Nuevoeaf.json")),console.log(">> Se borro Nuevoeaf.json.")}catch(a){console.log(">>>>> NO se encontro Nuevoeaf.json para borrar")}//fs.writeFileSync('../public/eaf/Nuevoeaf.json', jsonobj);
const p=require("fs");try{p.writeFileSync(_path.default.join(__dirname,"..","public","eaf","Nuevoeaf.json"),o),console.log("Grabo obj a JSON"),console.log("==============================")}catch(a){console.error(err)}//fs.close('Nuevoeaf.json')
obj=null,o=null}// read XML from a file
//console.log(objson.ANNOTATION_DOCUMENT.AUTHOR[0]);
//console.log(objson.ANNOTATION_DOCUMENT.TIER[0]);