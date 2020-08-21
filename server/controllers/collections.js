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
  let { collection } = req.body
  // Add user
  collection.user = req.user._id

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
  
  // Grab the collection to edit
  try {
    let collectionDoc = await Collection.findById(collection_id).exec()

    // Im the collection owner?    
    if(String(collectionDoc.user) != String(req.user._id)){
      // You are not the collection owner
      req.flash('error_msg', 'No eres el propietario de esta colección');
      return res.redirect('/dashboard')
    }

    // Validaciones
    // Is a valid collection?
    if(!collectionDoc){      
      req.flash('error_msg', 'No se encontro la coleccion solicitada');
      return res.redirect('/dashboard')
    }
    
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
  const {collection} = req.body
  const collection_id = req.params.collection_id
  let collectionDoc
  try {
    collectionDoc = await Collection.findById(collection_id).exec()

    // Im the collection owner?    
    if(String(collectionDoc.user) != String(req.user._id)){
      // You are not the collection owner
      req.flash('error_msg', 'No eres el propietario de esta colección');
      return res.redirect('/dashboard')
    }

    // Update collection
    let result = await collectionDoc.updateCollection(collection)
    
    return res.status(200).json({
      collectionDoc : result.toJSON()
    })
    
    res.render('collections/edit', {
      collectionDoc : collectionDoc.toJSON()
    })

  } catch (error) {
    // Flash Message
    req.flash('error_msg', 'No se ha podido encontrar la coleccion que se desea editar');
    // Get the info from
    return res.redirect('/dashboard')
  }
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
