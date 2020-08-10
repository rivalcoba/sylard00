// Se asegura de que el usuario sea un
// colaborador
export default (req, res, next)=>{
    if(res.locals.user.role == 'su'){
        next()
    }else{
        req.flash('error_msg','Se requiere ser Super Usuario para acceder a esta sección')
        res.redirect('/dashboard')
    }
}