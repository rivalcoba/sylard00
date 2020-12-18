// Import client model functions
import languageHelper from '@chelpers/models/languages'
import locationsHelper from '@chelpers/models/locations'

import Swal from 'sweetalert2'

// Languages UI
let languageBox = document.getElementById('language')
let langlist = document.getElementById('langlist')
let languageGroupBox = document.getElementById('langGroup') /*CAMBIAR Y ADAPTAR A SELECT*/
let groupLanglist = document.getElementById('groupLanglist')
let addLangBtn = document.getElementById('addLangBtn')

// Locations UI
let municipalitiesDatalist = document.getElementById('municipalities')
let localitiesList = document.getElementById('localities')
let addLocBtn = document.getElementById('addLocBtn')
let entityBox = document.getElementById('entity')
let municipalityBox = document.getElementById('municipality')
let localityBox = document.getElementById('locality')

// Memory
let locSelectedMemory = []
let langSelectedMemory = []

function deleteTableRow(element) {
    let id = `${element._id}`
    let tr = document.getElementById(id)
    tr.remove()
}



function is_valid_datalist_value(idDataList, inputValue) {

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

const disableLanguageGroupBox = () => {
    languageGroupBox.value = ""
    languageGroupBox.disabled = true
        /*addLangBtn.style.display = "none*/
    clearDataList(groupLanglist)

}

async function enableLangGroup() {
    let selectedLanguage = languageBox.value


    // Checking if is empty
    if (selectedLanguage == "") {
        return Swal.fire(
            'SYLARD!',
            'Debe seleccionar una opción de la lista',
            'info'
        )
    }

    let selectedLanguageId = document.querySelector(`option[value="${selectedLanguage}"]`).id
    let parents = []
    try {
        // Loading ParetnTree
        parents = await languageHelper.getParentTree(selectedLanguageId)
        if (!parents) {
            return Swal.fire(
                'SYLARD!',
                'El servidor no respondio',
                'info'
            )
        } else if (parents.length == 0) {
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

    clearDataList(langGroup)
    parents.forEach(planguage => {
        let option = document.createElement('option')
        languageGroupBox.appendChild(option)
        option.value = `${planguage.name} | ${planguage.gid}`
        option.innerHTML = `${planguage.name} | ${planguage.gid}`
        option.setAttribute('data-id', `${planguage._id}`)
        option.setAttribute('data-name', `${planguage.name}`)
    });
    languageGroupBox.disabled = false

}

const enableAddButton = function() {
    addLangBtn.style.display = 'inline'



}

function addLanguageRow(language, groupLanguage) {
    let table = document.getElementById('langTable')
    let tr = document.createElement('tr')
    tr.setAttribute('id', `${language.gid}`)

    tr.innerHTML = `
            <input 
              type="text" 
              style="display:none;" 
              name="languages" 
              value="${language._id}">
            <input 
              type="text" 
              style="display:none;" 
              name="languages" 
              value="${groupLanguage._id}">
            <td class="lengua_terminal_glottocode_agregar_coleccion">${language.gid}</td>
            <td>${language.name}</td>
            <td class="grupo_terminal_glottocode_agregar_coleccion">${groupLanguage.gid}</td>
            <td>${groupLanguage.name}</td>
            <td>
            <div class="contenedor_botones_accion_lengua">
                    <button  id="tr${language._id}" class="btn_accion_tabla float_right">
                      <span class="icono_accion_tabla  icon-delete"></span>
                    </button>
                  </div>
            </td>`

    table.appendChild(tr)

    let langDelBtn = document.getElementById(`tr${language._id}`)
    langDelBtn.onclick = () => {
        langSelectedMemory = langSelectedMemory.filter(lanId => lanId !== language._id)
        deleteLangRow(language)
    }
}

function addLocalityRow(locality) {
    let table = document.getElementById('locTable')
    let tr = document.createElement('tr')
    tr.setAttribute('id', `${locality._id}`)
        // Adding element to the table

    tr.innerHTML = `
    <input
      type="text"
      style="display:none;"
      name="localities"
      value="${locality._id}">
    <td class="lengua_terminal_glottocode_agregar_coleccion">${locality.Nom_Loc}</td>
    <td>${locality.Nom_Mun}</td>
    <td>${locality.Nom_Ent}</td>
    <td>Mexico</td>
    <td>${locality.Lat_Decimal}</td>
    <td>${locality.Lon_Decimal}</td>
    <td>
    <div class="contenedor_botones_accion_lengua">
                    <button  id="tr${locality._id}" class="btn_accion_tabla float_right">
                      <span class="icono_accion_tabla  icon-delete"></span>
                    </button>
                  </div>
    </td>`

    table.appendChild(tr)

    let locDelBtn = document.getElementById(`tr${locality._id}`)

    locDelBtn.onclick = () => {
        locSelectedMemory = locSelectedMemory.filter(locId => locId !== locality._id)
        deleteTableRow(locality)
    }
}

const getLangData = (inputSelect, dataList = "") => {
    let selectedLanguage = inputSelect.value
    let inputSelectId = inputSelect.id
    let option = document.querySelector(
        `#${inputSelectId} option[value="${selectedLanguage}"]`
    )
    return {
        _id: option.dataset.id,
        gid: option.value.split(' | ')[1],
        name: option.dataset.name,
    }
}

function addLanguage() {
    let selectedLangGroup = languageGroupBox.value
        // Check if langGroupBox has a correct option
    if (
        selectedLangGroup == "") {
        return Swal.fire(
            'SYLARD!',
            'Debe seleccionar una opción de la lista',
            'info'
        )
    }

    /*let selectedLanguageId = document.querySelector(`option[value="${selectedLanguage}"]`).id*/
    let lang = getLangData(languageBox, langlist)
    let groupLanguage = getLangData(languageGroupBox, groupLanglist)

    // Check if previous selected
    if (langSelectedMemory.indexOf(lang._id) >= 0) {
        return Swal.fire(
            'SYLARD!',
            'Combinacion de lenguas ya seleccionado',
            'info'
        )
    }
    langSelectedMemory.push(lang._id)

    // Reset language input values
    languageBox.value = ""
    languageGroupBox.value = ""
    languageGroupBox.disabled = true
        /*addLangBtn.style.display = "none"*/

    // --->BORRAR
    // // Delete selected language from the datalist
    // var options = Array.from(langlist.children)

    // options.forEach(option => {
    //   if(option.id == lang._id){
    //     option.remove()
    //   }
    // });
    // --->BORRAR

    addLanguageRow(lang, groupLanguage)
}

function deleteLangRow(language) {
    let id = `${language.gid}`
    var tr = document.getElementById(id)
    tr.remove()
        // ---> BORRAR
        // add language to the data list
        // let option = document.createElement('option')
        // option.setAttribute('id',`${language._id}`)
        // option.setAttribute('data-id',`${language._id}`)
        // option.setAttribute('data-name',`${language.name}`)
        // option.setAttribute('value',`${language.name} | ${language.gid}`)
        // langlist.appendChild(option)
        // ----> BORRAR
}

//AQUÍ COMIENZA FUNCIONALIDAD DE ENTIDAD
const addLocality = async function() {
    let selectedEntity = entityBox.value;
    let selectedMunicipality = municipalityBox.value;
    let selectedLocality = localityBox.value;

    // Check if Locality s valid
    if (selectedLocality == "" ||
        !is_valid_datalist_value(localitiesList.id, selectedLocality)) {
        localityBox.value = ""
        return Swal.fire(
            'SYLARD!',
            'Debe seleccionar una opción de la lista',
            'info'
        )
    }
    // Get the locality
    var location = await locationsHelper.getLocality(
        selectedEntity,
        selectedMunicipality,
        selectedLocality
    )

    if (locSelectedMemory.indexOf(location._id) >= 0) {
        return Swal.fire(
            'SYLARD!',
            'Opcion ya seleccionada',
            'info'
        )
    }

    locSelectedMemory.push(location._id)

    localityBox.value = ""
    municipalityBox.value = ""
    entityBox.value = ""
        /*addLocBtn.style.display = "none"*/

    addLocalityRow(location)
}

// Main Functions
const findLocation = async() => {
    toogleLoading()
    let nom_ent = document.getElementById('entity').value
    let nom_mun = document.getElementById('municipality').value
    let nom_loc = document.getElementById('locality').value
    try {
        let location = await locationsHelper.getLocality(nom_ent, nom_mun, nom_loc)

        toogleLoading()
        if (!location) {
            return Swal.fire(
                'Error!',
                'El servidor esta ocupado! intente mas tarde',
                'info'
            )
        }
        //
        let tr = document.getElementById('result');

        // Remove all the previous results
        while (tr.firstChild) {
            tr.removeChild(tr.firstChild)
        }
        // Making the table data elments
        let td_nom_ent = document.createElement('td')
        let td_nom_mun = document.createElement('td')
        let td_nom_loc = document.createElement('td')
        let td_lat_decimal = document.createElement('td')
        let td_lon_decimal = document.createElement('td')

        tr.appendChild(td_nom_ent)
        tr.appendChild(td_nom_mun)
        tr.appendChild(td_nom_loc)
        tr.appendChild(td_lat_decimal)
        tr.appendChild(td_lon_decimal)

        td_nom_ent.innerHTML = location.Nom_Ent
        td_nom_mun.innerHTML = location.Nom_Mun
        td_nom_loc.innerHTML = location.Nom_Loc
        td_lat_decimal.innerHTML = location.Lat_Decimal
        td_lon_decimal.innerHTML = location.Lon_Decimal

    } catch (error) {
        toogleLoading()
        return Swal.fire(
            'Error!',
            error.message,
            'info'
        )
    }
}

const toogleLoading = function(id = 'loading') {
    let button = document.getElementById('searchbtn')
    let loadingIcon = document.getElementById(id)
    button.disabled = !button.disabled;
    loadingIcon.hidden = !loadingIcon.hidden
}

// Fill datalist
const fillMunicipalitiesDataList = async function() {
    try {
        disableMunicipality()

        // Check correct selection of previous box
        if (!is_valid_datalist_value('entities', entityBox.value)) {
            return Swal.fire(
                'SYLARD!',
                'Debe seleccionar unas opción de la lista',
                'info'
            )
        }

        // Remove all the previous results
        clearDataList(municipalitiesDatalist)

        const nom_ent = entityBox.value

        // Get municipalities from server
        let municipalities = await locationsHelper.getMunicipalitiesByEntity(
            nom_ent
        )

        // Fill datalist
        if (!municipalities) {
            return Swal.fire('SYLARD!', 'El servidor no respondio', 'info')
        } else if (municipalities.length == 0) {
            return Swal.fire('SYLARD!', 'No se encontraron Municipios', 'info')
        }

        municipalities.forEach((municipality) => {
            let option = document.createElement('option')
            municipalitiesDatalist.appendChild(option)
            option.value = municipality
        })
        municipalityBox.disabled = false
    } catch (error) {
        return Swal.fire('Error: fillMunicipalitiesDataList!', error.message, 'info')
    }
}

const fillLocalitiesDataList = async function() {
    try {
        disableLocality()
            // Check correct selection of previous box
        if (!is_valid_datalist_value('municipalities', municipalityBox.value)) {
            return Swal.fire(
                'SYLARD!',
                'Debe seleccionar una opción de la lista',
                'info'
            )
        }
        // Remove all the previous results
        clearDataList(localitiesList)
            // Get params values
        const nom_ent = entityBox.value
        const nom_mun = municipalityBox.value
            // Get localities from server
        let localities = await locationsHelper.getLocalities(nom_ent, nom_mun)

        // Check for errors
        if (!localities) {
            return Swal.fire(
                'SYLARD!',
                'El servidor no respondio',
                'info'
            )
        } else if (localities.length == 0) {
            return Swal.fire(
                'SYLARD!',
                'No se encontraron localidades',
                'info'
            )
        }
        // Fill datalist
        localities.forEach(locality => {
            let option = document.createElement('option')
            localitiesList.appendChild(option)
            option.value = locality
        });
        localityBox.disabled = false;

    } catch (error) {
        return Swal.fire(
            'Error!',
            error.message,
            'info'
        )
    }
}

const disableMunicipality = () => {
    municipalityBox.value = ""
    municipalityBox.disabled = true;
}

const disableLocality = () => {
    localityBox.value = ""
    localityBox.disabled = true;

}

//document.getElementsByTagName("tr")[2].remove();
export default {
    enableLangGroup,
    addLanguageRow,
    addLanguage,
    deleteLangRow,
    disableLanguageGroupBox,
    enableAddButton,
    findLocation,
    toogleLoading,
    fillMunicipalitiesDataList,
    disableMunicipality,
    fillLocalitiesDataList,
    disableLocality,
    addLocality
}