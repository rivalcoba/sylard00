import Swal from 'sweetalert'

const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 3000,
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
export default function(icon, message){
    Toast.fire({
        icon: icon,
        title: message
      })
}