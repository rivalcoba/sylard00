import client from '@client/utils/axios'

const getLocality = async function(
    nom_ent, nom_mun, nom_loc){    
    const response = await client.get(`/locations/find/${nom_ent}/${nom_mun}/${nom_loc}`)
    if(response.status == 200){
        return response.data
    }
    return null
}

const getMunicipalitiesByEntity = async function(nom_ent){
    const response = await client.get(`/locations/index/municipalitiesOf/${nom_ent}`)
    if(response.status == 200){
        return response.data
    }
    return null
}

const getLocalities = async (nom_ent, nom_mun)=>{
    const response =  await client.get(`/locations/index/localitiesOf/${nom_ent}/${nom_mun}`)
    if(response.status == 200){
        return response.data
    }
    return null
}

const getEntities = async ()=>{
    const response = await client.get(`/locations/entities`)
    if(response.status == 200){
        return response.data
    }
    return null
}

export default{
    getLocality,
    getMunicipalitiesByEntity,
    getLocalities,
    getEntities
}