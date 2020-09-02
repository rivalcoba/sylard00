// Validation Library
import * as Yup from 'yup'
// Model
import Language from '@models/Glottolog'
import Location from '@models/Location'

// Validation Schema
const CollectionValidationSchema = Yup.object().shape({
  name: Yup.string().required('Se requiere ingresar un nombre'),
  description: Yup.string().required('Se requiere ingresar una descripcion'),
  languages: Yup.array().of(Yup.string(), 'Se requiere un Arreglo de Strings'),
  localities: Yup.array().of(Yup.string(), 'Se requiere un Arreglo de Strings'),
  license: Yup.string().required('Se requiere ingresar una licencia').oneOf(
    ['CC-BY-NC-SA', 'CC BY-SA'],
    'Debe proporcionarse un tipo de licencia valida: CC-BY-NC-SA o CC BY-SA'
  ),
})

export default async (req, res, next) => {

  const { 
    name, 
    description, 
    languages, 
    localities, 
    license } = req.body
  
  try {
    // Form collection document
    let collection = {
      name,
      description,
      languages,
      localities : typeof(localities) == 'string'?[localities]:localities,
      license,
    }

    // Se validan datos del formulario
    await CollectionValidationSchema.validate(collection, { abortEarly: false })
    
    // Se Buscan los lenguajes
    // Get collections
    let languagesDocs = await Language.find(
      {
        '_id': {
          $in: languages,
        },
      },
      'gid family_id parent_id name level latitude longitude iso639P3code child_family_count child_language_count child_dialect_count country_ids'
    ).exec()

    if (languagesDocs.length == 0) {
      throw new Yup.ValidationError(
        `Lenguajes incorrectos`,
        req.body.languages,
        'No se proporcionaron lenguajes correctos'
      )
    }
    
    // Populate the language array
    collection.languages = languages.map((lang_id) => {
      let obj
      languagesDocs.forEach((doc) => {
        if (doc._id == lang_id) {
          obj = doc
          delete obj._id
        }
      })
      return obj
    })

    // Se puede refactorar y hacer desde el modelo
    // collection.languages = languagesDocs.map((doc) => {
    //   let obj = doc.toJSON()
    //   delete obj._id
    //   return obj
    // })

    //Building languages array
    let langArray = []
    
    for(let i = 0; i < collection.languages.length; i+=2){
      let obj = {}
      obj['language'] = collection.languages[i] 
      obj['LanguageGroup'] = collection.languages[i+1]
      langArray.push(obj)
    }

    collection.languages = langArray

    let localitiesDocs = await Location.find(
      {
        '_id': {
          $in: localities,
        },
      },
      'Cve_Ent Nom_Ent Nom_Abr Cve_Mun Nom_Mun Cve_Loc Nom_Loc Lat_Decimal Lon_Decimal Altitud'
    ).exec()

    if (localitiesDocs.length == 0) {
      throw new Yup.ValidationError(
        `Localidades Incorrectas`,
        req.body.localities,
        'No se proporcionaron localidades correctas'
      )
    }

    // Se puede refactorar y hacer desde el modelo
    collection.localities = localitiesDocs.map((doc) => {
      let obj = doc.toJSON()
      delete obj._id
      return obj
    })

    req.body.collection = collection
    
    next()
  } catch (error) {
    console.log(`validator>collection> ${error}`)
    req.flash('error_msg', `Formulario incorrecto: ${error.message}`)
    res.render('index/dashboard')
  }
}
