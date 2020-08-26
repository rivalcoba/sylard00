// Import client model functions
import languageHelper from '@chelpers/models/languages'
import Swal from 'sweetalert2'

let languageBox = document.getElementById('language')
let languageGroupBox = document.getElementById('langGroup')
let langlist = document.getElementById('langlist')
let groupLanglist = document.getElementById('groupLanglist')


function is_valid_datalist_value(idDataList, inputValue) {
  var option = document.querySelector(
    '#' + idDataList + " option[value='" + inputValue + "']"
  )
  if (option != null) {
    return option.value.length > 0
  }
  return false
}

const clearDataList = (dataList) => {
  // Remove all the previous results
  while (dataList.firstChild) {
    dataList.removeChild(dataList.firstChild)
  }
}

const disableLanguageGroupBox = ()=>{
  languageGroupBox.value = ""
  languageGroupBox.disabled = true
  clearDataList(groupLanglist)
}

async function enableLangGroup() {
  let selectedLanguage = languageBox.value
  // Checking if is empty
  if(selectedLanguage == "" || 
  !is_valid_datalist_value(langlist.id, selectedLanguage)){
    languageBox.value = ""
    return Swal.fire(
      'SYLARD!',
      'Debe seleccionar una opción de la lista',
      'info'
    )
  }

  let selectedLanguageId = document.querySelector(`option[value='${languageBox.value}']`).id
  let parents = []
  try {
    // Loading ParetnTree
    parents = await languageHelper.getParentTree(selectedLanguageId)
    if(!parents){
      return Swal.fire(
        'SYLARD!',
        'El servidor no respondio',
        'info'
      )
    } else if( parents.length == 0){
      return Swal.fire(
        'SYLARD!',
        'No se encontraron ancenstros de la lengua',
        'info'
      )
    }  
  } catch (error) {
    return Swal.fire(
      'SYLARD!',
      'Get Parent Tree: No respondio el servidor intente mas tarde',
      'error'
    )
  }
  // 
  parents.forEach(planguage => {
    let option = document.createElement('option')
    groupLanglist.appendChild(option)
    option.value = `${planguage.name} | ${planguage.gid}`
  });
  languageGroupBox.disabled = false
}

function addLanguageRow(language, groupLanguage) {
  let table = document.getElementById('langTable')
  let tr = document.createElement('tr')
  tr.setAttribute('id', `${language.gid}`)
  tr.onclick = function () {
    deleteLangRow(`${language.gid}`)
  }
  tr.innerHTML = `<td>${language.gid}</td>
            <td>${language.name}</td>
            <td>${groupLanguage.gid}</td>
            <td>${groupLanguage.name}</td>
            <td>
              <i class="fa fa-trash fa-2x" style="color: rgb(241, 63, 32);cursor: pointer;"></i>
            </td>`
  table.appendChild(tr)
}

function addLanguage() {
  let lang = {
    _id: '12u7drr4df',
    gid: 'Yolo1241',
    name: 'Yoloxóchitl Mixtec',
  }
  let groupLanguage = {
    _id: '2349ixmmt58j',
    gid: 'Amuz1253',
    name: 'Amuzgo Mixtecan',
  }
  addLanguageRow(lang, groupLanguage)
}

function deleteLangRow(id) {
  var tr = document.getElementById(id)
  tr.remove()
}
//document.getElementsByTagName("tr")[2].remove();
export default{
    enableLangGroup,
    addLanguageRow,
    addLanguage,
    deleteLangRow,
    disableLanguageGroupBox
}