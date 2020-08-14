import locationsHelper from '@chelpers/models/locations'

const fillLocationsById = async (inputId, outputId)=>{
    let nom_loc = document.getElementById(inputId).value
    let locations = await locationsHelper.getByNomLoc(nom_loc)
    //console.log(locations)
    //
    let ul = document.createElement('ul');
    document.getElementById(outputId).appendChild(ul);

    locations.forEach(location => {
        //console.log(location.Nom_Loc)
        let li = document.createElement('li')
        ul.appendChild(li)
        li.innerHTML += `Nombre: ${location.Nom_Loc} - Municipio: ${location.Nom_Mun} - Entidad: ${location.Nom_Ent}`;
    });
}

export default {
    fillLocationsById
}