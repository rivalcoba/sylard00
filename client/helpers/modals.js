import Swal from 'sweetalert2'

const show= (title = "", content="")=>{
    Swal.fire({
			title: `<strong>${title}</strong>`,
      icon: 'info',
      html: content,
    })
}


export default {
    show
}