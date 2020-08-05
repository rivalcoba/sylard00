import fs from 'fs'

function readFileSync(filePath){
    let rawData = fs.readFileSync(filePath)
    let dataObject = JSON.parse(rawData)
    return dataObject
}
function readFile(filePath, cb){
    fs.readFile(filePath, (err, rawdata)=>{
        if(err){
            cb(err, null)
        }else{
            let dataObject = JSON.parse(rawdata)
            cb(null, data)
        }
    })
}

export default {
    readFileSync,
    readFile
}