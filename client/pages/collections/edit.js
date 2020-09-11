import languageModel from '@chelpers/models/languages'
import locationsModel from '@chelpers/models/locations'

// Getting Ui Controls references
const languageBox = document.getElementById('language')
const entityBox = document.getElementById('entity')

const fillLangList = async (app) => {
  try {    
    // Fetching languages
    let languages = await languageModel.getLanguageList()
    if(languages.length == 0){
      return alert("No se encontraron lenguas")
    }
    app.languages = languages
    document.getElementById('language').disabled = false
    
  } catch (error) {
    alert(`fillLangList> ${error}`)
  }  
}

const fillLangGroupList = async (app)=>{
  let selectedLanguage = languageBox.value
  let gid = selectedLanguage.split(' | ')[1]

  let selectedOk = false
  for (let index = 0; index < app.languages.length; index++) {
    let langList = `${app.languages[index].name} | ${app.languages[index].gid}`
    if( langList == selectedLanguage){
      selectedOk = true
      break
    }    
  }
  if(selectedOk){
    let langTree = await languageModel.getParentTreeByGid(gid)
    app.languagesGroup = langTree    
  }else{
    alert("Error: Debe seleccionar una lengua del menu")
    app.languagesGroup = []
  }
}

const fillEntitiesList = async(app)=>{
  try {
    let entities = await locationsModel.getEntities()
    app.entitiesList = entities
  } catch (error) {
    alert( `fillEntitiesList> ${error}`)
  }
}

const fillMunicipalitiesList = async(app)=>{
  let selectedEntity = entityBox.value
  
  if(app.entitiesList.indexOf(selectedEntity) >= 0){
    // Se procede a buscar los municipios de la entidad seleccionada

    let municipalities = await locationsModel.getMunicipalitiesByEntity(selectedEntity)
    if(selectedEntity){
      app.municipalitiesList = municipalities
    }else{
      alert("fillMunicipalitiesList> Error: No se encontraron municipios")
    }
  }else{
    alert("fillMunicipalitiesList> Error: Debe seleccionar una entidad del menu")
    app.municipalitiesList = []
  }
}

const fillLocalitiesList = async(app)=>{

}

export default {
  fillLangList,
  fillLangGroupList,
  fillEntitiesList,
  fillMunicipalitiesList,
  fillLocalitiesList
}
