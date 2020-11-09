import path from 'path'
import jsonReader from '@helpers/jsonReader'
import User from '@models/User'
import Collection from '@models/Collection'

// DELETE async
const edit = (req, res) => {
  let nativeLanguages = jsonReader.readFileSync(
    path.join(__dirname, '..', 'assets', 'languages.json')
  )
  let countries = jsonReader.readFileSync(
    path.join(__dirname, '..', 'assets', 'countries.json')
  )

  let spokenLang = ''

  req.user.spokenLanguages.forEach(lang => {
    spokenLang = spokenLang.concat(`${lang.name} | ${lang.gid}\n`)
  })
  spokenLang = spokenLang.trim()
  console.log(spokenLang)
  res.render('user/edit', {
    spokenLang: spokenLang,
    nativeLanguages: nativeLanguages,
    countries: countries,
  })
}

const editUser = async (req, res) => {
  // Get values from req.body
  const {
    name,
    lastName,
    secLastName,
    email,
    spokenLanguages,
    country,
    about,
  } = req.body

  // Update user
  await req.user.editUser({
    name,
    lastName,
    secLastName,
    email,
    spokenLanguages,
    country,
    about,
  })

  // Flash Message
  req.flash('success_msg', 'Sus cambios se han guardado')
  // Get the info from
  res.redirect('/dashboard')
}

// Formulario para editar el password
const editPassword = (req, res) => {
  res.render('user/editPassword')
}

const editUserPassword = async (req, res) => {
  const { password } = req.body
  await req.user.editPassword(password)
  req.flash('success_msg', 'Password editado con exito')
  res.redirect('/dashboard')
}

const resetPassword = (req, res) => {
  res.render('user/resetPassword')
}

const resetUserPassword = async (req, res) => {
  // Se busca usuario con el password
  await req.user.resetPassword()
  req.flash('success_msg', 'Su password provisional se ha enviado a su correo')
  res.redirect('/')
}

const index = async (req, res) => {
  const usersIdsDocs = await User.find()
    .lean()
    .exec()
  res.render('user/index', { usersIdsDocs })
}

const delUsers = async(req, res)=>{	
  let { usersIds } = req.body
  // Normalizing 
  usersIds = typeof usersIds == 'string' ? [usersIds] : usersIds
  // TODO: DELETE USER AUDIOANNOTATIONS
  // UNA VEZ QUE TOÑO
  console.log("========================================================")
  console.log("========================================================")
  console.log(">>>>>>>>>>>>>>>>>>>>>>> TODO <<<<<<<<<<<<<<<<<<<<<<<<<<<")
  console.log("> FALTA QUE SE IMPLEMENTE BORRADO DE AUDIO ANOTACIONES")
  console.log("> CUANDO SEBORRAN USUARIOS cotrollers/users.js")
  console.log("========================================================")
  console.log("========================================================")
  //
  let result = {}
  // DELETE USERS COLLECTIONS
  let query = { 
    user : { $in : usersIds}
  }
  try {
    result = await Collection.find(query,{name:true}).remove().exec()
  } catch (error) {
    // Error al borrar audio anotaciones
    return res.status(404).json(error)
  }

  // Building Query
  query = {
    _id: { $in: usersIds },
  }

  // Delete all users
  result = {}
  try {
    result = await User.find(query,{name:true, role: true}).remove().exec()
    console.log(JSON.stringify(result))
		req.flash(
      'success_msg',
			`Usuarios borrados con exito: ${result.deletedCount}`
      )
  } catch (error) {
    console.log(error)
		req.flash(
			'error_msg',
			'No se ha podido actualizar la colección'
		)
  } finally{
    res.redirect('/user')
  }
}

const api_getUsers = async (req, res) => {
  const usersDocuments = await User.find().exec()
  res.status(200).json(usersDocuments)
}

const api_delUsers = async (req, res) => {
  let { usersIds } = req.body

  // TODO: IMPLEMENTAR BORRADO DE AUDIOANOTATIONS DE USUARIOS QUE SERAN BORRADOS  
  
  // TODO: IMPLEMENTAR BORRADO DE COLLECTIONS DE USUARIOS QUE SERAN BORRADOS


  
  // Normalizing 
  usersIds = typeof usersIds == 'string' ? [usersIds] : usersIds
  // Building Query
  let query = {
    _id: { $in: usersIds },
  }

  let result = {}
  try {
    result = await User.find(query,{name:true, role: true}).remove().exec()    
    res.status(200).json({ result })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export default {
  edit,
  editUser,
  editPassword,
  editUserPassword,
  resetPassword,
  resetUserPassword,
  index,
  delUsers,
  api_getUsers,
  api_delUsers,
}
