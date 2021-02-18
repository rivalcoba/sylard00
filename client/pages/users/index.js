import userModel from '@chelpers/models/users'
import Swal from 'sweetalert2'

const toggleRole = async (userId)=>{
  try {
    let response = await userModel.toggleUserPrivileges(userId)
    console.log(response.newRole)    
  } catch (error) {
    return Swal.fire(
      'Error!',
      error.message,
      'info'
    )
  }
}

const deleteUsers = async (users)=>{
  try {
    await userModel.deleteUsers(users)
    location = location.href
  } catch (error) {
    return Swal.fire(
      'Error!',
      error.message,
      'info'
    )
  }
}

export default {
  toggleRole,
  deleteUsers
}