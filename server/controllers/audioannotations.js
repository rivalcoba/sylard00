import Collection from '@models/Collection'
import Glottolog from '@models/Glottolog'
import Locations from '@models/Location'
import Audioannotations from '@models/AudioAnnotations'


const index = async (req, res) => {
  res.render('audioannotations/index', {
    
  })
}

const createAudioannotation = async (req, res) => {
  res.render('audioannotations/create', {
    
  })
}
const addAudioannotation = async (req, res) => {
  const {
    titulo,
    description,
    genero,
    mp3_url
  } = req.body

  let audioannotations = {
    titulo,
    description,
    genero,
    mp3_url
  }
 audioannotations.user = req.user._id

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
  console.log(`addAudioannotation> Audioannotation Created: ${AudioannotationDoc}`)
  // Se encuentra usuario  
  console.log(req.body);
  console.log('Aqui')
  console.log(res);
  res.send('POST request to the homepage')

  // res.redirect('/collections')
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
  addAudioannotation
}