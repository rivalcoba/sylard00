import path from 'path'
import xml2js from 'xml2js'
import fs from 'fs';
import winston from '@config/winston'
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
 export default  function (nombreEaf) {
let url =path.join(__dirname,'..','public','eaf',nombreEaf) 
//+console.log(url)
winston.info(` ============================== `);
winston.info(` Aqui lee el archivo eaf " `);
let xml=""
try {
     xml = fs.readFileSync(path.join(__dirname,'..','public','eaf',nombreEaf));
} catch (error) {
    winston.error(`error xml`);
    winston.error(error);
    
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
    //+leer_Tier_Json();
   // add_Tier_Json();
    //console.log(obj);
    // save JSON in a file 
   // fs.writeFileSync('../public/eaf/eaf.json', json);   
   fs.writeFileSync(path.join(__dirname,'..','public','eaf','tmp',nombreEaf+'.json'), json);  
   winston.info(` "Nombre Del Archivo eaf.json AGREGADO:" 
    "${nombreEaf}" `);
}); 
 } 