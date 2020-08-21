// Validation Library
import * as Yup from 'yup'
// Model
import Language from '@models/Glottolog'
import Location from '@models/Location'
// TEST SEBORRARA
import User from '@models/User'

// Validation Schema
const getValidtaionSchema = function (supportedLanguages, supportedLocalities) {
  const CollectionValidationSchema = Yup.object().shape({
    name: Yup.string().required('Se requiere ingresar un nombre'),
    description: Yup.string().required('Se requiere ingresar una descripcion'),
    languages: Yup.array().of(Yup.string().oneOf(supportedLanguages,'No se ha proporcionado un lenguaje valido'), 'Se requiere un Arreglo de Strings'),
    localities: Yup.array().of(Yup.string().oneOf(supportedLocalities,'No se han ingresado localidades validas'),'Se requiere un Arreglo de Strings'),
  })
  return CollectionValidationSchema
}

// name
// description
// languages
// localities
// license
export default async (req, res, next) => {
    // vvvvv TEST Usuario se borrara
    let userdoc = await User.findById('5f31d909d49e576715d3f881','_id').exec()
    let user = userdoc._id
    // ^^^^^ TEST Usuario se borrara

    // Get Supported Languages
    let languageDocuments = await Language.find({},'_id').limit(10).exec()
    let supportedLanguages = languageDocuments.map((langDoc)=>{
        return langDoc.id
    })

    // Get Supported localities
    let localitiesDocuments = await Location.find({},'_id').limit(10).exec()
    let supportedLocalities = localitiesDocuments.map((locDoc)=>{
        return locDoc.id
    })

    // Get Validation Schema
    const CollectionValidationSchema = getValidtaionSchema(supportedLanguages, supportedLocalities)

    // Get Params from req
    let { languages, localities} = req.body
    const { name, description, license } = req.body

    // Parse languages
    languages = languages.split('|')
    // parse localities
    localities = localities.split('|')
    // Form collection document
    let collection = {
        name,
        description,
        languages,
        localities,
        license,
        user
    }

    // Validate Collection
    try {
        collection = await CollectionValidationSchema.validate(collection,{abortEarly:false})
        // Get collections
        let languagesArr = await Language.find({"_id":{
            $in : languages
        }},'gid family_id parent_id name level latitude longitude iso639P3code child_family_count child_language_count child_dialect_count country_ids').exec()
        
        collection.languages = languagesArr.map((doc)=>{
            let obj = doc.toJSON()
            delete obj._id
            return obj
        })

        let localitiesArr = await Location.find({
            "_id": {
                $in : localities
            }
        },'Cve_Ent Nom_Ent Nom_Abr Cve_Mun Nom_Mun Cve_Loc Nom_Loc Lat_Decimal Lon_Decimal Altitud').exec()

        collection.localities = localitiesArr.map((doc)=>{
            let obj = doc.toJSON()
            delete obj._id
            return obj
        })

        req.body.collection = collection
        console.log("SIGUE")
        next()

    } catch (error) {
        console.log(`validator>collection> ${error}`)
        // >>> TEST REMOVER
        return res.status(400).json(error)
        // >>>>>>>>>>>>>>>>>>>
        req.flash('error_msg',`Formulario incorrecto: ${error.message}`)
        res.redirect('/collections/create')
    }
}
