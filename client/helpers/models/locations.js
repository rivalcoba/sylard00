import client from '@client/utils/axios'

const getByNomLoc = async function(nom_loc){
    const response = await client.get(`/locations/index/nomloc/${nom_loc}`)
    return response.data
}

export default{
    getByNomLoc
}