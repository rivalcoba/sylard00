// Import client model functions
import languageHelper from '@chelpers/models/languages'
import Swal from 'sweetalert2'

let languageBox = document.getElementById('language')
let langlist = document.getElementById('langlist')
let languageGroupBox = document.getElementById('langGroup')
let groupLanglist = document.getElementById('groupLanglist')
let addBtn = document.getElementById('addBtn')


function is_valid_datalist_value(idDataList, inputValue) {

  // console.log('#' + idDataList + " option[value='" + inputValue + "']")
  var option = document.querySelector(`#${idDataList} option[value="${inputValue}"]`)
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

  let selectedLanguageId = document.querySelector(`option[value="${languageBox.value}"]`).id
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
    deleteLangRow(language)
  }
  // checK: https://stackoverflow.com/questions/24775725/loop-through-childnodes
  // Ref: https://stackoverflow.com/questions/48755661/remove-item-from-datalist-dynamically

  tr.innerHTML = `
            <input 
              type="text" 
              style="display:none;" 
              name="${language.gid}" 
              value="${language._id}|${groupLanguage._id}">
            <td>${language.gid}</td>
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
  
  // console.log('#' + dataListId + " option[value='" + value + "']")
  let option = document.querySelector(
    `#${dataListId} option[value="${value}"]`
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

  // Reset language input values
  languageBox.value = ""
  languageGroupBox.value = ""
  languageGroupBox.disabled = true
  addBtn.style.display ="none"
  
  // Delete selected language from the datalist
  var options = Array.from(langlist.children)
  options.forEach(option => {
    if(option.id == lang._id){
      option.remove()
    }
  });
  
  addLanguageRow(lang, groupLanguage)
}

function deleteLangRow(language) {
  let id = `${language.gid}`
  var tr = document.getElementById(id)
  tr.remove()
  // add language to the data list
  let option = document.createElement('option')
  option.setAttribute('id',`${language._id}`)
  option.setAttribute('data-id',`${language._id}`)
  option.setAttribute('data-name',`${language.name}`)
  option.setAttribute('value',`${language.name} | ${language.gid}`)
  langlist.appendChild(option)
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