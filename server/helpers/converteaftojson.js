import path from 'path'
import xml2js from 'xml2js'
import fs from 'fs';
//var objson ;
var tiempo_ids = "";
var tiempo_buscado = 0;
var tier_arreglo = [];
var bandera_grabar= true;
var arreglo_tiempo = [];
var arreglo_ref_tiempo=  [];
var obj_datos_tier={
    PARTICIPANT:"",
    TIER_ID:"",
    LINGUISTIC_TYPE_REF:"",
    DEFAULT_LOCALE:""}
var obj = {
    tier: [],
   //datos_tier:[]
 };
     //aqui me quede 13 de agosto 2020 hay que convertir el tiempo para  sincronizar con el mp3
 function convertir_tiempo(tiempo)
 {   tiempo= tiempo / 1000;
     return Math.trunc(tiempo)
 }
 function buscar_referencia_tier(ts)
 {   //console.log("-------ts----------")
     //console.log(ts)
     //console.log("-----------------")

    //console.log("--------busqueda ref---------")
    console.log(arreglo_ref_tiempo.find(x=>x.ANNOTATION_ID===ts).TIME_SLOT_REF1)
    console.log(arreglo_ref_tiempo.find(x=>x.ANNOTATION_ID===ts).TIME_SLOT_REF2)
    //console.log(arreglo_ref_tiempo)
    //console.log("-----------------")
    //obj_tier.TIME_SLOT_REF1=arreglo_tiempo.find(buscar_time_slot).TIME_VALUE[0];
   // console.log(typeof(objson.ANNOTATION_DOCUMENT.TIER[i].ANNOTATION[j].ALIGNABLE_ANNOTATION)); 


 }
function buscar_time_slot(ts){
  //  if (ts.TIME_SLOT_ID[0] === "ts2")
 //if (ts.TIME_SLOT_ID[0] ===tiempo_ids)
 //{
  //  tiempo_buscado= ts.TIME_VALUE[0];
   //    return tiempo_buscado
 //}  
 return ts.TIME_SLOT_ID[0] ===tiempo_ids;  
}

 function add_tiempo(tiempo)
 {
     arreglo_tiempo.push(tiempo)
 }

 function add_datos_tier(tier){
    var obj_datos_tier = new Object();
    // sin participante
    if (tier.PARTICIPANT==undefined){
        obj_datos_tier.PARTICIPANT="";

    } else 
    {
    obj_datos_tier.PARTICIPANT=tier.PARTICIPANT; 
    }
    obj_datos_tier.TIER_ID=tier.TIER_ID;
    obj_datos_tier.LINGUISTIC_TYPE_REF=tier.LINGUISTIC_TYPE_REF;
    obj_datos_tier.DEFAULT_LOCALE=tier.DEFAULT_LOCALE;
    tier_arreglo.push(obj_datos_tier);
    //depurar sin participante
    console.log("------------------")
    console.log(obj_datos_tier)
    console.log("------------------")
    //
 }
 function add_REF_ANNOTATION(id_tier)
 {
    var obj_tier = new Object();
    obj_tier.ANNOTATION_ID=id_tier.ANNOTATION_ID[0];
    obj_tier.ANNOTATION_REF=id_tier.ANNOTATION_REF[0];
    obj_tier.ANNOTATION_VALUE=id_tier.ANNOTATION_VALUE[0];
    //añadir el tiempo inicial de la ref1
    tiempo_ids=id_tier.ANNOTATION_REF[0];
    //console.log(buscar_referencia_tier(tiempo_ids))
    //console.log(arreglo_ref_tiempo.find(x=>x.ANNOTATION_ID===tiempo_ids).TIME_SLOT_REF1)
    //console.log(arreglo_ref_tiempo.find(x=>x.ANNOTATION_ID===tiempo_ids).TIME_SLOT_REF2)
    obj_tier.TIME_SLOT_REF1=arreglo_ref_tiempo.find(x=>x.ANNOTATION_ID===tiempo_ids).TIME_SLOT_REF1
    //aqui falta convertir el tiempo
    //console.log("---------")convertir_tiempo
    //console.log(convertir_tiempo(arreglo_ref_tiempo.find(x=>x.ANNOTATION_ID===tiempo_ids).TIME_SLOT_REF1))
    //console.log("---------")
    //añadir el tiempo inicial de la ref2
    //tiempo_ids=id_tier.TIME_SLOT_REF2[0];
    obj_tier.TIME_SLOT_REF2=arreglo_ref_tiempo.find(x=>x.ANNOTATION_ID===tiempo_ids).TIME_SLOT_REF2
    tier_arreglo.push(obj_tier);  

 }
 function add_Tier_Json(id_tier)
 {   
     //1 de Agosto
// me quede modificando el objeto con  tier0 y tier1  y  falta buscar y remplazar TIME_SLOT_REF1
// me quede por guardar el json y leerlo en vue tmb cambiar el archivo eaf a ver si funciona el codigo con cualquier eaf
    var obj_tier = new Object();
    var obj_ref_tier = new Object();
    obj_tier.ANNOTATION_ID=id_tier.ANNOTATION_ID[0];
    //obj_tier.TIME_SLOT_REF1=id_tier.TIME_SLOT_REF1[0];
    tiempo_ids=id_tier.TIME_SLOT_REF1[0];  
    obj_tier.TIME_SLOT_REF1=convertir_tiempo(arreglo_tiempo.find(buscar_time_slot).TIME_VALUE[0]);
    //obj_tier.TIME_SLOT_REF2=id_tier.TIME_SLOT_REF2[0];
    tiempo_ids=id_tier.TIME_SLOT_REF2[0];
    obj_tier.TIME_SLOT_REF2=convertir_tiempo(arreglo_tiempo.find(buscar_time_slot).TIME_VALUE[0]);   
    obj_tier.ANNOTATION_VALUE=id_tier.ANNOTATION_VALUE[0];    
     //obj.table.push(id_tier); 
     tier_arreglo.push(obj_tier);
     //añade a vector todos las anotaciones con tiempo para poder buscar referencias
     obj_ref_tier.ANNOTATION_ID=obj_tier.ANNOTATION_ID;
     obj_ref_tier.TIME_SLOT_REF1= obj_tier.TIME_SLOT_REF1;
     obj_ref_tier.TIME_SLOT_REF2=obj_tier.TIME_SLOT_REF2;
     //console.log("---------")
     //console.log(obj_ref_tier.TIME_SLOT_REF1)
    //console.log(convertir_tiempo(obj_ref_tier.TIME_SLOT_REF1))
    //console.log(obj_ref_tier.TIME_SLOT_REF2)
    //console.log(convertir_tiempo(obj_ref_tier.TIME_SLOT_REF2))
    //console.log("---------")
     
     arreglo_ref_tiempo.push(obj_ref_tier)   
     //obj.table.push(obj_tier);     
     
 }
 
 function leer_Author_Json( obj)
 {
    //console.log(this.objson.ANNOTATION_DOCUMENT.AUTHOR[0]);
   // console.log(obj);

 }
 function leer_Tier_Json(obj_tier)
 { 
  // console.log(obj_tier) 
 }
 export default  function (nombreEaf) {
let url =path.join(__dirname,'..','public','eaf','asset01.eaf')
console.log(url)
console.log("Aqui esta el error")
let xml=""
try {
     xml = fs.readFileSync(path.join(__dirname,'..','public','eaf','asset01.eaf'));
} catch (error) {
    console.trace(error)
    
}


//const xml = fs.readFileSync('../public/eaf/asset01.eaf-1603583874596.eaf');
// convert XML to JSON
xml2js.parseString(xml, { mergeAttrs: true }, (err, result) => {
    if (err) {
        throw err;
    }
    // `result` is a JavaScript object
    // convert it to a JSON string
    const json = JSON.stringify(result, null, 4);
    leer_Tier_Json();
   // add_Tier_Json();
    //console.log(obj);
    // save JSON in a file 
   // fs.writeFileSync('../public/eaf/eaf.json', json);   
   fs.writeFileSync(path.join(__dirname,'..','public','eaf','eaf.json'), json);  
}); 
//console.log(objson)
//var objson = require('../public/eaf/eaf.json');
var objson = require(path.join(__dirname,'..','public','eaf','eaf.json'));
//const { Console } = require('console');
leer_Author_Json(objson.ANNOTATION_DOCUMENT.AUTHOR[0])
//leer_Tier_Json(objson)

    //var jsonData_tier = JSON.parse(obj_tier);
  
//tiempo
for (var t = 0; t < objson.ANNOTATION_DOCUMENT.TIME_ORDER[0].TIME_SLOT.length; t++){
    var tiempo=objson.ANNOTATION_DOCUMENT.TIME_ORDER[0].TIME_SLOT[t];
    console.log(tiempo);
    add_tiempo(tiempo);
    
}//se envia todos los tiempos a un vector para filtrar y se encuentra uno por uno

// pruebo que busque
//console.log(" esta buscando");
//    tiempo_ids="ts54";  
//console.log(arreglo_tiempo.find(buscar_time_slot).TIME_VALUE[0]);
//console.log(arreglo_tiempo);

//tiempo = leer_Author_Json(objson.ANNOTATION_DOCUMENT.TIME_ORDER[0].TIME_SLOT.length);
//
for (var i = 0; i < objson.ANNOTATION_DOCUMENT.TIER.length; i++) {
   
    if(objson.ANNOTATION_DOCUMENT.TIER[i].ANNOTATION == undefined ) {
        console.log("tier sin anotaciones")
        bandera_grabar= false;
    }
    else
    {
     //va la información de cada tier objson.ANNOTATION_DOCUMENT.TIER.DEFAULT_LOCALE
     add_datos_tier(objson.ANNOTATION_DOCUMENT.TIER[i]);
     var counter = objson.ANNOTATION_DOCUMENT.TIER[i];    
    for (var j = 0;j < objson.ANNOTATION_DOCUMENT.TIER[i].ANNOTATION.length; j++)
    {
        var annotation = objson.ANNOTATION_DOCUMENT.TIER[i].ANNOTATION[j];
       //04 08 2020 me quede unas capas tiene REF_ANNOTATION es donde me marca error y otras ALIGNABLE_ANNOTATION que es la que funciona
         //filtrar por LINGUISTIC_TYPE son 3 tipos y cada uno tiene su estructura 
         //Transcripción
         //"Comentarios"
         //"Traducción"
         //checar tier 7 vs tier 1
         console.log("Tier "+i+" Annotation"+j)
         console.log(typeof(objson.ANNOTATION_DOCUMENT.TIER[i].ANNOTATION[j].ALIGNABLE_ANNOTATION)); 
         console.log(objson.ANNOTATION_DOCUMENT.TIER[i].ANNOTATION[j].ALIGNABLE_ANNOTATION); 
        if  (objson.ANNOTATION_DOCUMENT.TIER[i].ANNOTATION[j].ALIGNABLE_ANNOTATION == undefined )
        { 
         console.log("Estoy entrando a EGS Traducción");
         for (var k=0; k<objson.ANNOTATION_DOCUMENT.TIER[i].ANNOTATION[j].REF_ANNOTATION.length;k++)
         {
             var REF_ANNOTATION = objson.ANNOTATION_DOCUMENT.TIER[i].ANNOTATION[j].REF_ANNOTATION[k];
             //console.log("Uno por uno "+j)
             //console.log(ALIGNABLE_ANNOTATION);
             //me quede mejorando el json y haciendo un nivel superior que se llama "TIER_ID" para los tipos de traduccion
             //add_Tier_Json(REF_ANNOTATION)
             add_REF_ANNOTATION(REF_ANNOTATION);
             console.log("Si esta añadiendo")
             bandera_grabar= true;
         }
        }  
        else { 
        for (var k=0; k<objson.ANNOTATION_DOCUMENT.TIER[i].ANNOTATION[j].ALIGNABLE_ANNOTATION.length;k++)
        {
            var ALIGNABLE_ANNOTATION = objson.ANNOTATION_DOCUMENT.TIER[i].ANNOTATION[j].ALIGNABLE_ANNOTATION[k];
            //console.log("Uno por uno "+j)
            //console.log(ALIGNABLE_ANNOTATION);
            add_Tier_Json(ALIGNABLE_ANNOTATION)
            console.log("Si esta añadiendo")
            bandera_grabar= true;
        }
    }
    }
    }
   //Tier console.log(objson.ANNOTATION_DOCUMENT.TIER[i]);
    //leer_Tier_Json(counter)
    if (bandera_grabar){
    obj.tier.push(tier_arreglo);
    //agregar al arreglo obj_datos_tier obj.
     //obj.datos_tier.push(tier_arreglo) //06 de agosto verificando el archivo json 
    }
    tier_arreglo=[];
}
console.log("Imprime el nuevo json");
console.log(obj);
   // add_Tier_Json();
    // save JSON in a file
    const jsonobj = JSON.stringify(obj, null, 4); 
   // path.join(__dirname,'..','public','eaf','eaf.json')  
//fs.writeFileSync('../public/eaf/Nuevoeaf.json', jsonobj);
fs.writeFileSync(path.join(__dirname,'..','public','eaf','Nuevoeaf.json') , jsonobj);

console.log("Grabo obj a JSON");

 } 
// read XML from a file



 //console.log(objson.ANNOTATION_DOCUMENT.AUTHOR[0]);
 //console.log(objson.ANNOTATION_DOCUMENT.TIER[0]);