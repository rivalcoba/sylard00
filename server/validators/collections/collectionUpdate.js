// Import Validator
import * as Yup from 'yup'
// Model
import Language from '@models/Glottolog'
import Location from '@models/Location'

const CollectionValidationSchema = Yup.object().shape({
  name: Yup.string().required('Se requiere ingresar un nombre'),
  description: Yup.string().required('Se requiere ingresar una descripcion'),
  languages: Yup.array().of(Yup.string(), 'Se requiere un Arreglo de Strings'),
  localities: Yup.array().of(Yup.string(), 'Se requiere un Arreglo de Strings'),
  license: Yup.string()
    .required('Se requiere ingresar una licencia')
    .oneOf(
      ['CC-BY-NC-SA', 'CC BY-SA'],
      'Debe proporcionarse un tipo de licencia valida: CC-BY-NC-SA o CC BY-SA'
    ),
  user: Yup.string().required('Se requiere porporcionar un usuario valido'),
})

export default async (req, res, next) => {
    
}
