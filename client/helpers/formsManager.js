import flashLib from '@chelpers/flashLib'

// Es usado en register.hbs para
// agregar lenguas
function clearLastSelection() {
  let selectedLanguages = document.getElementById('spokenLanguages').value
  let indices = []
  // Se obtienen los indices de todos los separadores
  let idx = selectedLanguages.indexOf(',')
  while (idx != -1) {
    indices.push(idx)
    idx = selectedLanguages.indexOf(',', idx + 1)
  }
  // Check if is only one element selected
  if (indices.length == 0) {
    document.getElementById('spokenLanguages').value = ''
  } else {
    document.getElementById('spokenLanguages').value = selectedLanguages.slice(
      0,
      indices[indices.length - 1]
    )
  }
  flashLib.showFlashMesage('success', `Se ha removido con éxito`)
}
function addSelection() {
  // Getting some references
  let langSearchBox = document.getElementById('langSearch')
  let selectedLanguagesBox = document.getElementById('spokenLanguages')

  // Getting values
  let language = langSearchBox.value
  langSearchBox.value = ''

  // Extracting the language name
  language = language.split(' | ')[0]
  
  // Check if added prevously
  if (selectedLanguagesBox.value.indexOf(language) >= 0) {
    return flashLib.showFlashMesage('error', `Lenguaje ya seleccionado`)
  }

  // Adding the separator
  let separator = ','

  if (selectedLanguagesBox.value.length == 0) separator = ''

  selectedLanguagesBox.value = selectedLanguagesBox.value.concat(
    separator,
    language
  )
  flashLib.showFlashMesage('success', `Se ha agregado ${language} con éxito`)
}
export default {
  addSelection,
  clearLastSelection,
}
