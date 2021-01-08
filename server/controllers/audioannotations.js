import fs from 'fs'
import path from 'path'
import Collection from '@models/Collection'
import Glottolog from '@models/Glottolog'
import Locations from '@models/Location'
import Audioannotations from '@models/AudioAnnotations'
import convertEaf2json from '@helpers/converteaftojson'
import deletejson from '@helpers/deletejson'
import eaftojson from '@helpers/converteaf'
import Genre from '@models/Genre'

import multer from 'multer'
import { json } from 'express'

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
    // ,page = Math.max(0, req.param('page'))
   // var arregloAudio=[]
    //console.log("Aqui esta el parametro"+req.param('page'))
    // Aqui me quede le quite el await
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
  limit: 1,
  sort: { title: 1 },
  populate:'colection',
  customLabels: myCustomLabels,
};
    
    Audioannotations.paginate({},options,function(
    err,
    result
  ){
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
      //const audioannotationsDocs = await Audioannotations.find({ user: req.user._id }).sort({"title":1}).populate('user').populate('colection').exec()
        
        //var tempaudio= "{value:333}"
        //arregloAudio.push(audioannotationsDocs)
        //arregloAudio.push(tempaudio)
        //res.json(arregloAudio);
       // res.json(audioannotationsDocs); //original
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
    
    PARTICIPANT.forEach((participant, index)=>{
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
    res.render('audioannotations/edit', { audioannotationid })
}

const deleteAudioannotaion = async (req, res) => {
  //console.log("Aqui no entro")
  const audioannotation_id = req.params.audioannotation_id
  try {
        let audioannotationsDocs = await Audioannotations.findById(
      audioannotation_id
    ).exec()
    var file = audioannotationsDocs.eaf
   // console.log(file);
    const result = await Audioannotations.deleteOne({
      _id: audioannotation_id,
    }).exec()
    //console.log(`deleteAudioannotation> Result: ${result}`);  
     console.log(`deleteAudioannotation> Result: ${result}`,JSON.stringify(result));
  } catch (error) {
    console.log("no borro en la bd",error)
    return res.status(404).json(error)
  }
  try {
    //console.log("Borrar este")
    //console.log(req.)

    //Borrado del archivo fisicamente
    const fs = require('fs')
    const path = 'server/public/eaf/' + file
    fs.unlinkSync(path)
    //res.redirect('/audioannotations')
    //console.error("despues del borrado fisico")
        return res.status(200).json({"file":"ok"})
  } catch (error) {
    //error de borrado
    console.error('error en el borrado fisico')
    console.error(error)
    return res.status(400).json(error)
  }
}

const vuetestAudioannotaion = async(req, res) => {
    const audioannotationid = req.params.audioannotation_id
    console.log("--------------Aqui--------------")
    console.log(audioannotationid)
    res.render('audioannotations/vuetest', { audioannotationid })
}

const color = (req, res)=>{
    res.render('audioannotations/color')
}

// ***************** API ********************
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
    api_updateAudioAnnot,
    color,
}