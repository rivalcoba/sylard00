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


const createAudioannotation = async (req, res) => {
 const collectionsDocs = await Collection.find({user:req.user._id}).populate('user').exec()
 let collections  = collectionsDocs.map(collection=>{
    return collection.toJSON()
  })
  console.log('Aqui')
  console.log(collections)
  res.render('audioannotations/create', {
collections
    
  })
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
 console.log('Duracion')
 console.log(req.body) 
 //console.log(audioannotations) 
 //audioannotations.eaf= req.file.filename
 console.log(req.file)
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
    res.send(file)
         

}
const editAudioannotation = async (req, res) => {
  res.render('audioannotations/edit', {
    
  })
}

const deleteAudioannotaion = async (req, res) => {

}
export default {
  index,
  createAudioannotation,
  editAudioannotation,
  deleteAudioannotaion, 
  addAudioannotation,
  uploadfileAudioannotation
}