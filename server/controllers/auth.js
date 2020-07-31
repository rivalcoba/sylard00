// Importing user model
import User from '@models/User'

// Processes login form
const login = (req, res, next) => {
    res.render('index/documentation', { title: 'Login', content:'Enter your credentials to login.' });
}
const loginUser = (req, res, next) => {
    res.render('index/documentation', { title: 'Login', content:'Enter your credentials to login.' });
}

// Register User
const register = (req, res)=>{
    res.render('auth/register', {onRegisterPage:true });
}

// Processing the form for
// Registering New Users
const registerUser = async (req, res, next) => {
    // Extracting Data from the request
    const {name, email, password} = req.body
    try {
        // Back en Validation
        // Creating the new user
        const user = await User.create({
            name,
            email,
            password
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
        const user = await User.findOneAndUpdate({
            emailConfirmationToken: req.user.emailConfirmationToken},{
                emailConfirmationToken: null,
                updatedAt: new Date(),
                emailConfirmedAt: new Date()
            },{
                new: true
            }).exec()
                
        // We update the user with the confirmation
        res.render('auth/confirmedMail', req.user.toJSON())
    } catch (error) {
        console.log(`Controllers>auth>emailConfirmed> ${error.message}`)
        res.render('auth/failedConfirmedEmail', {message: `Error al validar el usuario con el siguiente correo: ${req.user.email}`})
    }    
}

export default{
    register,
    registerUser,
    login,
    loginUser,
    emailConfirmed
}