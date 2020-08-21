// Collections Controllers

// Import model
import Collection from '@models/Collection'
// import User from '@models/User'

// List all the collaborators collections
// Read and list all the Collaborators Collections
const index = (req, res) => {
  // List all the collections
  res.render('collections/index', {
    title: 'Contact',
    content: 'Contact the administrator',
  })
}

const createCollection = (req, res) => {
  res.render('collections/create')
}

const addCollection = async (req, res) => {
  // Grab collections from body
  const { collection } = req.body
  const collectionDoc = await Collection.create(
    collection
  )
  // Se encuentra usuario
  res.status(200).json(collectionDoc)
}

const deleteCollection = async (req,res)=>{
  const collection_id = req.params.collection_id
  try {
    const result = await Collection.deleteOne({_id: collection_id}).exec()
    return  res.status(200).json(result)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const editCollectionForm = async (req, res)=>{
  const collection_id = req.params.collection_id
  console.log(`collection_id: ${collection_id}`)
  // Grab the collection to edit
  try {
    let collectionDoc = await Collection.findById(collection_id).exec()
    console.log(`collectionDoc: ${collectionDoc}`)    
    // Validaciones
    // Is a valid collection?
    if(!collectionDoc){      
      req.flash('error_msg', 'No se encontro la coleccion solicitada');
      return res.redirect('/dashboard')
    }
    // Im the collection owner?
    console.log(`>> USER ID: <{${req.user._id}}>`)
    res.render('collections/edit', {
      collectionDoc : collectionDoc.toJSON()
    })
    //res.status(200).json(collectionDoc)
  } catch (error) {
    console.log(`controller>collections> Error: ${error.message}`)
    req.flash('error_msg', error.message);
    return res.redirect('/dashboard')
  }
}
const editCollection = async (req, res)=>{
  const collection_id = req.params.collection_id
  //let collection doc
  res.status(200).json(collection_id)
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
  editCollection
  // Lists Collections from the logged user
  // Show single Collection
  // Process Delete Collection
}
