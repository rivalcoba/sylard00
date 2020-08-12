// Importing validation framework
import * as Yup from 'yup';
import User from '../models/User';

const ConfirmEmailAccountSchema = Yup.string().email('Ingrese un correo valido').required('Se requiere ingresar un correo electronico');

export default async (req, res, next)=>{
    try {
        const { email } = req.body
        // Validates the existence of a valid token
        await ConfirmEmailAccountSchema.validate(email)
        
        // Checking if the email is valid for any account!!
        const user = await User.findOne({email : email})
        
        // If the user was not found
        if(!user){
            console.log("confirmEmailAccount> No se encontro usuario")
            throw new Yup.ValidationError(
                `Invalid Confirmation Code: No se encontro usuario`,
                req.body,
                'email'
            )
        }
        // If the user was found
        // We continue with the process
        console.log("confirmEmailAccount> Existe el Correo en la base de datos")
        req.user = user;
        next()
    } catch (error) {
        req.flash('error_msg','Cuenta o correo inexistentes')
        res.redirect('/')
    }
}
