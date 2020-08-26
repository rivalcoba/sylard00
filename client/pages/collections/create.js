// Import client model functions
import languageHelper from '@chelpers/models/languages'

async function enableLangGroup() {
  // get selected language
  let selectedLanguage = document.getElementById('language')
  if(selectedLanguage.value == ""){
    alert("Debe selecionar un lenguaje de la lista")
    return
  }
  let selectedLanguageId = document.querySelector(`option[value='${selectedLanguage.value}']`).id
  
  // Loading ParetnTree
  let parents = await languageHelper.getParentTree(selectedLanguageId)
  
  parents.forEach(planguage => {
    console.log(planguage.name)
  });
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
    deleteLangRow
}