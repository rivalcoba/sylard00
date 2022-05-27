import path from 'path'
import xml2js from 'xml2js'
import fs from 'fs';
import winston from '@config/winston'
//var objson ;
 export default  function (nombreEaf) {
let url =path.join(__dirname,'..','public','eaf',nombreEaf)
//+console.log(url)
winston.info(` ============================== `);  
winston.info(` Leyendo Archivo eaf  `);
 try {
    fs.unlinkSync(path.join(__dirname,'..','public','eaf','eaf.json'))
    winston.info(` >> Se borro eaf.json. `); 
   } catch (error) {
    //winston.error(` >> No se borro eaf.json por que no existe. `);
   } 
try {
    fs.unlinkSync(path.join(__dirname, '..', 'public', 'eaf', 'tmp', 'Nuevoeaf.json'))
    
    winston.info(` >> Se borro Nuevo eaf.json. `);   
} catch (error) {
    winston.error(`>>>>> NO se encontro Nuevoeaf.json para borrar`);
}
//const xml = fs.readFileSync('../public/eaf/asset01.eaf-1603583874596.eaf');
// convert XML to JSON
 }