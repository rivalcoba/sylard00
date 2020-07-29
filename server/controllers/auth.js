// Importing user model
import {UserModel} from '@models/index'
import User from '../models/User'

// Processes login form
const login = (req, res, next) => {
    res.render('index/documentation', { title: 'Login', content:'Enter your credentials to login.' });
}
const loginUser = (req, res, next) => {
    res.render('index/documentation', { title: 'Login', content:'Enter your credentials to login.' });
}

// Register User
const register = (req, res)=>{
    res.render('index/register', { title: 'Register', content:'Fill out the form to register....' });
}

// Processing the form for
// Registering New Users
const registerUser = async (req, res, next) => {
    // Extracting Data from the request
    const {name, email, password} = req.body
    try {
        // Creating the new user
        const user = await User.create({
            name,
            email,
            password
        }) 
        return res.status(201).json({user: user.toJSON()})
    } catch (error) {
        return res.status(409).send(`> Error : ${error.message}`)       
    }
}

// Processing the Email Confirmation
const emailConfirmed = async (req, res)=>{
    // const user = await User
    res.send(`email-confirm> GOOD :D Email confirmed: ${req.params.token}`)
}

export default{
    register,
    registerUser,
    login,
    loginUser,
    emailConfirmed
}