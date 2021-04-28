import client from '@client/utils/axios'

const getCollectionById = async (collectionId) => {
  const response = await client.get(
    `/collections/api/read/${collectionId}`
  )
  if (response.status == 200) {
    return response
  }else{
    return null
  }
}
const getAllCollectionsForButton=async(count_collections) =>{
  const response = await client.get('/collections/api/pag/1');
  if (response.status == 200) {
    return response.data
  }else{
    return null
  }
}

export default {
  getCollectionById,
  getAllCollectionsForButton
}
