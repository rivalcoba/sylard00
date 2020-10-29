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
    console.log(name)

    let genere = {
        name,
        description,
    }

    // Validating Schema
    try {
        await GenreValidationSchema.validate(genere, { abortEarly: false })
    } catch (error) {
        console.trace(`Errores: ${error}`)
        res.status(400).json(error)
    }

    // Checking Duplicates
    let genereDocument;
    try {
        genereDocument = await Genre.findOne({name: genere.name})
        // If genre was not found, its ok, there is no duplicated content...
        if (!genereDocument) {
          // Loading
          req.genere = genere
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



export default {
    genrePost
}
