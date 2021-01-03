// Collections Controllers
// Import model
import Collection from '@models/Collection'
import Glottolog from '@models/Glottolog'
import Locations from '@models/Location'
import Audioannotations from '@models/AudioAnnotations'

// import User from '@models/User'

// List all the collaborators collections
// Read and list all the Collaborators Collections
const index = async(req, res) => {

    // Query
    let query = res.locals.user.role == 'su' ? {} : { user: req.user._id }
        // Get Collecionts
    const collectionsDocs = await Collection.find(query).populate('user').exec()

    // Collections to JSON
    let collections = collectionsDocs.map(collection => {
        return collection.toJSON()
    })

    // List all the collections
    res.render('collections/index', {
        title: 'Mis colecciones',
        collections
    })
}

const createCollection = async(req, res) => {
    // Getting languages
    try {
        const glottologs = await Glottolog.find({
                $or: [{ country_ids: "MX" }, { country_ids: "US" }],
                parent_id: { $ne: "" }
            },
            'gid name parent_id'
        ).exec()

        const entities = await Locations.distinct('Nom_Ent')

        let languages = glottologs.map((language) => {
            let nlang = {}
            nlang = language.toJSON()
            return nlang
        })

        res.render('collections/create', {
            title: 'Agregar colección',
            languages,
            entities
        })
    } catch (error) {
        req.flash('error_msg', 'El servidor no esta disponible, intente mas tarde')
        return res.redirect('/dashboard')
    }
}

const addCollection = async(req, res) => {
    // Grab collections from body
    let { collection } = req.body
        // Add user
    collection.user = req.user._id

    const collectionDoc = await Collection.create(collection)
    console.log(`addCollection> Colection Created: ${collectionDoc.name}`)
        // Se encuentra usuario
    res.redirect('/collections')
}

const deleteCollection = async(req, res) => {
    const collection_id = req.params.collection_id
    try {

        // Owner Validation
        let collectionDoc = await Collection.findById(collection_id).exec()
            // Am I the collection owner or su?
        if (
            String(collectionDoc.user) != String(req.user._id) &&
            String(req.user.role) != 'su') {
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
const editCollectionForm = async(req, res) => {
    const collection_id = req.params.collection_id
    console.log(`controllers>collections> COL ID: ${collection_id}`)

    // Grab the collection to edit
    try {
        let collectionDoc = await Collection.findById(collection_id).exec()

        // Am I the collection owner or su?
        if (
            String(collectionDoc.user) != String(req.user._id) &&
            String(req.user.role) != 'su') {
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

const editCollection = async(req, res) => {
    const { collection } = req.body
    const collection_id = req.params.collection_id
    let collectionDoc
    try {
        collectionDoc = await Collection.findById(collection_id).exec()

        // am I the collection owner or su?
        if (
            String(collectionDoc.user) != String(req.user._id) &&
            String(req.user.role) != 'su') {
            // You are not the collection owner
            req.flash('error_msg', 'No eres el propietario de esta colección')
            return res.redirect('/dashboard')
        }

        // Update collection
        let result = await collectionDoc.updateCollection(collection)

        if (result.ok) {
            req.flash(
                'success_msg',
                'La colección se ha actualizado con éxito'
            )
        } else {
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

const indexCollection = async(req, res) => {

    /*const {collectionId} = req.params

    const audioannotationsDocs = await Audioannotations.find({
            user: req.user._id, collection_id: collectionId
        })
        .populate('user')
        .populate('colection')
        .exec()

    let audioannotations = audioannotationsDocs.map(audioannotation => {
        return audioannotation.toJSON()
    })

    return res.json(audioannotations)
    */
    res.render('audioannotations/index', {
            //enviar

        })
        // TODO: Toño / Alberto: Falta Renderear Salida, se debe reutilizar visualizador de TOÑO
        //res.render('audioannotations/index', {audioannotations})
}

const api_getCollectionById = async(req, res) => {
    const collection_id = req.params.collection_id
    let collectionDoc = {}
    try {
        collectionDoc = await Collection.findById(collection_id).exec()
        res.status(200).json(collectionDoc)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const api_getCollectionByUser = async(req, res) => {
    const { userId } = req.params
    try {
        let collectionDocs = await Collection.find({ "user": userId }).exec()
        return res.status(200).json({ collectionDocs })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

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
}