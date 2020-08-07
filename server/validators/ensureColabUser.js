// Se asegura de que el usuario sea un
// colaborador
export default (req, res, next)=>{
    if(res.locals.user.role == 'colaborator'){
        next()
    }else{
        req.flash('error_msg','Se requiere ser colaborador para acceder a esta sección')
        res.redirect('/dashboard')
    }
}