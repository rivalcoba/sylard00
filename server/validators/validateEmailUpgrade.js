import * as Yup from 'yup';
import User from '../models/User';

// Creating validation schema
// All we need from the confirmation email is the token
const EmailConfirmSchema = Yup.object().shape({
    email: Yup.string().email()
});

export default async (req, res, next)=>{
    try {
      // Validates the existence of a valid token
      await EmailConfirmSchema.validate(req.params)

      // Checking if the token is valid!!
      const user = await User.findOne({
        email: req.params.email,
      })
      // If the user was not found
      if (!user) {
        throw new Yup.ValidationError(
          `Autorizacion Invalida: ${req.params.email}`,
          req.body,
          'validateEmailUpgrade'
        )
      }
      // If the user was found
      // We continue with the process
      req.user2Validate = user;
      next()
    } catch (error) {
        req.flash('error_msg','Usuario inexistente')
        res.redirect('/')
    }    
}