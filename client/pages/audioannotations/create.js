import CollectionModel from '@chelpers/models/collections'

// Auxiliary Functions
const disableElementById = (elementId)=>{
  const element = document.getElementById(elementId)
  element.disabled = true
}
const enableElementById = (elementId)=>{
  const element = document.getElementById(elementId)
  element.disabled = false
}

const cleanSelectElementByID = (elementId)=>{
  const element = document.getElementById(elementId)
  while(element.firstChild){
    element.removeChild(element.firstChild)
  }
}

// Fill asynchronously Glottolog Select at Front End
const fillGlottologSelect = async ()=>{
  // Disable GlottologSelect and localitiesSelect
  disableElementById('glottologSelect')
  disableElementById('localitiesSelect')

  // Getting Collections Id
  const colectionSelect = document.getElementById('colectionSelect')
  const collectionID = colectionSelect.value;

  // Remove previous results
  cleanSelectElementByID('glottologSelect')
  cleanSelectElementByID('localitiesSelect')

  let collection = await CollectionModel.getCollectionById(collectionID)

  // Fill glottologSelect and localitiesSelect
  const glottologSelect = document.getElementById('glottologSelect')
  collection.languages.forEach(languagesMates => {
    const option = document.createElement('option')
    glottologSelect.appendChild(option)
    option.value = `${languagesMates._id}`
    option.innerHTML = `${languagesMates.language.name} - ${languagesMates.LanguageGroup.name}`
    enableElementById('glottologSelect')
    // TODO: CONTINUAR DESDE AQUI

  });
}

export default {
  fillGlottologSelect
}