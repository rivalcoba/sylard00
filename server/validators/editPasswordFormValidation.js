import "@babel/polyfill" // DELETE NOT USE
// Importing validation framework
import * as Yup from 'yup';

// Creating validation schema
// All we need from the confirmation email is the token
const UserRegistrationSchema = Yup.object().shape({
    password: Yup.string().min(6).required('Se requiere ingresar password de al menos 6 caracteres'),
    confirmationPassword: Yup.string().oneOf([Yup.ref('password')],'Los passwords ingresados no coinciden')
});

export default async (req, res, next)=>{
    try {
        // Extracting data
        const { password, confirmationPassword } = req.body
        
        // Backend form validation
        await UserRegistrationSchema.validate({
            password, confirmationPassword
        })
        // Go to the next middleware
        next()
    } catch (error) {
        console.log(`editPasswordFormValidation>errors> ${error.errors}`)
        req.flash('error_msg',`Formulario incorrecto: ${error.message}`)
        res.redirect('/user/edit/password')
    }
}
