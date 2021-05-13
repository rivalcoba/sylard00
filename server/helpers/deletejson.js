import path from 'path'
import xml2js from 'xml2js'
import fs from 'fs';
//var objson ;
 export default  function (nombreEaf) {
let url =path.join(__dirname,'..','public','eaf',nombreEaf)
//+console.log(url)
console.log("==============================")
console.log("Aqui lee el eaf "+nombreEaf)
 try {
    fs.unlinkSync(path.join(__dirname,'..','public','eaf','eaf.json'))
    console.log(">> Se borro eaf.json.");
   } catch (error) {
       console.log(">> No se borro eaf.json por que no existe.")
   }
try {
    fs.unlinkSync(path.join(__dirname, '..', 'public', 'eaf', 'tmp', 'Nuevoeaf.json'))
    
    console.log(">> Se borro Nuevoeaf.json.");
} catch (error) {
    console.log(">>>>> NO se encontro Nuevoeaf.json para borrar")
}
//const xml = fs.readFileSync('../public/eaf/asset01.eaf-1603583874596.eaf');
// convert XML to JSON
 }