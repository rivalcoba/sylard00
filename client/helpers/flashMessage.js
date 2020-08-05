import Swal from 'sweetalert2'

const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
/* Icon type
success
error
warning
info
question
*/
function showFlashMesage (icon, message){
    Toast.fire({
        icon: icon,
        title: message
      })
}

export default function(){
  
  if(document.getElementById("error")){
    showFlashMesage('error',document.getElementById("error").textContent)
  }
  if(document.getElementById("info")){
    showFlashMesage('info',document.getElementById("info").textContent)
  }
  if(document.getElementById("success")){
    showFlashMesage('success',document.getElementById("success").textContent)
  }
}