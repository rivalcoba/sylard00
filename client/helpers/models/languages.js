import client from '@client/utils/axios'

const getParentTree = async function(
    id){    
    const response = await client.get(`/glottolog/parentTree/${id}`)
    if(response.status == 200){
        return response.data
    }
    return null
}

export default {
    getParentTree
}