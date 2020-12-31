export default function(req, res, next){
    // isAuthentcaded is a funcion of passport
    if(req.isAuthenticated() && req.user && req.user.role === 'su'){
        return next()
    }else{
        req.flash('error_msg','Requiere acceder como Super Usuario')
        res.redirect('/dashboard')
    }
}