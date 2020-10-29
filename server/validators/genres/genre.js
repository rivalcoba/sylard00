// Importing Validation Tool
import * as Yup from 'yup'

// Imporntado Modelos
import Genre from "@models/Genre"

const MAX_GENRE_NAME_LENGTH = 10
const MAX_GENRE_NAME_DESCRIPTION = 300

// Create Validation Schema
const GenreValidationSchema = Yup.object().shape({
    name: Yup.string().max(MAX_GENRE_NAME_LENGTH,'Name length should not be bigger than 10 characters').required('You must enter a name'),
    description: Yup.string().max(MAX_GENRE_NAME_DESCRIPTION,'Description length should not be bigger than 300 characters'),
})

// Auxiliary Function
// const capitalize = (str)=>{
//     if(typeof str !== 'string') return ''
//     return str.charAt(0).toUpperCase() + str.slice(1)
// }


const genrePost = async (req, res, next)=>{
    let { name, description } = req.body

    // Normalize genreName
    name = name.toUpperCase();
    // console.log(name)

    let genre = {
        name,
        description,
    }

    // Validating Schema
    try {
        await GenreValidationSchema.validate(genre, { abortEarly: false })
    } catch (error) {
        console.trace(`Errores: ${error}`)
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
          console.trace(`LN50>This Genre aready exist in the DB`)
          // 409 (Conflict) if resource already exists
          res.status(409).json({error: "This Genre aready exist in the Data Base"})
        }
    } catch (error) {
        console.trace(`LN50>Errores: ${error}`)
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
    } catch(error) {
        error.reason = `Document with id ${genreId} not found`;
        return res.status(404).json(error)
    }

    // Validating update
    let { name, description } = req.body
    // Normalizing
    name = name.toUpperCase();

    let genre = {
        name,
        description,
    }

    // Validating Schema
    try {
        await GenreValidationSchema.validate(genre, { abortEarly: false })
    } catch (error) {
        console.trace(`Errores: ${error}`)
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

export default {
    genrePost,
    genrePut
}
