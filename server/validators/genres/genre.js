// Importing Validation Tool
import * as Yup from 'yup'

// Imporntado Modelos
import Genre from "@models/Genre"
import Location from "@models/Location"
import winston from '@config/winston'

const MAX_GENRE_NAME_LENGTH = 10
const MAX_GENRE_NAME_DESCRIPTION = 300

// Create Validation Schema
const GenreValidationSchema = Yup.object().shape({
    name: Yup.string().max(MAX_GENRE_NAME_LENGTH,'Name length should not be bigger than 10 characters').required('You must enter a name'),
    description: Yup.string().max(MAX_GENRE_NAME_DESCRIPTION,'Description length should not be bigger than 300 characters'),
})
const LocationValidationSchema = Yup.object().shape({
    Mapa:Yup.string(),
  Cve_Ent:  Yup.string(),
  Nom_Ent:  Yup.string(),
  Nom_Abr:  Yup.string(),
  Cve_Mun:  Yup.string(),
  Nom_Mun:  Yup.string(),
  Cve_Loc:  Yup.string(),
  Nom_Loc:  Yup.string(),
  Ámbito: Yup.string(),
  Latitud:  Yup.string(),
  Longitud:  Yup.string(),
  Lat_Decimal:  Yup.number(),
  Lon_Decimal:  Yup.number(),
  Altitud: Yup.number(),
  Cve_Carta:  Yup.string(),
  Pob_Total:  Yup.number(),
  Pob_Masculina:  Yup.number(),
  Pob_Femenina:  Yup.number(),
  'Total De Viviendas Habitadas':  Yup.number(),
})

// Auxiliary Function
// const capitalize = (str)=>{
//     if(typeof str !== 'string') return ''
//     return str.charAt(0).toUpperCase() + str.slice(1)
// }


const genrePost = async (req, res, next)=>{
    let { name, description } = req.body

    // Normalize genreName
    //name = name.toUpperCase();
    // console.log(name)

    let genre = {
        name,
        description,
    }

    // Validating Schema
    try {
        await GenreValidationSchema.validate(genre, { abortEarly: false })
    } catch (error) {
        winston.error(`Errores: ${error}`);
        res.status(400).json(error)
    } 

    // Checking Duplicates
    let genreDocument;
    try {
        genreDocument = await Genre.findOne({name: genre.name})
        // If genre was not found, its ok, there is no duplicated content...
        if (!genreDocument) {
          // Loading
          req.genre = genre
          next()
        } else {  
            winston.info(` LN50>This Genre aready exist in the DB `);
          // 409 (Conflict) if resource already exists
          res.status(409).json({error: "This Genre aready exist in the Data Base"})
        }
    } catch (error) {  
        winston.error(`LN50>Errores: ${error}`);
        res.status(400).json(error)
    }
}

const genrePut = async (req, res, next)=>{
    // Find doc by id
    const genreId = req.params.genre_id
    let genreDoc = {};
    
    // Check document existence
    try {   
        genreDoc =  await Genre.findById(genreId)
        console.log("id: "+genreId+" Encontrado")
    } catch(error) {
        winston.error(`Document with id ${genreId} not found`);
        return res.status(404).json(error)
    }  

    // Validating update
    let { name, description } = req.body
    // Normalizing
    // name = name.toUpperCase();

    let genre = {
        name,
        description,
    }

    // Validating Schema
    try {
        await GenreValidationSchema.validate(genre, { abortEarly: false })
        /*
        console.log("validando..........");
        console.log(genre);
        console.log("--------------")*/
    } catch (error) {  
        winston.error(`Errores: ${error}`);
        res.status(400).json(error)
    }
    // Storing Document in req
    // Updating
    genreDoc.name = genre.name
    genreDoc.description = genre.description
    
    req.genreDoc = genreDoc
    // Next middleware
    next() 
}

const locationPut = async (req, res, next)=>{
    // Find doc by id
    const locId = req.params.loc_id
    let locDoc = {};
    
    // Check document existence
    try {
        locDoc =  await Location.findById(locId)
        console.log("id: "+locId+" Encontrado")
    } catch(error) { 
        winston.error(`Document with id ${locId} not found`);
        return res.status(404).json(error)
    }
    let { 
    
        Mapa,
        Cve_Ent,
        Nom_Ent,
        Nom_Abr,
        Cve_Mun,
        Nom_Mun,
        Cve_Loc ,
        Nom_Loc,
        Latitud,
        Longitud,
        Lat_Decimal,
        Lon_Decimal,
        Altitud,
        Cve_Carta,
        Pob_Total,
        Pob_Masculina,
        Pob_Femenina,
        'Total De Viviendas Habitadas': Total_De_Viviendas_Habitadas,
      } = req.body;
        let location = {
    
            Mapa,
            Cve_Ent,
            Nom_Ent,
            Nom_Abr,
            Cve_Mun,
            Nom_Mun,
            Cve_Loc ,
            Nom_Loc,
            Ámbito:"no data",
            Latitud,
            Longitud,
            Lat_Decimal,
            Lon_Decimal,
            Altitud,
            Cve_Carta,
            Pob_Total,
            Pob_Masculina,
            Pob_Femenina,
            'Total De Viviendas Habitadas' : Total_De_Viviendas_Habitadas
          };
          try {
            await LocationValidationSchema.validate(location, { abortEarly: false })
      /*      console.log("validando..........");
            console.log(location);
            console.log("--------------")
*/
        } catch (error) {  
            winston.error(`Errores: ${error}`);
            res.status(400).json(error)
        }
// Storing Document in req
    // Updating
    locDoc.Mapa=location.Mapa
    locDoc.Cve_Ent=location.Cve_Ent
    locDoc.Nom_Ent=location.Nom_Ent
    locDoc.Nom_Abr=location.Nom_Abr
    locDoc.Cve_Mun=location.Cve_Mun
    locDoc.Nom_Mun=location.Nom_Mun
    locDoc.Cve_Loc=location.Cve_Loc
    locDoc.Nom_Loc=location.Nom_Loc
    locDoc.Ámbito=location.Ámbito
    locDoc.Latitud=location.Latitud
    locDoc.Longitud=location.Longitud
    locDoc.Lat_Decimal=location.Lat_Decimal
    locDoc.Lon_Decimal=location.Lon_Decimal
    locDoc.Altitud=location.Altitud
    locDoc.Cve_Carta=location.Cve_Carta
    locDoc.Pob_Total=location.Pob_Total
    locDoc.Pob_Masculina=location.Pob_Masculina
    locDoc.Pob_Femenina=location.Pob_Femenina
    
    req.locDoc = locDoc
    // Next middleware
    next() 
}

export default {
    genrePost,
    genrePut,
    locationPut
}
