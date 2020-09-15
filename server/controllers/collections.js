// Collections Controllers
// Import model
import Collection from '@models/Collection'
import Glottolog from '@models/Glottolog'
import Locations from '@models/Location'
// import User from '@models/User'

// List all the collaborators collections
// Read and list all the Collaborators Collections
const index = async (req, res) => {
  // Get Collecionts
  const collectionsDocs = await Collection.find({user : req.user._id}).populate('user').exec()

  // Collections to JSON
  let collections = collectionsDocs.map(collection=>{
    return collection.toJSON()
  })

  // List all the collections
  res.render('collections/index', {
    collections
  })
}

const createCollection = async(req, res) => {
  // Getting languages 
  try {
    const glottologs = await Glottolog.find(
      {
        $or: [{ country_ids: "MX" }, { country_ids: "US" }],
        parent_id: { $ne: "" }
      },
      'gid name parent_id'
    ).exec()
    
    const entities = await Locations.distinct('Nom_Ent')
    
    let languages = glottologs.map((language)=>{
      let nlang = {}
      nlang = language.toJSON()
      return nlang
    })
  
    res.render('collections/create',{
      languages,
      entities
    })
  } catch (error) {
    req.flash('error_msg', 'El servidor no esta disponible, intente mas tarde')
    return res.redirect('/dashboard')
  }
}

const addCollection = async (req, res) => {
  // Grab collections from body
  let { collection } = req.body
  // Add user
  collection.user = req.user._id

  const collectionDoc = await Collection.create(collection)
  console.log(`addCollection> Colection Created: ${collectionDoc.name}`)
  // Se encuentra usuario
  res.redirect('/collections')
}

const deleteCollection = async (req, res) => {
  const collection_id = req.params.collection_id
  try {
    const result = await Collection.deleteOne({ _id: collection_id }).exec()
    console.log(`deleteCollection> Result: ${result}`)
    res.redirect('/collections')
  } catch (error) {
    return res.status(400).json(error)
  }
}

// Working
const editCollectionForm = async (req, res) => {
  const collection_id = req.params.collection_id
  console.log(`controllers>collections> COL ID: ${collection_id}`)

  // Grab the collection to edit
  try {
    let collectionDoc = await Collection.findById(collection_id).exec()

    // Im the collection owner?
    if (String(collectionDoc.user) != String(req.user._id)) {
      // You are not the collection owner
      req.flash('error_msg', 'No eres el propietario de esta colección')
      return res.redirect('/collections')
    }

    // Validaciones
    // Is a valid collection?
    if (!collectionDoc) {
      req.flash('error_msg', 'No se encontro la coleccion solicitada')
      return res.redirect('/dashboard')
    }
    
    collectionDoc = collectionDoc.toJSON()
    // parsing Lanugages
    collectionDoc.languages = JSON.stringify(collectionDoc.languages)
    collectionDoc.localities = JSON.stringify(collectionDoc.localities)

    // ---- TESTING
    res.render('collections/edit', {
      collectionDoc
    })

    //res.status(200).json(collectionDoc)
  } catch (error) {
    console.log(`controller>collections> Error: ${error.message}`)
    req.flash('error_msg', error.message)
    return res.redirect('/collections')
  }
}

const editCollection = async (req, res) => {
  const { collection } = req.body
  const collection_id = req.params.collection_id
  let collectionDoc
  try {
    collectionDoc = await Collection.findById(collection_id).exec()

    // Im the collection owner?
    if (String(collectionDoc.user) != String(req.user._id)) {
      // You are not the collection owner
      req.flash('error_msg', 'No eres el propietario de esta colección')
      return res.redirect('/dashboard')
    }

    // Update collection
    let result = await collectionDoc.updateCollection(collection)

    if (result.ok) {
      req.flash(
        'success_msg',
        'La coleccion se ha actualziado con exito'
      )
    }else{
      req.flash(
        'error_msg',
        'No se ha podido actualizar la colección'
      )
    }
    res.redirect('/collections')
  } catch (error) {
    // Flash Message
    req.flash(
      'error_msg',
      'No se ha podido encontrar la coleccion que se desea editar'
    )
    // Se flashea Exito
    // Get the info from
    return res.render('index/dashboard')
  }
}

export default {
  // List Collections from a particular Colaborator User
  index,
  // Create Add Collection FORM
  createCollection,
  // Process ADD Collection FORM
  addCollection,
  // Delete Collection
  deleteCollection,
  // Update Collection FORM
  editCollectionForm,
  // Process Update Collection FORM
  editCollection,
  // Lists Collections from the logged user
  // Show single Collection
  // Process Delete Collection
}
