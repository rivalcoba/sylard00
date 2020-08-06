import jsonReader from '@helpers/jsonReader'
import path from 'path'

function normalizeString(str) {
  
  // 1. Delete accents and diacritics adn UpperCase
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
}

export default function (str) {
  if(!str) return null

  let inputString = normalizeString(str)
  let country = null
  let countries = jsonReader.readFileSync(
    path.join(__dirname, '..', 'assets', 'countries.json')
  )
  countries.forEach((element) => {
    let name_en_norm = normalizeString(element['name_en'])
    let name_es_norm = normalizeString(element['name_es'])
    if (name_en_norm == inputString || name_es_norm == inputString) {
      return (country = {
        'name_en': element['name_en'],
        'name_es': element['name_es'],
        'code': element['code'],
      })
    }
  })
  return country
}
