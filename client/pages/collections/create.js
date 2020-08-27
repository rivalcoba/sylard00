// Import client model functions
import languageHelper from '@chelpers/models/languages'
import Swal from 'sweetalert2'

let languageBox = document.getElementById('language')
let langlist = document.getElementById('langlist')
let languageGroupBox = document.getElementById('langGroup')
let groupLanglist = document.getElementById('groupLanglist')
let addBtn = document.getElementById('addBtn')


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
    option.setAttribute('data-id',`${planguage._id}`)
    option.setAttribute('data-name',`${planguage.name}`)
  });
  languageGroupBox.disabled = false
}

const enableAddButton = function(){
  addBtn.style.display = 'inline'
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

const getLangData = (inputBox, dataList)=>{
  let value = inputBox.value
  let dataListId = dataList.id
  
  let option = document.querySelector(
    '#' + dataListId + " option[value='" + value + "']"
  )
  
  return {
    _id: option.dataset.id,
    gid: value.split(' | ')[1],
    name: option.dataset.name,
  }
}

function addLanguage() {
  let selectedLangGroup = languageGroupBox.value
  // Check if langGroupBox has a correct option
  if(
    selectedLangGroup == "" || 
    !is_valid_datalist_value(groupLanglist.id,selectedLangGroup)){
      languageGroupBox.value = ""
      return Swal.fire(
        'SYLARD!',
        'Debe seleccionar una opción de la lista',
        'info'
      )
  }

  let lang = getLangData(languageBox,langlist)

  let groupLanguage = getLangData(languageGroupBox,groupLanglist)
  
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
    disableLanguageGroupBox,
    enableAddButton
}