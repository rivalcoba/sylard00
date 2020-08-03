
export default (req, res, next)=>{
    if(res.locals.user.emailConfirmedAt){
        next()
    }else{
        req.flash('error_msg','Requiere activar su cuenta')
        res.redirect('/auth/login')
    }
}