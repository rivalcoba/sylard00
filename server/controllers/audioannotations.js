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

const index = async (req, res) => {
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

  console.log('Aqui')

  const audioannotationsDocs = await Audioannotations.find({
    user: req.user._id,
  })
    .populate('user')
    .populate('colection')
    .exec()

  let locality_found

  audioannotationsDocs.forEach((audioannotation, index) => {
    let loc_id = audioannotation.location
    audioannotation.colection.localities.forEach(location => {
      console.log(
        `>ln40> loc_id: ${loc_id} - ${location._id} - ${index} - ${location.Nom_Loc}`
      )
      if (String(loc_id) === String(location._id)) {
        console.log(
          `>>>>> ENCONTRADO: ln40> loc_id: ${loc_id} - ${location._id} - ${index} - ${location.Nom_Loc}`
        )
        console.log('Antes de asignar')
        console.log(location)
        audioannotationsDocs[index].location = location
        console.log('Asignado')
        console.log(audioannotationsDocs[index].location)
      }
    })
    let glotid = audioannotation.gid
    audioannotation.colection.languages.forEach(gid => {
      //console.log(`>ln40> loc_id: ${loc_id} - ${gid._id} - ${index} - ${gid.Nom_Loc}`);
      if (String(glotid) === String(gid._id)) {
        //console.log(`>>>>> ENCONTRADO: ln40> loc_id: ${loc_id} - ${gid._id} - ${index} - ${gid.Nom_Loc}`);
        //console.log("Antes de asignar")
        //console.log(gid)
        audioannotationsDocs[index].gid = gid
        //console.log("Asignado")
        //console.log(audioannotationsDocs[index].gid)
      }
    })
  })

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

const filtrarAudioannotation=async (req,res)=>{
  console.log("Aqui")
  // Aqui me quede le quite el await
  try {
    const audioannotationsDocs =await  Audioannotations.find({user: req.user._id}).populate('user').populate('colection').exec()
    res.json(audioannotationsDocs);
  } catch (error) {
      return res.status(400).json({
          mensaje: 'Ocurrio un error',
          error
        })
  }
}
  
const createAudioannotation = (req, res) => {
  // Getting languages
  res.render('audioannotations/create')
}

const addAudioannotation = async (req, res) => {
  let {
    eaf, // ok
    mp3_url, // ok
    duration, //ok
    title, // ok
    description, // ok
    colection : collection_id, // ok
    gid, // ok
    location, // ok
    genre, // ok
    PARTICIPANT,
    Visible,
    value,
    color,
    LINGUISTIC_TYPE_REF,
    TIER_ID
  } = req.body

  let tiers = []
  let numberOfTiersPerParticipant = Visible.length / PARTICIPANT.length 
  PARTICIPANT.forEach((participant, indexp) => {
    for (let index = 0; index < numberOfTiersPerParticipant; index++) {
      // Se calcula indice absoluto
      let absIndex = index + indexp * numberOfTiersPerParticipant
      console.log(`absIndex: ${absIndex} - `)
      tiers.push({
        PARTICIPANT: participant,
        Visible: Visible[absIndex],
        value: value[absIndex],
        color: color[absIndex],
        LINGUISTIC_TYPE_REF: LINGUISTIC_TYPE_REF[absIndex],
        TIER_ID: TIER_ID[absIndex],
      })
    }
  });

  // Building audioannotation
  let genreDoc = await Genre.findById(genre).exec()
  
  let audioannotation = {
    eaf, // ok
    title, // ok
    description, //
    genre: genreDoc, // ok - ARMAR
    duration,// ok
    mp3_url, // ok
    location, // ok
    collection_id, // ok
    gid, // ok
    user: req.user._id,
    TIER: tiers,
  }

  try {
    const audioannotationDoc = await Audioannotations.create(audioannotation);
    console.log("> Audioanotations Created: " + JSON.stringify(audioannotationDoc))
    return res.status(200).json(audioannotationDoc)
    // res.redirect('/audioannotations') //TODO: Descomentar tan pronto toño acomple esto con index de audioanot
  } catch (error) {
    return res.status(200).json({error, from: "controller/audioannotations/addAudioannotation"})
  }
}

//uploadfile
//aqui me quede

const uploadfileAudioannotation = async (req, res, next) => {
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
    let genreArray = genreDocs.map(genre=>{
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
const editAudioannotation = async (req, res) => {
  res.render('audioannotations/edit', {})
}

const deleteAudioannotaion = async (req, res) => {
  const audioannotation_id = req.params.audioannotation_id
  try {
    //console.log("Borrar este")
    //console.log(req.)
    let audioannotationsDocs = await Audioannotations.findById(
      audioannotation_id
    ).exec()
    const file = audioannotationsDocs.eaf
    //console.log(file);
    const result = await Audioannotations.deleteOne({
      _id: audioannotation_id,
    }).exec()
    console.log(`deleteAudioannotation> Result: ${result}`)
    //Borrado del archivo fisicamente
    const fs = require('fs')
    const path = 'server/public/eaf/' + file
    fs.unlinkSync(path)
    res.redirect('/audioannotations')
  } catch (error) {
    //error de borrado
    console.error(error)
    return res.status(400).json(error)
  }
}

const vuetestAudioannotaion = async (req, res) => {
  res.render('audioannotations/vuetest', {})
}

export default {
  index,
  createAudioannotation,
  editAudioannotation,
  deleteAudioannotaion,
  addAudioannotation,
  uploadfileAudioannotation,
  vuetestAudioannotaion,
  filtrarAudioannotation
}
