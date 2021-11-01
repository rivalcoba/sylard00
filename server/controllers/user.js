import path from 'path'
import jsonReader from '@helpers/jsonReader'
import User from '@models/User'
import Collection from '@models/Collection'
import keys from '@config/keys'
import Mail from '@fullstackjs/mail'

// DELETE async
const edit = (req, res) => {
  let countries = jsonReader.readFileSync(
    path.join(__dirname, '..', 'assets', 'countries.json')
  )

  let spokenLang = ''

  req.user.spokenLanguages.forEach(lang => {
    spokenLang = spokenLang.concat(lang + '\r\n')
  })
  res.render('user/edit', {
    title: 'SYLARD Editar Cuenta',
    spokenLang,
    countries: countries,
  })
}

const editUserById = async (req, res) => {
  let nativeLanguages = jsonReader.readFileSync(
    path.join(__dirname, '..', 'assets', 'languages.json')
  )
  let countries = jsonReader.readFileSync(
    path.join(__dirname, '..', 'assets', 'countries.json')
  )

  const { userId } = req.params
  if (userId == req.user._id) {
    return res.redirect('/user/edit')
  }
  try {
    // Getting user
    let userDoc = await User.findById(userId)
    //
    let spokenLang = ''
    userDoc.spokenLanguages.forEach(lang => {
      spokenLang = spokenLang.concat(`${lang.name} | ${lang.gid}\n`)
    })
    spokenLang = spokenLang.trim()
    res.render('user/editById', {
      title: 'SYLARD Editar Cuenta',
      userToEdit: userDoc.toJSON(),
      spokenLang: spokenLang,
      nativeLanguages: nativeLanguages,
      countries: countries,
    })
  } catch (error) {
    res.json({ 'error': error.message })
  }
}

const postEditUserById = async (req, res) => {
  const {
    name,
    lastName,
    secLastName,
    email,
    spokenLanguages,
    country,
    about,
  } = req.body

  const { userId } = req.params
  try {
    let userDoc = await User.findById(userId)

    await userDoc.editUser({
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
    res.redirect('/user')
  } catch (error) {
    res.json({ error: error.message })
  }
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
 
  //return res.json({spokenLanguages})

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
  res.render('user/editPassword', {
    title: 'SYLARD Editar contraseña',
  })
}

const editUserPassword = async (req, res) => {
  const { password } = req.body
  await req.user.editPassword(password)
  req.flash('success_msg', 'Password editado con exito')
  res.redirect('/dashboard')
}

const resetPassword = (req, res) => {
  res.render('user/resetPassword', {
    title: 'SYLARD Editar Cuenta',
  })
}
const indexUsuarios = (req, res) => {
  res.render('user', {
    title: 'Usuarios Index',
  })
}

const resetUserPassword = async (req, res) => {
  // Se busca usuario con el password
  await req.user.resetPassword()
  req.flash('success_msg', 'Su password provisional se ha enviado a su correo')
  res.redirect('/')
}

const index = async (req, res) => {
  // res.render('user/index', { usersObjs })
  const usersObjs = await User.find({ role: { $ne: 'su' } })
    .lean()
    .exec()

  /*
  #THESIS
  REF: https://advancedweb.hu/how-to-use-async-functions-with-array-map-in-javascript/#:~:text=The%20map%20function,-The%20map%20is&text=An%20async%20version%20needs%20to,the%20results%20in%20an%20Array.
  */
  let usersDocs = await Promise.all(
    usersObjs.map(async usr => {
      usr.role = usr.role === 'colaborator' ? 'checked' : ''
      let collectionsDocs = await Collection.find({ 'user': usr._id })
      usr.collectionsDocs = collectionsDocs.map(collectionDoc => {
        return collectionDoc.toJSON()
      })
      return usr
    })
  )

  // Buscando las colecciones de este usuario
  //let collectionsDoc = Collection.find({"user":})
  res.render('user/index', { usersObjs: usersDocs })
}

const delUsers = async (req, res) => {
  let { usersIds } = req.body
  // Normalizing
  usersIds = typeof usersIds == 'string' ? [usersIds] : usersIds
  // TODO: DELETE USER AUDIOANNOTATIONS
  // UNA VEZ QUE TOÑO
  console.log('========================================================')
  console.log('========================================================')
  console.log('>>>>>>>>>>>>>>>>>>>>>>> TODO <<<<<<<<<<<<<<<<<<<<<<<<<<<')
  console.log('> FALTA QUE SE IMPLEMENTE BORRADO DE AUDIO ANOTACIONES')
  console.log('> CUANDO SEBORRAN USUARIOS cotrollers/users.js')
  console.log('========================================================')
  console.log('========================================================')
  //
  let result = {}
  // DELETE USERS COLLECTIONS
  let query = {
    user: { $in: usersIds },
  }
  try {
    result = await Collection.find(query, { name: true })
      .remove()
      .exec()
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
    result = await User.find(query, { name: true, role: true })
      .remove()
      .exec()
    console.log(JSON.stringify(result))
    req.flash(
      'success_msg',
      `Usuarios borrados con exito: ${result.deletedCount}`
    )
  } catch (error) {
    console.log(error)
    req.flash('error_msg', 'No se ha podido actualizar la colección')
  } finally {
    res.redirect('/user')
  }
}

// API - API
const api_toggleUserPrivileges = async (req, res) => {
  let { userId } = req.params
  // Finding User by Id
  try {
    let userDoc = await User.findById(userId)
    let result = await userDoc.toggleUserPrivileges()
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

function handleApiErr(res, error){
  res.status(500).json({ err: error.message })
}

const api_requestPromotion = async (req, res) => {
  let { userId,text_reasons } = req.params;

  console.log(text_reasons);
  // Search for User
  // #THESIS HANDLE ERRORS https://dev.to/sobiodarlington/better-error-handling-with-async-await-2e5m?signin=true
  let userDoc = await User.findById(userId).catch(error => handleApiErr(res, error));
  // Send Email to Admon
  // Send the account upgrade to su (Super User)
  await new Mail('request-upgradeAccount')
  .from("yoncece@sylard.com")
  .to(keys.authMail, "Sylard Auth System")
  .subject('Sylard, Authorize Collaboration Account')
  .data({
      name: userDoc.name,
      lastName: userDoc.lastName,
      email: userDoc.email,
      loginUrl: `${keys.homeUrl}/auth/login`,
      url: `${keys.homeUrl}/auth/enable/colaborator/${userDoc.email}`,
      reasons:text_reasons
  })
  .send().catch(error => handleApiErr(res, error));
  console.log(`authController>emailConfirmed> Correo enviado a ${keys.authMail}`)
  // We update the user with the confirmation
  try{
  await userDoc.editUser({
    TextBox_colab:text_reasons,
    onpromote:true
  })
  req.flash('success_msg', 'solicitud enviada con exito')
  // Get the info from
  res.redirect('/dashboard')
}catch(e){
  req.flash('error_msg', 'Error')
  // Get the info from
  res.redirect('/dashboard')
}
  //return res.status(200).json({acknowledge: 'Request Send', userId: userDoc._id });
}

const api_getUsersCollections = async (req, res) => {
    // res.render('user/index', { usersObjs })
    const usersObjs = await User.find({ role: { $ne: 'su' } })
      .lean()
      .exec()
  
    /*
    #THESIS
    REF: https://advancedweb.hu/how-to-use-async-functions-with-array-map-in-javascript/#:~:text=The%20map%20function,-The%20map%20is&text=An%20async%20version%20needs%20to,the%20results%20in%20an%20Array.
    */
    let usersDocs = await Promise.all(
      usersObjs.map(async usr => {
        
        let collectionsDocs = await Collection.find({ 'user': usr._id })
        usr.collectionsDocs = collectionsDocs.map(collectionDoc => {
          return collectionDoc.toJSON()
        })
        return usr
      })
    )
  res.status(200).json(usersDocs)
}

const api_getUsers = async (req, res) => {
  const usersDocuments = await User.find().exec()
  res.status(200).json(usersDocuments)
}

const api_delUsers = async (req, res) => {
  let { usersIds } = req.body
  
  // Normalizing
  usersIds = typeof usersIds == 'string' ? [usersIds] : usersIds
  
  // Building Query
  let query = {
    _id: { $in: usersIds },
  }

  try {
    const userDocs = await User.find(query).exec()

    let deletionResults = Promise.all(
      userDocs.map(async userDoc =>{
        console.log(`>> Deleting user: ${userDoc.name}`);
        let result = await userDoc.deleteOne()
        return result
      })
    )
    res.status(200).json({ result: 'Dellete user(s) ok', deletionResults })
  } catch (error) {
    console.log(`>-> Error al borrar usuario(s): ${error.message}`)
    res.status(500).json({ error: error.message })
  }
}

const delById = async (req, res)=>{
  let {userId} = req.params
  try {
    let userDoc = await User.findById(userId)
    let result = await userDoc.deleteOne()
    console.log(`> DELETE: ${result}`)
    res.redirect('/user')
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
const promote_view = (req, res) => {
  res.render('user/reasons_promote', {
    title: 'Promote view',
   
  })
}
const getAllUsersNames = async (req, res)=>{
  try {
    let userDoc = await User.find().select('_id name');
   res.json(userDoc)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


export default {
  edit,
  editUser,
  postEditUserById,
  editUserById,
  editPassword,
  editUserPassword,
  resetPassword,
  resetUserPassword,
  index,
  delUsers,
  api_getUsers,
  api_getUsersCollections,
  api_delUsers,
  api_toggleUserPrivileges,
  api_requestPromotion,
  delById,
  indexUsuarios,
  promote_view,
  getAllUsersNames

}
