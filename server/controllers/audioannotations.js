import Collection from '@models/Collection'
import Glottolog from '@models/Glottolog'
import Locations from '@models/Location'
import Audioannotations from '@models/AudioAnnotations'

import multer from 'multer'


const index = async (req, res) => {
  // Get Collecionts
  //const collectionsDocs = await Collection.find({user : req.user._id}).populate('user').exec()
const audioannotationsDocs = await Audioannotations.find({user: req.user._id}).populate('user').exec()
let audioannotations  = audioannotationsDocs.map(audioannotation=>{
    return audioannotation.toJSON()
  })
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
    duracion
  } = req.body

  let audioannotations = {
    eaf,
    titulo,
    description,
    genero,
    mp3_url,
    colection,
    duracion
  }
 //console.log('Duracion')
 //console.log(req.body)
  console.log('File')


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
    
  try {
    // Obtenuendo datos de las collections
    const collectionsDocs = await Collection.find({user:req.user._id}).populate('user').exec()
      let collections  = collectionsDocs.map(collection=>{
         return collection.toJSON()
       })
      res.render("audioannotations/create",{ filename : file.filename, collections})
  } catch (error) {
    
  }
}
const editAudioannotation = async (req, res) => {
  res.render('audioannotations/edit', {
    
  })
}

const deleteAudioannotaion = async (req, res) => {
  const audioannotation_id = req.params.audioannotation_id
  try {
    console.log("Borrar este")
    //console.log(req.)
    let audioannotationsDocs = await Audioannotations.findById(audioannotation_id).exec()
    const file =audioannotationsDocs.eaf
    console.log(file);
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


export default {
  index,
  createAudioannotation,
  editAudioannotation,
  deleteAudioannotaion, 
  addAudioannotation,
  uploadfileAudioannotation
}