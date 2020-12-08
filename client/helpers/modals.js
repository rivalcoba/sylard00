import Swal from 'sweetalert2'

const show = (title = "", content = "") => {
    Swal.fire({
        title: `<span style="color:#3A96A2"><strong>${title}</strong></span>`,
        html: content,
        showCloseButton: true,
        showConfirmButton: false,
    })
}


export default {
    show
}