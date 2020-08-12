import path from 'path'
import jsonReader from '@helpers/jsonReader'
import Bcrypt from 'bcryptjs'


// DELETE async
const edit = async(req, res)=>{
    let nativeLanguages = jsonReader.readFileSync(path.join(__dirname,'..','assets','languages.json'))
    let countries = jsonReader.readFileSync(path.join(__dirname,'..','assets','countries.json'))
    
    let spokenLang = ""
    
    req.user.spokenLanguages.forEach(lang => {
        spokenLang = spokenLang.concat(`${lang.name} | ${lang.gid}\n`)
    });
    spokenLang = spokenLang.trim()
    console.log(spokenLang)   
    res.render('user/edit',{
        spokenLang: spokenLang,
        nativeLanguages: nativeLanguages,
        countries : countries
    })
}

const editUser = async (req, res)=>{
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
const editPassword = (req, res)=>{
    res.render('user/editPassword')
}

const editUserPassword = async (req, res)=>{
    const { password } = req.body
    await req.user.editPassword(password)
    req.flash('success_msg', 'Password editado con exito');    
    res.redirect('/dashboard')
}

export default{
    edit,
    editUser,
    editPassword,
    editUserPassword
}