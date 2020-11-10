import Collection from '@models/Collection'
import Glottolog from '@models/Glottolog'
import Locations from '@models/Location'
import Audioannotations from '@models/AudioAnnotations'
import convertEaf2json from '@helpers/converteaftojson' 


import multer from 'multer'


const index = async (req, res) => {
  // Get Collecionts
//const collectionsDocs = await Collection.find({user : req.user._id}).populate('user').exec()


// Collections to JSON
// const audioannotationsDocs2 = await Audioannotations.aggregate([
//    { "$match": { "user": req.user._id } },
   
//   {
//     $lookup:
//     {
//       from: "Collection",
//       localField:"location",
//       foreignField:"localities._id",
//       as:"localidades"

//     }    
//   }
// ]).exec(function(err, results){
//     console.log(results);
//  })

console.log("Aqui")

const audioannotationsDocs = await Audioannotations.find({user: req.user._id}).populate('user').populate('colection').exec()

let locality_found;

audioannotationsDocs.forEach((audioannotation,index) =>{
  let loc_id = audioannotation.location;
  audioannotation.colection.localities.forEach(location => {
    console.log(`>ln40> loc_id: ${loc_id} - ${location._id} - ${index} - ${location.Nom_Loc}`);
    if(String(loc_id) === String(location._id)){
    console.log(`>>>>> ENCONTRADO: ln40> loc_id: ${loc_id} - ${location._id} - ${index} - ${location.Nom_Loc}`);
      console.log("Antes de asignar")
      console.log(location)
      audioannotationsDocs[index].location =location;
      console.log("Asignado")
      console.log(audioannotationsDocs[index].location)

    }
  });
  let glotid=audioannotation.gid;
    audioannotation.colection.languages.forEach(gid => {
    //console.log(`>ln40> loc_id: ${loc_id} - ${gid._id} - ${index} - ${gid.Nom_Loc}`);
    if(String(glotid) === String(gid._id)){
    //console.log(`>>>>> ENCONTRADO: ln40> loc_id: ${loc_id} - ${gid._id} - ${index} - ${gid.Nom_Loc}`);
      //console.log("Antes de asignar")
      //console.log(gid)
      audioannotationsDocs[index].gid =gid;
      //console.log("Asignado")
      //console.log(audioannotationsDocs[index].gid)

    }
  });
});

let audioannotations  = audioannotationsDocs.map(audioannotation=>{
    return audioannotation.toJSON()
  })

// let collections = collectionsDocs.map(collection=>{
//   return collection.toJSON()
// })

//return res.status(200).json(audioannotationsDocs);

  // console.log("Aqui")
 //console.log(collections)
  res.render('audioannotations/index', {
   //enviar 
   audioannotations

  })
}


const createAudioannotation =  (req, res) => {
  // Getting languages
  res.render('audioannotations/create')
}
const addAudioannotation = async (req, res) => {
  const {
    eaf,
    titulo,
    description,
    genero,
    mp3_url,
    colection,
    duracion,
    location,
    gid,
    siglas,
  } = req.body

  let audioannotations = {
    eaf,
    titulo,
    description,
    genero,
    mp3_url,
    colection,
    duracion,
    location,
    gid,
    siglas,
  }

  console.log("-------------------Aqui")
  //console.log(req)
 //console.log('Duracion')
 //console.log(req.body)
  //console.log('File')


 audioannotations.user = req.user._id
//audioannotations.colection=req.colection._id


  //const audioannotations = new Audioannotations({
  //  titulo: req.body.titulo,
  //  description: req.body.description,
  //  genero :  req.body.genero,
  //  mp3_url: req.body.mp3_url,
  //});
  //let { audioannotations } = req.body

  //Audioannotations
  //.create(audioannotations)
  //.then(data => {
   //   console.log('Aqui');
   //   console.log(data);
   //   res.send(data);
   // })
   // .catch(err => {
   //   res.status(500).send({
   //     message:
   //       err.message || "Some error occurred while creating the Tutorial."
    //  });
    //});

    // Add user
  //audioannotations.user = req.user._id
  //checar https://bezkoder.com/node-express-mongodb-crud-rest-api/
  // audioannotations = {
  //   name : "IvanAA",
  //   titulo : "GamEaf"
  // }
  
  const AudioannotationDoc = await Audioannotations.create(audioannotations)
  //console.log(`addAudioannotation> Audioannotation Created: ${AudioannotationDoc}`)
  // Se encuentra usuario  
  //console.log(req.body);
  //console.log('Aqui')


  //res.send('POST request to the homepage')

  res.redirect('/audioannotations')
}
//uploadfile
//aqui me quede




const uploadfileAudioannotation = async (req, res ,next) => {

const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
   //convertir nuevoJSON Aqui
   //console.log("-----------aqui----------")
   //console.log(file)
   convertEaf2json(file.filename)
    
  try {
    // Obteniendo datos de las collections
    const collectionsDocs = await Collection.find({user:req.user._id}).populate('user').exec()
      let collections  = collectionsDocs.map(collection=>{
         return collection.toJSON()
       })
      res.render("audioannotations/create",{ filename : file.filename, collections})
  } catch (error) {
    res.status(500).json(error)
  }
}
const editAudioannotation = async (req, res) => {
  res.render('audioannotations/edit', {
    
  })
}

const deleteAudioannotaion = async (req, res) => {
  const audioannotation_id = req.params.audioannotation_id
  try {
    //console.log("Borrar este")
    //console.log(req.)
    let audioannotationsDocs = await Audioannotations.findById(audioannotation_id).exec()
    const file =audioannotationsDocs.eaf
    //console.log(file);
    const result = await Audioannotations.deleteOne({ _id: audioannotation_id }).exec()
    console.log(`deleteAudioannotation> Result: ${result}`)
    //Borrado del archivo fisicamente
    const fs = require('fs') 
    const path = 'server/public/eaf/'+file
    fs.unlinkSync(path) 
    res.redirect('/audioannotations')
  } catch (error) {
    //error de borrado
    console.error(err)
    return res.status(400).json(error)
  }
}


const vuetestAudioannotaion = async (req, res) => {
  res.render('audioannotations/vuetest', {
    
  })
}

export default {
  index,
  createAudioannotation,
  editAudioannotation,
  deleteAudioannotaion, 
  addAudioannotation,
  uploadfileAudioannotation,
  vuetestAudioannotaion
}