// Importing validation framework
import * as Yup from 'yup';
import User from '@models/User';

// Creating validation schema
// All we need from the confirmation email is the token
const EmailConfirmSchema = Yup.object().shape({
    token: Yup.string().length(64).required()
});

export default async (req, res, next)=>{
    try {
        // Check for a duplicate user
        // by email
        const user = await User.findOne({email: req.body.email})
        // If the user was found
        if(!user){
            // We continue with the process
            req.user = user;
            next()
        }else{
            res.render("failed",{
                title: "Registro",
                iconTitle: "fa fa-frown-o",
                message: "Ha ocurrido un desafortunado error en el proceso de registro.",
                error: `El usuario con este correo ${req.body.email} ya existe.`})
        }
    } catch (error) {
        console.log(`duplicateUserValidation> ${error.message}`)
        res.render("failed",{
            title: "Error en Registro",
            iconTitle: "fa fa-exclamation-circle",
            message: "Ha ocurrido un desafortunado error en el proceso de registro.",
            error: `No se ha podido confirmar la existencia del correo electronico en la base de datos.`})
    }
}
