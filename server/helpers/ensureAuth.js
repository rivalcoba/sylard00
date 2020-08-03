export default function(req, res, next){
    // isAuthentcaded is a funcion of passport
    if(req.isAuthenticated()){
        return next()
    }else{
        req.flash('error_msg','Requiere acceder con su cuenta')
        res.redirect('/auth/login')
    }
}