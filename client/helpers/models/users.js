import client from '@client/utils/axios'

const toggleUserPrivileges = async (userId)=>{
  const response = await client.put(`/user/api/toggleUserPrivileges/${userId}`)
  if(response.status == 200){
    return response.data
  }
  return {"result":"failed"}
}

const deleteUsers = async (usersIds)=>{
  const response = await client.delete('/user/api/delusers', { data: {usersIds} })
  if(response.status == 200){
    console.log(`data: ${response.data}`);
    return response.data
  }
  return {"result":"failed"}
}

export default{
  toggleUserPrivileges,
  deleteUsers
}