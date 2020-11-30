import path from 'path'
import jsonReader from '@helpers/jsonReader'
import User from '@models/User'

// DELETE async
const edit = (req, res) => {
    let nativeLanguages = jsonReader.readFileSync(path.join(__dirname, '..', 'assets', 'languages.json'))
    let countries = jsonReader.readFileSync(path.join(__dirname, '..', 'assets', 'countries.json'))

    let spokenLang = ""

    req.user.spokenLanguages.forEach(lang => {
        spokenLang = spokenLang.concat(`${lang.name} | ${lang.gid}\n`)
    });
    spokenLang = spokenLang.trim()
    console.log(spokenLang)
    res.render('user/edit', {
        title: 'SYLARD Editar Cuenta',
        spokenLang: spokenLang,
        nativeLanguages: nativeLanguages,
        countries: countries
    })
}

const editUser = async(req, res) => {
    // Get values from req.body
    const {
        name,
        lastName,
        secLastName,
        email,
        spokenLanguages,
        country,
        about
    } = req.body

    // Update user
    await req.user.editUser({
        name,
        lastName,
        secLastName,
        email,
        spokenLanguages,
        country,
        about
    })

    // Flash Message
    req.flash('success_msg', 'Sus cambios se han guardado');
    // Get the info from
    res.redirect('/dashboard')
}

// Formulario para editar el password
const editPassword = (req, res) => {
    res.render('user/editPassword', {
        title: 'SYLARD Editar contraseña',
    })
}

const editUserPassword = async(req, res) => {
    const { password } = req.body
    await req.user.editPassword(password)
    req.flash('success_msg', 'Password editado con exito');
    res.redirect('/dashboard')
}

const resetPassword = (req, res) => {
    res.render('user/resetPassword', {
        title: 'SYLARD Editar Cuenta',
    })
}

const resetUserPassword = async(req, res) => {
    // Se busca usuario con el password
    await req.user.resetPassword()
    req.flash('success_msg', 'Su password provisional se ha enviado a su correo');
    res.redirect('/')
}

const index = (req, res) => {
    res.send('user list')
}

const api_getUsers = async(req, res) => {
    const usersDocuments = await User.find().exec()
    res.status(200).json(usersDocuments)
}

export default {
    edit,
    editUser,
    editPassword,
    editUserPassword,
    resetPassword,
    resetUserPassword,
    index,
    api_getUsers
}