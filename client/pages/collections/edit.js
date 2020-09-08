import languageHelper from '@chelpers/models/languages'
//import locationsHelper from '@chelpers/models/locations'

// Getting Ui Controls references
const languageBox = document.getElementById('language')
const languageGroupBox = document.getElementById('langGroup')

function deleteTableRow(element) {
  let id = `${element._id}`
  let tr = document.getElementById(id)
  tr.remove()
}

const clearDataList = (dataList) => {
  // Remove all the previous results
  while (dataList.firstChild) {
    dataList.removeChild(dataList.firstChild)
  }
}

const fillLangList = async (app) => {
  try {
    // Feteching languages
    let languages = await languageHelper.getLanguageList()
    if(languages.length == 0){
      return alert("No se encontraron lenguas")
    }
    if(languages && languages.length > 0 && app.languages.length == 0){
      app.languages = languages
      languageBox.disabled = false
      return
    }
    
  } catch (error) {
    alert(error)
  }  
}
const fillLangGroupList = async ()=>{
  
}

export default {
  fillLangList,
  fillLangGroupList
}
