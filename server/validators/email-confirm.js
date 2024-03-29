// Importing validation framework
import * as Yup from 'yup';
import User from '../models/User';

// Creating validation schema
// All we need from the confirmation email is the token
const EmailConfirmSchema = Yup.object().shape({
    token: Yup.string().length(64).required()
});

export default async (req, res, next)=>{
    try {
        // Validates the existence of a valid token
        await EmailConfirmSchema.validate(req.params)
        console.log(`email-confirmed>Token: ${req.params.token}`)
        
        // Checking if the token is valid!!
        const user = await User.findOne({emailConfirmationToken: req.params.token})
        
        // If the user was not found
        if(!user){
            console.log("email-cofirm> No se encontro usuario")
            throw new Yup.ValidationError(
                `Invalid Confirmation Code: ${req.params.token}`,
                req.body,
                'token'
            )
        }
        // If the user was found
        // We continue with the process
        console.log("> Token Correcto")
        req.user = user;
        next()
    } catch (error) {
        req.flash('error_msg','Token inexistente')
        res.redirect('/')
    }
}
