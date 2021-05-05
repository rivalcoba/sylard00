import fs from 'fs'
import path from 'path'
import Collection from '@models/Collection'
import Audioannotations from '@models/AudioAnnotations'
import convertEaf2json from '@helpers/converteaftojson'
import deletejson from '@helpers/deletejson'
import eaftojson from '@helpers/converteaf'
import Genre from '@models/Genre'

const index = async(req, res) => {
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

    //console.log('Aqui')

    const audioannotationsDocs = await Audioannotations.find({
            user: req.user._id,
        })
        .populate('user')
        .populate('colection')
        .exec()

    // let locality_found

    // audioannotationsDocs.forEach((audioannotation, index) => {
    //   let loc_id = audioannotation.location.id
    //   audioannotation.colection.localities.forEach(location => {
    //     console.log(
    //       `>ln40> loc_id: ${loc_id} - ${location._id} - ${index} - ${location.Nom_Loc}`
    //     )
    //     if (String(loc_id) === String(location._id)) {
    //       console.log(
    //         `>>>>> ENCONTRADO: ln40> loc_id: ${loc_id} - ${location._id} - ${index} - ${location.Nom_Loc}`
    //       )
    //       console.log('Antes de asignar')
    //       console.log(location)
    //       audioannotationsDocs[index].location = location
    //       console.log('Asignado')
    //       console.log(audioannotationsDocs[index].location)
    //     }
    //   })
    //   let glotid = audioannotation.gid
    //   audioannotation.colection.languages.forEach(gid => {
    //     //console.log(`>ln40> loc_id: ${loc_id} - ${gid._id} - ${index} - ${gid.Nom_Loc}`);
    //     if (String(glotid) === String(gid._id)) {
    //       //console.log(`>>>>> ENCONTRADO: ln40> loc_id: ${loc_id} - ${gid._id} - ${index} - ${gid.Nom_Loc}`);
    //       //console.log("Antes de asignar")
    //       //console.log(gid)
    //       audioannotationsDocs[index].gid = gid
    //       //console.log("Asignado")
    //       //console.log(audioannotationsDocs[index].gid)
    //     }
    //   })
    // })

    let audioannotations = audioannotationsDocs.map(audioannotation => {
        return audioannotation.toJSON()
    })

    // let collections = collectionsDocs.map(collection=>{
    //   return collection.toJSON()
    // })

    //return res.status(200).json(audioannotationsDocs);

    // console.log("Aqui")
    //console.log(collections)
    res.render('audioannotations/index', {
        title: 'Audioanotaciones de la colección...',
        //enviar
        audioannotations,
    })
}

// Visualize Audio Annotations By Id
const indexById = async(req, res) => {
    const audioannotId = req.params.audioannotationId
    console.log(`>finding ${audioannotId}`)
        // Find audio annotation to visualize
    try {
        let audioannotationDoc = await Audioannotations.findById(audioannotId)
            .populate('collection_id')
            .populate('user').exec()
            // TODO: TOÑO
            // >>>>>>>>>>>>>>>>>>>>>>>>> ---------------------------------------- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            // >>>>>>>>>>>>>>>>>>>>>>>>> AQUI ESTA EL JSON DE LA AUDIO ANNOTACION <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            // >>>>>>>>>>>>>>>>>>>>>>>>> ---------------------------------------- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        res.json(audioannotationDoc)
            // >>>>>>>>>>>>>>>>>>>>>>>>> ---------------------------------------- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            // >>>>>>>>>>>>>>>>>>>>>>>>> ---------------------------------------- <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    } catch (error) {
        res.json(error)
    }
}

const filtrarAudioannotation = async(req, res) => {
    try {

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
        };

        const options = {
            page: req.params.page,
            limit: 5,
            sort: { title: 1 },
            populate: 'collection_id',
            customLabels: myCustomLabels,
        };

        Audioannotations.paginate({}, options, function(err, result) {
                if (err) {
                    console.log("El error esta aqui")
                    console.err(err);
                    return res.status(400).json({
                        mensaje: 'Ocurrio un error',
                        err
                    })
                } else {
                    res.json(result);
                }
            })
            //checar https://kb.objectrocket.com/mongo-db/mongoose-pagination-with-nodejs-and-mongodb-1304
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
}

const api_indexAudioannotationsByCollection = async(req, res) => {
    let { id } = req.params
    let query = { "collection_id": id }
    try {
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
        };

        const options = {
            page: req.params.page,
            limit: 5,
            sort: { title: 1 },
            populate: 'colection',
            customLabels: myCustomLabels,
        };

        Audioannotations.paginate(query, options, function(
                err,
                result
            ) {
                if (err) {
                    console.log("El error esta aqui")
                    console.err(err);
                    return res.status(400).json({
                        mensaje: 'Ocurrio un error',
                        err
                    })
                } else {
                    res.json(result);
                }
            })
            //checar https://kb.objectrocket.com/mongo-db/mongoose-pagination-with-nodejs-and-mongodb-1304
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
}

const createAudioannotation = (req, res) => {
    // Getting languages
    res.render('audioannotations/create', {
        title: 'Agregar audionotación',
        mp3Test: ""//"https://cdn.glitch.com/31e1c313-9473-4a67-b370-cbebc80a47b2%2FWhatsApp%20Audio%202020-11-09%20at%2020.55.02.mpeg"
    })
}

const addAudioannotation = async(req, res) => {
    let {
        eaf, // ok
        mp3_url, // ok
        duration, //ok
        title, // ok
        description, // ok
        colection: collection_id, // ok
        gid, // ok
        location, // ok
        genre, // ok
        PARTICIPANT,
        Visible,
        value,
        color,
        LINGUISTIC_TYPE_REF,
        TIER_ID,
        header,
    } = req.body

    // Audioannotations Creations.
    let tiers = []

    PARTICIPANT.forEach((participant, index) => {
        tiers.push({
            PARTICIPANT: participant,
            Visible: Visible[index],
            value: value[index],
            color: color[index],
            LINGUISTIC_TYPE_REF: LINGUISTIC_TYPE_REF[index],
            TIER_ID: TIER_ID[index],
        })
    })

    // Building audioannotation
    let genreDoc = await Genre.findById(genre).exec()
    let collectionDoc = await Collection.findById(collection_id).exec()
    let gidDoc = collectionDoc.languages.id(gid)
    let locationDoc = collectionDoc.localities.id(location)

    let audioannotation = {
        eaf, // ok
        title, // ok
        description, //
        genre: genreDoc, // ok - ARMAR
        duration, // ok
        mp3_url, // ok
        location: locationDoc, // ok
        collection_id, // ok
        gid: gidDoc, // ok
        user: req.user._id,
        header,
        TIER: tiers,
    }

    try {
        const audioannotationDoc = await Audioannotations.create(audioannotation);
        console.log("> Audioanotations Created: " + JSON.stringify(audioannotationDoc))
            // return res.status(200).json(audioannotationDoc)
            //res.redirect(`/audioannotations/index/${audioannotationDoc._id}`)
            //enviar a visualizar audioanootation con parametro
        res.redirect(`/audioannotations/vuetest/${audioannotationDoc._id}`)
    } catch (error) {
        return res.status(200).json({ error, from: "controller/audioannotations/addAudioannotation" })
    }
}

//uploadfile
//aqui me quede

const uploadfileAudioannotation = async(req, res, next) => {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    //convertir nuevoJSON Aqui
    // console.log("-----------ARCHIVO CARGADO EN SERVER----------")
    // console.log(file.filename)

    try {
        deletejson(file.filename)
        eaftojson(file.filename)
        convertEaf2json(file.filename)

    } catch (error) {
        console.log("Erorroesss al convertir EAF2JSON")
        console.log(error)
    }

    try {
        // Obteniendo datos de las collections
        const collectionsDocs = await Collection.find({ user: req.user._id })
            .populate('user')
            .exec()

        let collections = collectionsDocs.map(collection => {
            return collection.toJSON()
        })

        // Getting genere
        const genreDocs = await Genre.find().exec()
        let genreArray = genreDocs.map(genre => {
            return genre.toJSON()
        })

        res.render('audioannotations/create', {
            title: 'Agregar audioanotación',
            filename: file.filename,
            collections,
            genreArray,
        })
    } catch (error) {
        // Borrar eaf cargado
        fs.unlinkSync(path.join(__dirname, '..', 'public', 'eaf', file.filename))
        res.status(500).json(error)
    }
}


const editAudioannotation = async(req, res) => {

    // let genreDoc = await Genre.findById(genre).exec()
    // let collectionDoc = await Collection.findById(collection_id).exec()
    // let gidDoc = collectionDoc.languages.id(gid)
    // let locationDoc = collectionDoc.localities.id(location)

    const audioannotationid = req.params.audioannotation_id
    console.log("--------------Aqui Edit--------------")
    console.log(audioannotationid)
    res.render('audioannotations/edit', {
        title: 'Editar audioanotación',
        audioannotationid
    })
}

const deleteAudioannotaion = async(req, res) => {
    const audioannotation_id = req.params.audioannotation_id
    try {
        const document = await Audioannotations.findOne({
            _id: audioannotation_id,
        }).exec()

        document.deleteOne();
        return res.status(200).json({ "fileDeleted": "ok" })

    } catch (error) {
        console.log("no borro en la bd", error)
        return res.status(404).json(error)
    }
}

const vuetestAudioannotaion = async(req, res) => {
    const audioannotationid = req.params.audioannotation_id
    console.log("--------------Aqui--------------")
    console.log(audioannotationid)
    res.render('audioannotations/vuetest', {
        title: 'SYLARD Visor EAF',
        audioannotationid
    })
}

const color = (req, res) => {
    res.render('audioannotations/color')
}

const indexReadonlyCollection = (req, res) => {
    res.render('audioannotations/indexreadonly', {
        title: 'Audioanotaciones del catálogo',
    })
}

//   ___  ______ _____ 
//  / _ \ | ___ \_   _|
// / /_\ \| |_/ / | |  
// |  _  ||  __/  | |  
// | | | || |    _| |_ 
// \_| |_/\_|    \___/ 

const api_updateAudioAnnot = async(req, res) => {
    try {
        const { audioannotationId } = req.params
        let collectionDoc = await Audioannotations.findById(audioannotationId).exec()
        collectionDoc.set(req.body)
        let result = await collectionDoc.save()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const api_deleteAudioannotations = async(req, res) => {
    try {
        // Collecting the id from the body
        let { audioannotationsIds } = req.body
            // Normalizing in the case to recieve one
            // id or more
        audioannotationsIds =
            typeof audioannotationsIds == 'string' ? [audioannotationsIds] :
            audioannotationsIds

        // Building Query
        let query = {
            _id: { $in: audioannotationsIds },
        }

        // Getting all the collections
        let audioannotationsDocs = await Audioannotations.find(query).exec()
        let deletionResults = Promise.all(audioannotationsDocs.map(async audioannotationDoc => {
            let result = await audioannotationDoc.deleteOne()
            return result
        }))
        res.status(200).json({ result: 'Delete Audioannotation(s) ok', deletionResults })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export default {
    index,
    createAudioannotation,
    editAudioannotation,
    deleteAudioannotaion,
    addAudioannotation,
    uploadfileAudioannotation,
    vuetestAudioannotaion,
    filtrarAudioannotation,
    indexById,
    indexReadonlyCollection,
    api_updateAudioAnnot,
    api_indexAudioannotationsByCollection,
    api_deleteAudioannotations,
    color,
}