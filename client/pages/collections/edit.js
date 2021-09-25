import languageModel from '@chelpers/models/languages'
import locationsModel from '@chelpers/models/locations'
import Swal from 'sweetalert2'

// Getting Ui Controls references
const languageBox = document.getElementById('language')

const entityBox = document.getElementById('entity')
const municipalityBox = document.getElementById('municipality')
const localityBox = document.getElementById('locality')

const fillLangList = async app => {
  try {
    // Fetching languages
    let languages = await languageModel.getLanguageList()
    if (languages.length == 0) {
      return alert('No se encontraron lenguas')
    }
    console.log(`client/pages/collections/edit.js: app.languages`)
    app.languages = languages
    console.log(`client/pages/collections/edit.js: document.getElementById('language')
`)
    document.getElementById('language').disabled = false
  } catch (error) {
    alert(`fillLangList> ${error}`)
  }
}

const fillLangGroupList = async app => {
  let selectedLanguage = languageBox.value
  let gid = selectedLanguage.split(' | ')[1]

  let selectedOk = false
  for (let index = 0; index < app.languages.length; index++) {
    let langList = `${app.languages[index].name} | ${app.languages[index].gid}`
    if (langList == selectedLanguage) {
      selectedOk = true
      break
    }
  }
  if (selectedOk) {
    let langTree = await languageModel.getParentTreeByGid(gid)
    app.languagesGroup = langTree
  } else {
    alert('Error: Debe seleccionar una lengua del menu')
    app.languagesGroup = []
  }
}

const fillEntitiesList = async app => {
  try {
    let entities = await locationsModel.getEntities()
    app.entitiesList = entities
  } catch (error) {
    alert(`fillEntitiesList> ${error}`)
  }
}

const fillMunicipalitiesList = async app => {
  let selectedEntity = entityBox.value

  if (app.entitiesList.indexOf(selectedEntity) >= 0) {
    // Se procede a buscar los municipios de la entidad seleccionada
    let municipalities = await locationsModel.getMunicipalitiesByEntity(
      selectedEntity
    )

    if (municipalities) {
      app.municipalitiesList = municipalities
    } else {
      alert('fillMunicipalitiesList> Error: No se encontraron municipios')
      app.municipalitiesList = []
      app.localitiesList = []
      entityBox.value = ''
      municipalityBox.value = ''
      localityBox.value = ''
    }
  } else {
    alert(
      'fillMunicipalitiesList> Error: Debe seleccionar una entidad del menu'
    )
    app.municipalitiesList = []
    app.localitiesList = []
    entityBox.value = ''
    municipalityBox.value = ''
    localityBox.value = ''
  }
}

const fillLocalitiesList = async app => {
  // Todo falta esta
  let selectedEntity = entityBox.value
  let selectedMunicipality = municipalityBox.value
  //  is valid Selected Municipality
  if (app.municipalitiesList.indexOf(selectedMunicipality) >= 0) {
    // Get the list of locations based on entity and municipality
    let localities = await locationsModel.getLocalities(
      selectedEntity,
      selectedMunicipality
    )

    if (localities) {
      app.localitiesList = localities
    } else {
      alert('fillLocalitiesList> Error: No se encontraron Localidades')
      app.localitiesList = []
      municipalityBox.value = ''
      localityBox.value = ''
    }
  } else {
    alert(
      'fillLocalitiesList> Error: Debe seleccionar un Municipio valido de la lista'
    )
    app.localitiesList = []
    municipalityBox.value = ''
    localityBox.value = ''
  }
}

const getLocality = async (ent, mun, loc) => {
  try {
    let location = await locationsModel.getLocality(ent, mun, loc)

    if (!location) {
      Swal.fire('Error!', 'El servidor esta ocupado! intente mas tarde', 'info')
      return null
    }

    return location
  } catch (error) {
    Swal.fire('Error!', error.message, 'info')
    return null
  }
}

export default {
  fillLangList,
  fillLangGroupList,
  fillEntitiesList,
  fillMunicipalitiesList,
  fillLocalitiesList,
  getLocality,
}
