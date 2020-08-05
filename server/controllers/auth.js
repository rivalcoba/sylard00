// Importing user model
import User from '@models/User'
import passport from 'passport'
import path from 'path'
import jsonReader from '@helpers/jsonReader'

// Show Loginform
const login = (req, res, next) => {
    res.render('auth/login');
}

// Processes login form
const loginUser = (req, res, next) => {
    // 1 Se agrega authenticacion
    // y se pasa una estrategia
    passport.authenticate('local', {
        successRedirect:"/",
        failureRedirect: "/auth/login",
        failureFlash: true
    })(req,res,next)
}

// Register User
const register = (req, res)=>{
    let languages = jsonReader.readFileSync(path.join(__dirname,'..','assets','languages.json'))
    // console.log(`>>> JSON: ${languages.nativeLanguages[0]}`)
    res.render('auth/register', {
        onRegisterPage : true,
        nativeLanguages : languages.nativeLanguages
    });
}

// Processing the form for
// Registering New Users
const registerUser = async (req, res, next) => {
    // Extracting Data from the request
    const {name, email, password, lastName, role} = req.body
    try {
        // Back en Validation
        // Creating the new user
        const user = await User.create({
            name,
            lastName,
            email,
            password,
            role
        })
        
        let userModel = user.toJSON()
        
        res.render('auth/confirmMailSent', userModel)
        // return res.status(201).json({user: user.toJSON()})
    } catch (error) {
        console.log(`controllers/auth.js> ERROR registering user: ${error.message}`)        
        return res.status(409).send(`> Error : ${error.message}`)       
    }
}

// Processing the Email Confirmation
const emailConfirmed = async (req, res)=>{
    try {
        // Activating Account
        const user = await User.findOne({
            emailConfirmationToken: req.user.emailConfirmationToken})
            .exec()
        user.activateUser()
        // We update the user with the confirmation
        res.render('auth/confirmedMail', req.user.toJSON())
    } catch (error) {
        console.log(`Controllers>auth>emailConfirmed> ${error.message}`)
        res.render("failed",{
            title: "Activacion de Cuenta",
            iconTitle: "fa fa-frown-o",
            message: "Ha ocurrido un desafortunado error en el proceso de Activacion.",
            error: `El usuario con este correo ${req.body.email} no se ha podido Activar.`})
    }    
}

const logoutUser = (req, res, next) => { 
    // Funcion para salirse
    req.logout()
    req.flash('success_msg', 'Ha cerrado sesión correctamente');
    res.redirect('/auth/login')
}

export default{
    register,
    registerUser,
    login,
    loginUser,
    emailConfirmed,
    logoutUser
}