import path from 'path'
import jsonReader from '@helpers/jsonReader'
import User from '@models/User'

// DELETE async
const edit = (req, res)=>{
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

const resetPassword = (req, res)=>{
    res.render('user/resetPassword')
}

const resetUserPassword = async (req, res)=>{
    // Se busca usuario con el password
    await req.user.resetPassword()
    req.flash('success_msg', 'Su password provisional se ha enviado a su correo');
    res.redirect('/')
}

const index = async (req, res) => {
    // TODO: Terminar esta sección
  const usersDocs = await User.find().exec()

  // Collections to JSON
  let usersObjs = usersDocs.map(userObj => {
    return userObj.toJSON()
  })

  res.render('user/index', { usersObjs })
}

const api_getUsers = async (req, res)=>{
    const usersDocuments = await User.find().exec()
    res.status(200).json(usersDocuments)
}

const api_delUsers = async (req, res)=>{
    let { usersIds } = req.body;
    let query = { _id : { $in : typeof(usersIds) == 'string' ? [usersIds] : usersIds}}
    // let Id = typeof(usersIds) == 'string' ? [usersIds] : usersIds
    console.log(`Id: ${typeof(usersIds)}`)
    console.log(`Id: ${usersIds}`)
    try {
        // let deletedUsers = await User.find({query}).exec()
        let deletedUsers = await User.find(query).exec()
        res.status(200).json({deletedUsers})
    } catch (error) {
        res.status(200).json({error})
    }
    // TODO: usar find y luego remove REf: https://intellipaat.com/community/27863/how-do-i-remove-documents-using-node-js-mongoose
}

export default{
    edit,
    editUser,
    editPassword,
    editUserPassword,
    resetPassword,
    resetUserPassword,
    index,
    api_getUsers,
    api_delUsers
}