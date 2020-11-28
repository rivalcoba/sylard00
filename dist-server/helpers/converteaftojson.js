"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=_default;var _path=_interopRequireDefault(require("path")),_xml2js=_interopRequireDefault(require("xml2js")),_fs=_interopRequireDefault(require("fs"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var jsonobj=null,objson=null,tiempo_ids="",tiempo_buscado=0,tier_arreglo=[],bandera_grabar=!0,arreglo_tiempo=[],arreglo_ref_tiempo=[],obj_datos_tier={PARTICIPANT:"",TIER_ID:"",LINGUISTIC_TYPE_REF:"",DEFAULT_LOCALE:""},obj={tier:[]//datos_tier:[]
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
return a.TIME_SLOT_ID[0]===tiempo_ids}function add_tiempo(a){arreglo_tiempo.push(a)}function add_datos_tier(a){obj_datos_tier={},obj_datos_tier.PARTICIPANT=null==a.PARTICIPANT?"":a.PARTICIPANT,obj_datos_tier.TIER_ID=a.TIER_ID,obj_datos_tier.LINGUISTIC_TYPE_REF=a.LINGUISTIC_TYPE_REF,obj_datos_tier.DEFAULT_LOCALE=a.DEFAULT_LOCALE,tier_arreglo.push(obj_datos_tier)}function add_REF_ANNOTATION(a){let b={};//añadir el tiempo inicial de la ref1
//console.log(buscar_referencia_tier(tiempo_ids))
//console.log(arreglo_ref_tiempo.find(x=>x.ANNOTATION_ID===tiempo_ids).TIME_SLOT_REF1)
//console.log(arreglo_ref_tiempo.find(x=>x.ANNOTATION_ID===tiempo_ids).TIME_SLOT_REF2)
//aqui falta convertir el tiempo
//console.log("---------")convertir_tiempo
//console.log(convertir_tiempo(arreglo_ref_tiempo.find(x=>x.ANNOTATION_ID===tiempo_ids).TIME_SLOT_REF1))
//console.log("---------")
//añadir el tiempo inicial de la ref2
//tiempo_ids=id_tier.TIME_SLOT_REF2[0];
b.ANNOTATION_ID=a.ANNOTATION_ID[0],b.ANNOTATION_REF=a.ANNOTATION_REF[0],b.ANNOTATION_VALUE=a.ANNOTATION_VALUE[0],tiempo_ids=a.ANNOTATION_REF[0],b.TIME_SLOT_REF1=arreglo_ref_tiempo.find(a=>a.ANNOTATION_ID===tiempo_ids).TIME_SLOT_REF1,b.TIME_SLOT_REF2=arreglo_ref_tiempo.find(a=>a.ANNOTATION_ID===tiempo_ids).TIME_SLOT_REF2,tier_arreglo.push(b)}function add_alignable_annotation(a){//1 de Agosto
// me quede modificando el objeto con  tier0 y tier1  y  falta buscar y remplazar TIME_SLOT_REF1
// me quede por guardar el json y leerlo en vue tmb cambiar el archivo eaf a ver si funciona el codigo con cualquier eaf
let b={},c={};//obj_tier.TIME_SLOT_REF1=id_tier.TIME_SLOT_REF1[0];
//obj_tier.TIME_SLOT_REF2=id_tier.TIME_SLOT_REF2[0];
//obj.table.push(id_tier); 
//console.log("---------add_alignable_annotation")
//console.log(obj_tier)
//console.log("---------add_alignable_annotation")
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
}function _default(a){_path.default.join(__dirname,"..","public","eaf",a);tier_arreglo=[],objson=null,jsonobj=null,obj_datos_tier=null,objson=require(_path.default.join(__dirname,"..","public","eaf",a+"eaf.json"));//console.log("+++++++++++++++++leyendo el archivo+++++++++ ")
//console.log(nombreEaf+'eaf.json')
//++leer_Author_Json(objson.ANNOTATION_DOCUMENT.AUTHOR[0])
//leer_Tier_Json(objson)
//var jsonData_tier = JSON.parse(obj_tier);
//tiempo
for(let b,c=0;c<objson.ANNOTATION_DOCUMENT.TIME_ORDER[0].TIME_SLOT.length;c++)//+console.log(tiempo);
b=objson.ANNOTATION_DOCUMENT.TIME_ORDER[0].TIME_SLOT[c],add_tiempo(b);//se envia todos los tiempos a un vector para filtrar y se encuentra uno por uno
// pruebo que busque
//console.log(" esta buscando");
//    tiempo_ids="ts54";  
//console.log(arreglo_tiempo.find(buscar_time_slot).TIME_VALUE[0]);
//console.log(arreglo_tiempo);
objson.ANNOTATION_DOCUMENT.TIER.length;//console.log("++++++++++++++++++++++++");
//console.log("Longitud del tier "+longitud_tier )
//tiempo = leer_Author_Json(objson.ANNOTATION_DOCUMENT.TIME_ORDER[0].TIME_SLOT.length);
//
for(let b=0;b<objson.ANNOTATION_DOCUMENT.TIER.length;b++){if(objson.ANNOTATION_DOCUMENT.TIER[b].ANNOTATION==null)//+ console.log("tier sin anotaciones")
bandera_grabar=// error
// error
// error
!1;else{add_datos_tier(objson.ANNOTATION_DOCUMENT.TIER[b]),bandera_grabar=!1;objson.ANNOTATION_DOCUMENT.TIER[b];//console.log("++++++++++++++++Datos ANNOTATION_DOCUMENT.TIER+++++++++++++++++++++")  
// console.log(counter)
// console.log("Cantidad de Annotaciones"+objson.ANNOTATION_DOCUMENT.TIER[i].ANNOTATION.length)
for(let a,c=0;c<objson.ANNOTATION_DOCUMENT.TIER[b].ANNOTATION.length;c++)//04 08 2020 me quede unas capas tiene REF_ANNOTATION es donde me marca error y otras ALIGNABLE_ANNOTATION que es la que funciona
//filtrar por LINGUISTIC_TYPE son 3 tipos y cada uno tiene su estructura 
//Transcripción
//"Comentarios"
//"Traducción"
//checar tier 7 vs tier 1
//+console.log("Tier "+i+" Annotation"+j)
//+console.log(typeof(objson.ANNOTATION_DOCUMENT.TIER[i].ANNOTATION[j].ALIGNABLE_ANNOTATION)); 
//+console.log(objson.ANNOTATION_DOCUMENT.TIER[i].ANNOTATION[j].ALIGNABLE_ANNOTATION); 
if(a=objson.ANNOTATION_DOCUMENT.TIER[b].ANNOTATION[c],null==objson.ANNOTATION_DOCUMENT.TIER[b].ANNOTATION[c].ALIGNABLE_ANNOTATION)//++console.log("Estoy entrando a EGS Traducción");
for(let a,d=0;d<objson.ANNOTATION_DOCUMENT.TIER[b].ANNOTATION[c].REF_ANNOTATION.length;d++)//console.log("1 por 1 ",j+1)
//+console.log(REF_ANNOTATION);
//me quede mejorando el json y haciendo un nivel superior que se llama "TIER_ID" para los tipos de traduccion
//add_Tier_Json(REF_ANNOTATION)
//console.log("Si esta añadiendo")
a=objson.ANNOTATION_DOCUMENT.TIER[b].ANNOTATION[c].REF_ANNOTATION[d],add_REF_ANNOTATION(a),bandera_grabar=!0;else for(let a,d=0;d<objson.ANNOTATION_DOCUMENT.TIER[b].ANNOTATION[c].ALIGNABLE_ANNOTATION.length;d++)//console.log("Uno por uno ",j+1)
//console.log(ALIGNABLE_ANNOTATION);
//console.log("Si esta añadiendo")
a=objson.ANNOTATION_DOCUMENT.TIER[b].ANNOTATION[c].ALIGNABLE_ANNOTATION[d],add_alignable_annotation(a),bandera_grabar=!0}//Tier console.log(objson.ANNOTATION_DOCUMENT.TIER[i]);
//leer_Tier_Json(counter)
bandera_grabar&&obj.tier.push(tier_arreglo),tier_arreglo=[],bandera_grabar=!1}console.log("Imprime el nuevo json"),jsonobj=JSON.stringify(obj,null,4);// path.join(__dirname,'..','public','eaf','eaf.json')  
//fs.writeFileSync('../public/eaf/Nuevoeaf.json', jsonobj);
const b=require("fs");try{b.writeFileSync(_path.default.join(__dirname,"..","public","eaf","Nuevoeaf.json"),jsonobj),console.log("Grabo obj a JSON"),console.log("==============================")}catch(a){console.error(err)}//fs.close('Nuevoeaf.json')
//  obj=null;
obj={tier:[]}}//console.log("(((((((((((((((((((((((((((((((((((Aqui esta entrando ")
// read XML from a file
//console.log(objson.ANNOTATION_DOCUMENT.AUTHOR[0]);
//console.log(objson.ANNOTATION_DOCUMENT.TIER[0]);