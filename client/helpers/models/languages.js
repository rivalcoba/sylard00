import client from '@client/utils/axios'

const getParentTree = async function(
    id){    
    const response = await client.get(`/glottolog/parentTree/${id}`)
    if(response.status == 200){
        return response.data
    }
    return null
}

const getParentTreeByGid = async function(
    gid){    
    const response = await client.get(`/glottolog/parentTree/gid/${gid}`)
    if(response.status == 200){
        return response.data
    }
    return null
}

const getLanguageList = async ()=>{
    try {
        const response = await client.get('/glottolog/getLanguageList')
        if(response.status == 200){
            return response.data
        }
        return null
    } catch (error) {
        alert(`client/helpers/models/languages> ${error}` )
        return null
    }
}
const getLanguageListByName = async (name='a')=>{
    try {
        const response = await client.get(`/glottolog/getLanguageList/${name}`)
        if(response.status == 200){
            return response.data
        }
        return null
    } catch (error) {
        console.log(`client/helpers/models/languages> ${error}` )
        return null
    }
}

export default {
    getParentTree,
    getLanguageList,
    getLanguageListByName,
    getParentTreeByGid
}