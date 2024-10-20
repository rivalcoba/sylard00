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

  // Fill glottologSelect 
  const glottologSelect = document.getElementById('glottologSelect')
  collection.languages.forEach(languagesMates => {
    const option = document.createElement('option')
    glottologSelect.appendChild(option)
    option.value = `${languagesMates._id}`
    option.innerHTML = `${languagesMates.language.name} - ${languagesMates.LanguageGroup.name}`
  });
  enableElementById('glottologSelect')
  // Fill localitiesSelect
  const localitiesSelect = document.getElementById('localitiesSelect')
  collection.localities.forEach(locality => {
    const option = document.createElement('option')
    localitiesSelect.appendChild(option)
    option.value = `${locality._id}`
    option.innerHTML = `${locality.Nom_Loc} - ${locality.Nom_Mun} - ${locality.Nom_Ent}`
  });
  enableElementById('localitiesSelect')
}

const loadMp3 = ()=>{
  // url test: https://www.kozco.com/tech/piano2.wav
  let mp3InputText = document.getElementById('mp3_url')

  // Loading Audio
  let audio = new Audio(mp3InputText.value);
  audio.onerror = function(){
    console.log("Audio not loaded properly")
  }
  audio.onloadeddata = function () {
    // const durationBoc = document.getElementById('duracion')
    // The duration is converted to minutes
    // durationBoc.value = audio.duration / 60
    const minute = document.getElementById('duracion');
    const sec = Math.floor(audio.duration % 60)
    minute.value = Math.floor(audio.duration / 60) + ':' + sec
    
    
    
  }
}

// No se usa
function processForm(e){
  e.preventDefault();
  // Form actions
  return false
}

// No se usa
function interceptSubmit(){
  var createCollectionform = document.getElementById('form2')
  createCollectionform.addEventListener("submit", processForm);
}

export default {
  fillGlottologSelect,
  interceptSubmit,
  loadMp3,
}