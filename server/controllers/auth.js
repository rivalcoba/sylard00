// Importing user model
import User from '@models/User'
import Language from '@models/Glottolog'
import passport from 'passport'
import path from 'path'
import jsonReader from '@helpers/jsonReader'
import Mail from '@fullstackjs/mail'
import keys from '@config/keys'

// Show Loginform
const login = (req, res) => {
    res.render('auth/login', {
        title: 'SYLARD Login',
    });
}

// Processes login form
const loginUser = (req, res, next) => {
    // 1 Se agrega authenticacion
    // y se pasa una estrategia
    passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect: "/auth/login",
        failureFlash: true
    })(req, res, next)
}

// Register User
const register = async (req, res) => {
    // let languages = jsonReader.readFileSync(path.join(__dirname, '..', 'assets', 'languages.json'))
    let languagesDocs = await Language.find({},{name : true, gid :true, iso639P3code: true, country_ids:true ,country_ids:"MX"  } ).exec()
    let languages = languagesDocs.map(language => {
        return language.toJSON()
    })

    let countries = jsonReader.readFileSync(path.join(__dirname, '..', 'assets', 'countries.json'))

    res.render('auth/register', {
        title: 'SYLARD Registro',
        onRegisterPage: true,
        nativeLanguages: languages,
        countries: countries
    });
}

// Processing the form for
// Registering New Users
const registerUser = async(req, res) => {
    // Extracting Data from the request
    const {
        name,
        lastName,
        secLastName,
        email,
        password,
        role,
        spokenLanguages,
        country,
        terms,
        about
    } = req.body

    try {
        // Back en Validation
        // Creating the new user
        const user = await User.create({
            name,
            lastName,
            secLastName,
            email,
            password,
            role,
            spokenLanguages,
            country,
            terms: terms === 'on',
            about
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
const emailConfirmed = async(req, res) => {
    try {
        // Activating Account
        const user = await User.findOne({
                emailConfirmationToken: req.user.emailConfirmationToken
            })
            .exec()
        let requestedRole = user.role
        user.activateUser()
            // if user is visitor activate if not send their activation request
        if (requestedRole == "visitor") {
            // We update the user with the confirmation
            res.render('auth/confirmedMail', req.user.toJSON())
        } else {
            // Send the account upgrade to su (Super User)
            await new Mail('request-upgradeAccount')
                .from("yoncece@sylard.com")
                .to(keys.authMail, "Sylard Auth System")
                .subject('Sylard, Authorize Collaboration Account')
                .data({
                    name: user.name,
                    lastName: user.lastName,
                    email: user.email,
                    loginUrl: `${keys.homeUrl}/auth/login`,
                    url: `${keys.homeUrl}/auth/enable/colaborator/${user.email}`
                })
                .send()
            console.log(`authController>emailConfirmed> Correo enviado a ${keys.authMail}`)
                // We update the user with the confirmation
            res.render('auth/colabAuthRequested', req.user.toJSON())
        }

    } catch (error) {
        console.log(`Controllers>auth>emailConfirmed> ${error.message}`)
        res.render("failed", {
            title: "Editar usuario",
            iconTitle: "fa fa-frown-o",
            message: "Error al actualizar usuario.",
            error: `${req.body.email}`
        })
    }
}

const enableColaborator = async(req, res) => {
    try {
        // Upgrading account
        const user = await User.findOne({ email: req.user2Validate.email })
            // Se promociona cuenta
        user.upGradeToColaborator()
            // Se notifica al usuario
        await new Mail('upgradeAccepted')
            .from('yoncece@sylard.com')
            .to(user.email, 'Sylard Auth System')
            .subject('Sylard, Collaboration Account accepted')
            .data({
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                url: `${keys.homeUrl}/auth/login`,
            })
            .send()
            // We update the user with the confirmation
        res.render("result", {
            title: "Promoción a colaborador",
            iconTitle: "fa fa-certificate",
            message: `El usuario con el correo: ${user.email} se ha promocionado correctamente.`,
            error: ``
        })
    } catch (error) {
        console.log(`Controllers>auth>emailConfirmed> ${error.message}`)
        res.render("failed", {
            title: "Promoción a colaborador",
            iconTitle: "fa fa-frown-o",
            message: "Ha ocurrido un desafortunado error en el proceso de promoción de la cuenta.",
            error: `El usuario con este correo ${req.body.email} no se ha podido promocionar a colaborador.`
        })
    }
}

const logoutUser = (req, res) => {
    // Funcion para salirse
    req.logout()
    req.flash('success_msg', 'Ha cerrado sesión correctamente');
    res.redirect('/auth/login')
}

export default {
    register,
    registerUser,
    login,
    loginUser,
    emailConfirmed,
    logoutUser,
    enableColaborator,

}