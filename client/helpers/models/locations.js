import client from '@client/utils/axios'

const getByNomLoc = async function(nom_loc){
    
    const response = await client.get(`/locations/index/nomloc/${nom_loc}`)
    if(response.status == 200){
        return response.data
    }
    return null
}

export default{
    getByNomLoc
}