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

  // const collectionDoc = await Collection.create(
  //   collection
  // ).exec()
  const collectionDoc = collection
  // Se encuentra usuario
  res.status(200).json(collectionDoc)
}

export default {
  // List Collections from a particular Colaborator User
  index,
  // Create Add Collection FORM
  createCollection,
  // Process ADD Collection FORM
  addCollection,
  // Update Collection FORM

  // Process Update Collection FORM

  // Lists Collections from the logged user
  // Show single Collection
  // Process Delete Collection
}
