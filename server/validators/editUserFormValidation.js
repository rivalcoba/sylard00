// import "@babel/polyfill"
// Importing validation framework
import * as Yup from 'yup';
// import User from '@models/User';
import getSpokenLang from '@helpers/getSpokenLang'
import getCountryObj from '@helpers/getCountryObj'
import router from "../routes/auth";

// Creating validation schema
// All we need from the confirmation email is the token
const UserRegistrationSchema = Yup.object().shape({
    name: Yup.string().required('Se requiere ingresar nombre'),
    lastName: Yup.string().required('Se requiere ingresar apellido'),
    email: Yup.string().email().required('Se requiere ingresar un correo valido'),
    about: Yup.string().max(500,'El texto no debe exceder los 500 carácteres'),
    country: Yup.string().required('No ingreso un país de origen de la lista')
});

export default async (req, res, next)=>{
    try {
        // Extracting data
        const {
          name,
          lastName,
          email,          
          about
        } = req.body
        
        let {spokenLanguages, country} = req.body
        
        // Parsing Spoken languages
        req.body.spokenLanguages = getSpokenLang(spokenLanguages)
        
        // Parsing Country
        country = getCountryObj(country)
        if(country)
            req.body.country = country
        
        // Backend form validation
        await UserRegistrationSchema.validate({
            name,
            lastName,
            email,
            about,
            country
        })
        next()
    } catch (error) {
        console.log(`editUserFormValidation>errors> ${error.errors}`)
        req.flash('error_msg',`Formulario incorrecto: ${error.message}`)
        res.redirect('/user/edit')
    }
}
