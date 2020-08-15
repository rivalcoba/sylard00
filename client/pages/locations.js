
import locationsHelper from '@chelpers/models/locations'
import Swal from 'sweetalert2'

const fillLocationsById = async (inputId, outputId)=>{
    toogleLoading()
    let nom_loc = document.getElementById(inputId).value

    try {
        let locations = await locationsHelper.getByNomLoc(nom_loc)
        
        toogleLoading()
        if(!locations){
            return Swal.fire(
                'Error!',
                'El servidor esta ocupado! intente mas tarde',
                'info'
              )
        }
        //
        let ul = document.getElementById(outputId);
        // Remove all the previous results
        while (ul.firstChild) {
          ul.removeChild(ul.firstChild)
        }
    
        // document.getElementById(outputId).appendChild(ul);
    
        locations.forEach(location => {
            //console.log(location.Nom_Loc)
            let li = document.createElement('li')
            ul.appendChild(li)
            li.innerHTML += `Nombre: ${location.Nom_Loc} - Municipio: ${location.Nom_Mun} - Entidad: ${location.Nom_Ent}`;
        });
        
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

export default {
    fillLocationsById,
    toogleLoading
}