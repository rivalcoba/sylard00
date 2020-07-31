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
        
        // Checking if the token is valid!!
        const user = await User.findOne({emailConfirmationToken: req.params.token})
        
        // If the user was not found
        if(!user){
            throw new Yup.ValidationError(
                `Invalid Confirmation Code: ${req.params.token}`,
                req.body,
                'token'
            )
        }
        // If the user was found
        // We continue with the process
        req.user = user;
        next()
    } catch (error) {
        res.render("auth/failedConfirmedEmail",{message: error.message})
    }
}
