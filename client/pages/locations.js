
/*import locationsHelper from '@chelpers/models/locations'
import Swal from 'sweetalert2'*/

// Auxiliary Functions
const clearDataList = (dataList) => {
  // Remove all the previous results
  while (dataList.firstChild) {
    dataList.removeChild(dataList.firstChild)
  }
}

  
function is_valid_datalist_value(idDataList, inputValue) {
  var option = document.querySelector(
    '#' + idDataList + " option[value='" + inputValue + "']"
  )
  if (option != null) {
    return option.value.length > 0
  }
  return false
}

// Main Functions

const findLocation = async ()=>{
    toogleLoading()
    let nom_ent = document.getElementById('entity').value
    let nom_mun = document.getElementById('municipality').value
    let nom_loc = document.getElementById('locality').value
    try {
        let location = await locationsHelper.getLocality(nom_ent, nom_mun, nom_loc)
        
        toogleLoading()
        if(!location){
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

        // location.forEach(location => {
        //     //console.log(location.Nom_Loc)
        //     let li = document.createElement('li')
        //     tr.appendChild(li)
        //     li.innerHTML += `Nombre: ${location.Nom_Loc} - Municipio: ${location.Nom_Mun} - Entidad: ${location.Nom_Ent}`;
        // });        
    } catch (error) {
        toogleLoading()
        return Swal.fire(
            'Error!',
            error.message,
            'info'
          )
    }
}

const toogleLoading = function(id = 'loading'){
    let button = document.getElementById('searchbtn')
    let loadingIcon = document.getElementById(id)
    button.disabled = !button.disabled;
    loadingIcon.hidden = !loadingIcon.hidden
}

// Fill datalist
const fillMunicipalitiesDataList = async function(){    
    try {
        disableMunicipality()
        // Get Datalist reference
        let entityBox = document.getElementById('entity')
        let dataList = document.getElementById('municipalities')
        let municipalityBox = document.getElementById('municipality')

        // Check correct selection of previous box
        if(!is_valid_datalist_value('entities',entityBox.value)){
            return Swal.fire(
                'SYLARD!',
                'Debe seleccionar una opción de la lista',
                'info'
              ) 
        }
        
        // Remove all the previous results
        clearDataList(dataList)

        const nom_ent = entityBox.value

        // Get municipalities from server
        let municipalities = await locationsHelper.getMunicipalitiesByEntity(nom_ent)
        
        // Fill datalist
        if(!municipalities){
            return Swal.fire(
                'SYLARD!',
                'El servidor no respondio',
                'info'
              ) 
            } else if(municipalities.length == 0){
                return Swal.fire(
                    'SYLARD!',
                    'No se encontraron Municipios',
                    'info'
                  )
        }
        
        municipalities.forEach(municipality => {
            let option = document.createElement('option')
            dataList.appendChild(option)
            option.value = municipality
        });
        municipalityBox.disabled = false;      
    } catch (error) {
        return Swal.fire(
            'Error!',
            error.message,
            'info'
          )        
    }
}

const fillLocalitiesDataList = async function(){
    try {
        disableLocality()
        // Get Datalist reference
        let entityBox = document.getElementById('entity')
        let municipalityBox = document.getElementById('municipality')
        let localityBox = document.getElementById('locality')
        let dataList = document.getElementById('localities')

        // Check correct selection of previous box
        if(!is_valid_datalist_value('municipalities',municipalityBox.value)){
            return Swal.fire(
                'SYLARD!',
                'Debe seleccionar una opción de la lista',
                'info'
              ) 
        }
        // Remove all the previous results
        clearDataList(dataList)
        // Get params values
        const nom_ent = entityBox.value
        const nom_mun = municipalityBox.value
        // Get localities from server
        let localities = await locationsHelper.getLocalities(nom_ent, nom_mun)
        
        // Check for errors
        if(!localities){
            return Swal.fire(
                'SYLARD!',
                'El servidor no respondio',
                'info'
              ) 
            } else if(localities.length == 0){
                return Swal.fire(
                    'SYLARD!',
                    'No se encontraron localidades',
                    'info'
                  )
        }
        // Fill datalist
        localities.forEach(locality => {
            let option = document.createElement('option')
            dataList.appendChild(option)
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

const disableMunicipality = ()=>{
    let municipalityBox = document.getElementById('municipality')
    municipalityBox.value = ""
    municipalityBox.disabled = true;
}

const disableLocality = ()=>{
    let localityBox = document.getElementById('locality')
    localityBox.value = ""
    localityBox.disabled = true;
}

export default {
  findLocation,
  toogleLoading,
  fillMunicipalitiesDataList,
  disableMunicipality,
  fillLocalitiesDataList,
  disableLocality,
}