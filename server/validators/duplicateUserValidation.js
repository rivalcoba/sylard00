import "@babel/polyfill"
// Importing validation framework
import * as Yup from 'yup';
import User from '@models/User';

// Creating validation schema
// All we need from the confirmation email is the token
const UserRegistrationSchema = Yup.object().shape({
    name: Yup.string().required('Se requiere ingresar nombre'),
    lastName: Yup.string().required('Se requiere ingresar apellido'),
    email: Yup.string().email().required('Se requiere ingresar un correo valido'),
    role: Yup.string().oneOf(["colaborator","visitor"]).required('Se requiere proporcionar un rol'),
    password: Yup.string().min(6).required('Se requiere ingresar password de al menos 6 caracteres'),
    confirmationPassword: Yup.string().oneOf([Yup.ref('password')],'Los passwords ingresados no coinciden')
});

export default async (req, res, next)=>{
    try {
        req.body.role = typeof(req.body.role)==="undefined"?"visitor":"colaborator"
        const {name, lastName, email, password, confirmationPassword, role} = req.body
        
        // Backend form validation
        await UserRegistrationSchema.validate({
            name,
            lastName,
            email,
            password,
            confirmationPassword,
            role
        })

        // by email
        const user = await User.findOne({email: req.body.email})
        // If user was not found, its ok...
        if(!user){
            // We continue with the process
            req.user = user;
            next()
        }else{
            // Failed be cause a user is attepmting to register
            // an aready registered user
            // Setting the flashing message            
            req.flash('error_msg',`El usuario con el correo "${req.body.email}" ya existe.`)
            res.redirect('/auth/register')
        }
    } catch (error) {
        console.log(`duplicateUserValidation> ${error.message}`)        
        req.flash('error_msg',`El formulario no ha sido llenado correctamente: ${error.message}`)
        res.redirect('/auth/register')
    }
}
