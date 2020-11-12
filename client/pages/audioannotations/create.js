import CollectionModel from '@chelpers/models/collections'

// Auxiliary Functions
const disableElementById = (elementId)=>{
  const element = document.getElementById(elementId)
  element.disabled = true
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

  // Getting Collection Data
  console.log(`Collection: ${JSON.stringify(collection)}`);

  // TODO: CONTINUAR DESDE AQUI
  // Fill glottologSelect and localitiesSelect
}

export default {
  fillGlottologSelect
}