// Collections Controllers
// Import model
import Collection from '@models/Collection'
import Glottolog from '@models/Glottolog'
import Locations from '@models/Location'
import User from '@models/User'

// import User from '@models/User'

// List all the collaborators collections
// Read and list all the Collaborators Collections
const index = async (req, res) => {
  if (res.locals.user.role === 'su') {
    return res.redirect('/suAudiosDashboard')
  }
  // Query
  let query = res.locals.user.role == 'su' ? {} : { user: req.user._id }
  // Get Collecionts
  const collectionsDocs = await Collection.find(query)
    .populate('user')
    .exec()

  // Collections to JSON
  let collections = collectionsDocs.map(collection => {
    return collection.toJSON()
  })

  // List all the collections
  res.render('collections/index', {
    title: 'Mis colecciones',
    collections,
  })
}

const createCollection = async (req, res) => {
  // Getting languages
  try {
    const glottologs = await Glottolog.find(
      {
        $or: [{ country_ids: 'MX' }, { country_ids: 'US' }],
        parent_id: { $ne: '' },
      },
      'gid name parent_id iso639P3code'
    ).exec()

    const entities = await Locations.distinct('Nom_Ent')

    let languages = glottologs.map(language => {
      let nlang = {}
      nlang = language.toJSON()
      return nlang
    })

    res.render('collections/create', {
      title: 'Agregar colección',
      languages,
      entities,
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
    // Owner Validation
    let collectionDoc = await Collection.findById(collection_id).exec()
    // Am I the collection owner or su?
    if (
      String(collectionDoc.user) != String(req.user._id) &&
      String(req.user.role) != 'su'
    ) {
      // You are not the collection owner
      req.flash('error_msg', 'No eres el propietario de esta colección')
      return res.redirect('/collections')
    }

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

    // Am I the collection owner or su?
    if (
      String(collectionDoc.user) != String(req.user._id) &&
      String(req.user.role) != 'su'
    ) {
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
      collectionDoc,
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

    // am I the collection owner or su?
    if (
      String(collectionDoc.user) != String(req.user._id) &&
      String(req.user.role) != 'su'
    ) {
      // You are not the collection owner
      req.flash('error_msg', 'No eres el propietario de esta colección')
      return res.redirect('/dashboard')
    }

    // Update collection
    let result = await collectionDoc.updateCollection(collection)

    if (result.ok) {
      req.flash('success_msg', 'La colección se ha actualizado con éxito')
    } else {
      req.flash('error_msg', 'No se ha podido actualizar la colección')
    }
    if (res.locals.user.role == 'su')
      return res.redirect('/suCollectionsDashboard')
    return res.redirect('/collections')
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

const indexCollection = async (req, res) => {
  if (req.query && req.query.userRole === 'su') {
    return res.redirect('/suAudiosDashboard')
  }
  res.render('audioannotations/indexByCollection', {
    title: 'Audioanotaciones de la colección...',
  })
}

//NUEVA API PARA COLLECTIONS with PAG
const api_getCollectionAll = async (req, res) => {
  //let collectionDoc = {}
  const myCustomLabels = {
    totalDocs: 'itemCount',
    docs: 'itemsList',
    limit: 'perPage',
    page: 'currentPage',
    nextPage: 'next',
    prevPage: 'prev',
    totalPages: 'pageCount',
    pagingCounter: 'slNo',
    meta: 'paginator',
  }
  const options = {
    page: req.params.page,
    limit: 5,
    sort: { title: 1 },
    populate: 'colection',
    customLabels: myCustomLabels,
  }
  try {
    Collection.paginate({}, options, function(err, result) {
      if (err) {
        console.log('El error esta aqui')
        console.err(err)
        return res.status(400).json({
          mensaje: 'Ocurrio un error',
          err,
        })
      } else {
        res.json(result)
      }
    })
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error,
    })
  }

  // try {
  //     collectionDoc = await Collection.find().exec()
  //     res.status(200).json(collectionDoc)
  // } catch (error) {
  //     res.status(404).json({ error: error.message })
  // }
}

const api_getCollectionById = async (req, res) => {
  const collection_id = req.params.collection_id
  let collectionDoc = {}
  try {
    collectionDoc = await Collection.findById(collection_id).exec()
    res.status(200).json(collectionDoc)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

const api_getPagCollectionByUser = async (req, res) => {
  const myCustomLabels = {
    totalDocs: 'itemCount',
    docs: 'itemsList',
    limit: 'perPage',
    page: 'currentPage',
    nextPage: 'next',
    prevPage: 'prev',
    totalPages: 'pageCount',
    pagingCounter: 'slNo',
    meta: 'paginator',
  }

  const options = {
    page: req.params.page,
    limit: 5,
    sort: { title: 1 },
    customLabels: myCustomLabels,
  }
  const userid = res.locals.user._id
  try {
    Collection.paginate({ user: userid }, options, function(err, result) {
      if (err) {
        console.log('El error esta aqui')
        console.err(err)
        return res.status(400).json({
          mensaje: 'Ocurrio un error',
          err,
        })
      } else {
        res.json(result)
      }
    })
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error: error.message,
    })
  }
}

const api_getCollectionByUser = async (req, res) => {
  const { userId } = req.params
  try {
    let collectionDocs = await Collection.find({ 'user': userId }).exec()
    return res.status(200).json({ collectionDocs })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const api_delCollectionById = async (req, res) => {
  const collection_id = req.params.collection_id
  try {
    const collectionDoc = await Collection.findOne({
      _id: collection_id,
    }).exec()
    if (collectionDoc) {
      collectionDoc.deleteOne()
      return res.status(200).json({ 'CollectionDeleted': 'ok' })
    } else {
      return res.status(400).json({ 'CollectionDeleted': 'nothing to delete' })
    }
  } catch (error) {
    console.log('no borro en la bd', error)
    return res.status(404).json({ error: error.message })
  }
}

const api_delete = async (req, res) => {
  // Collecting the id from the body
  let { collectionsIds } = req.body

  // Normalizing in the case to recieve one
  // id or more
  collectionsIds =
    typeof collectionsIds == 'string' ? [collectionsIds] : collectionsIds

  // Building Query
  let query = {
    _id: { $in: collectionsIds },
  }

  try {
    // Getting all the collections
    let collectionsDocs = await Collection.find(query).exec()
    let deletionResults = Promise.all(
      collectionsDocs.map(async collectionDoc => {
        let result = await collectionDoc.deleteOne()
        return result
      })
    )
    res
      .status(200)
      .json({ result: 'Dellete Collection(s) ok', deletionResults })
  } catch (error) {
    console.log(`>-> Error al borrar Collection(es): ${error.message}`)
    res.status(500).json({ error: error.message })
  }
}
//API Seatch functions
const api_getCollectionFilteredbyCollection = async (req, res) => {
  //let collectionDoc = {}
  const myCustomLabels = {
    totalDocs: 'itemCount',
    docs: 'itemsList',
    limit: 'perPage',
    page: 'currentPage',
    nextPage: 'next',
    prevPage: 'prev',
    totalPages: 'pageCount',
    pagingCounter: 'slNo',
    meta: 'paginator',
  }
  const options = {
    page: req.params.page,
    limit: 5,
    sort: { title: 1 },
    populate: 'colection',
    customLabels: myCustomLabels,
  }
  let { collection } = req.params
  const collectionRegex = new RegExp(collection, 'i')
  try {
    Collection.paginate({ name: collectionRegex }, options, function(
      err,
      result
    ) {
      if (err) {
        console.log('El error esta aqui')
        console.err(err)
        return res.status(400).json({
          mensaje: 'Ocurrio un error',
          err,
        })
      } else {
        res.json(result)
      }
    })
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error,
    })
  }
}

const api_getCollectionFilteredbyLang = async (req, res) => {
  //let collectionDoc = {}
  const myCustomLabels = {
    totalDocs: 'itemCount',
    docs: 'itemsList',
    limit: 'perPage',
    page: 'currentPage',
    nextPage: 'next',
    prevPage: 'prev',
    totalPages: 'pageCount',
    pagingCounter: 'slNo',
    meta: 'paginator',
  }
  const options = {
    page: req.params.page,
    limit: 5,
    sort: { title: 1 },
    populate: 'colection',
    customLabels: myCustomLabels,
  }
  let { lang } = req.params
  const langRegex = new RegExp(lang, 'i')
  try {
    Collection.paginate(
      {
        $or: [
          { 'languages.0.language.gid': langRegex },
          { 'languages.1.language.gid': langRegex },
          { 'languages.2.language.gid': langRegex },
          { 'languages.3.language.gid': langRegex },
          { 'languages.5.language.gid': langRegex },
          { 'languages.3.language.gid': langRegex },
          { 'languages.6.language.gid': langRegex },
          { 'languages.3.language.gid': langRegex },
          { 'languages.0.language.name': langRegex },
          { 'languages.1.language.name': langRegex },
          { 'languages.2.language.name': langRegex },
          { 'languages.3.language.name': langRegex },
          { 'languages.4.language.name': langRegex },
          { 'languages.5.language.name': langRegex },
          { 'languages.6.language.name': langRegex },
        ],
      },
      options,
      function(err, result) {
        if (err) {
          console.log('El error esta aqui')
          console.err(err)
          return res.status(400).json({
            mensaje: 'Ocurrio un error',
            err,
          })
        } else {
          res.json(result)
        }
      }
    )
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error,
    })
  }
}
const api_getCollectionFilteredbyGpoL = async (req, res) => {
  //let collectionDoc = {}
  const myCustomLabels = {
    totalDocs: 'itemCount',
    docs: 'itemsList',
    limit: 'perPage',
    page: 'currentPage',
    nextPage: 'next',
    prevPage: 'prev',
    totalPages: 'pageCount',
    pagingCounter: 'slNo',
    meta: 'paginator',
  }
  const options = {
    page: req.params.page,
    limit: 5,
    sort: { title: 1 },
    populate: 'colection',
    customLabels: myCustomLabels,
  }
  let { gpol } = req.params
  const gpolRegex = new RegExp(gpol, 'i')
  try {
    Collection.paginate(
      {
        $or: [
          { 'languages.0.LanguageGroup.gid': gpolRegex },
          { 'languages.1.LanguageGroup.gid': gpolRegex },
          { 'languages.2.LanguageGroup.gid': gpolRegex },
          { 'languages.3.LanguageGroup.gid': gpolRegex },
          { 'languages.4.LanguageGroup.gid': gpolRegex },
          { 'languages.5.LanguageGroup.gid': gpolRegex },
          { 'languages.6.LanguageGroup.gid': gpolRegex },
          { 'languages.0.LanguageGroup.name': gpolRegex },
          { 'languages.1.LanguageGroup.name': gpolRegex },
          { 'languages.2.LanguageGroup.name': gpolRegex },
          { 'languages.3.LanguageGroup.name': gpolRegex },
          { 'languages.4.LanguageGroup.name': gpolRegex },
          { 'languages.5.LanguageGroup.name': gpolRegex },
          { 'languages.6.LanguageGroup.name': gpolRegex },
        ],
      },
      options,
      function(err, result) {
        if (err) {
          console.log('El error esta aqui')
          console.err(err)
          return res.status(400).json({
            mensaje: 'Ocurrio un error',
            err,
          })
        } else {
          res.json(result)
        }
      }
    )
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error,
    })
  }
}
const api_getCollectionFilteredbyCommu = async (req, res) => {
  //let collectionDoc = {}
  const myCustomLabels = {
    totalDocs: 'itemCount',
    docs: 'itemsList',
    limit: 'perPage',
    page: 'currentPage',
    nextPage: 'next',
    prevPage: 'prev',
    totalPages: 'pageCount',
    pagingCounter: 'slNo',
    meta: 'paginator',
  }
  const options = {
    page: req.params.page,
    limit: 5,
    sort: { title: 1 },
    populate: 'colection',
    customLabels: myCustomLabels,
  }
  let { commu } = req.params
  const commuRegex = new RegExp(commu, 'i')
  try {
    Collection.paginate(
      {
        $or: [
          { 'localities.0.Nom_Ent': commuRegex },
          { 'localities.1.Nom_Ent': commuRegex },
          { 'localities.2.Nom_Ent': commuRegex },
          { 'localities.3.Nom_Ent': commuRegex },
          { 'localities.4.Nom_Ent': commuRegex },
          { 'localities.5.Nom_Ent': commuRegex },
          { 'localities.6.Nom_Ent': commuRegex },
          { 'localities.0.Nom_Mun': commuRegex },
          { 'localities.1.Nom_Mun': commuRegex },
          { 'localities.2.Nom_Mun': commuRegex },
          { 'localities.3.Nom_Mun': commuRegex },
          { 'localities.4.Nom_Mun': commuRegex },
          { 'localities.5.Nom_Mun': commuRegex },
          { 'localities.6.Nom_Mun': commuRegex },
          { 'localities.0.Nom_Loc': commuRegex },
          { 'localities.1.Nom_Loc': commuRegex },
          { 'localities.2.Nom_Loc': commuRegex },
          { 'localities.3.Nom_Loc': commuRegex },
          { 'localities.4.Nom_Loc': commuRegex },
          { 'localities.5.Nom_Loc': commuRegex },
          { 'localities.6.Nom_Loc': commuRegex },
        ],
      },
      options,
      function(err, result) {
        if (err) {
          console.log('El error esta aqui')
          console.err(err)
          return res.status(400).json({
            mensaje: 'Ocurrio un error',
            err,
          })
        } else {
          res.json(result)
        }
      }
    )
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error,
    })
  }
}
const api_getCollectionFilteredbyUserId = async (req, res) => {
  //let collectionDoc = {}
  const myCustomLabels = {
    totalDocs: 'itemCount',
    docs: 'itemsList',
    limit: 'perPage',
    page: 'currentPage',
    nextPage: 'next',
    prevPage: 'prev',
    totalPages: 'pageCount',
    pagingCounter: 'slNo',
    meta: 'paginator',
  }
  const options = {
    page: req.params.page,
    limit: 5,
    sort: { title: 1 },
    populate: 'colection',
    customLabels: myCustomLabels,
  }
  let { userid } = req.params
  //const useridRegex = new RegExp(userid, 'i');
  try {
    Collection.paginate({ user: userid }, options, function(err, result) {
      if (err) {
        console.log('El error esta aqui')
        console.err(err)
        return res.status(400).json({
          mensaje: 'Ocurrio un error',
          err,
        })
      } else {
        res.json(result)
      }
    })
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error,
    })
  }
}
//final
export default {
  // List Collections from a particular Colaborator User
  index,
  // Indexa audio anotaciones que corresponden a alguna coleccion
  indexCollection,
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
  api_getCollectionById,
  api_getCollectionByUser,
  api_getPagCollectionByUser,
  api_getCollectionAll,
  api_delCollectionById,
  api_delete,
  api_getCollectionFilteredbyCollection,
  api_getCollectionFilteredbyLang,
  api_getCollectionFilteredbyGpoL,
  api_getCollectionFilteredbyCommu,
  api_getCollectionFilteredbyUserId,
}
