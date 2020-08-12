import path from 'path'
import jsonReader from '@helpers/jsonReader'

const edit = async(req, res)=>{
    let nativeLanguages = jsonReader.readFileSync(path.join(__dirname,'..','assets','languages.json'))
    let countries = jsonReader.readFileSync(path.join(__dirname,'..','assets','countries.json'))
    
    let spokenLang = ""
    
    req.user.spokenLanguages.forEach(lang => {
        spokenLang = spokenLang.concat(`${lang.name} | ${lang.gid}\n`)
    });
    spokenLang = spokenLang.trim()
    console.log(spokenLang)   
    res.render('users/edit',{
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
      await req.user.updateOne({
        name : name,
        lastName: lastName,
        secLastName: secLastName,
        email: email,
        spokenLanguages : spokenLanguages,
        country: country,
        about: about
      })
      
    // Flash Message
    req.flash('success_msg', 'Sus cambios se han guardado');
    // Get the info from
    res.redirect('/user/edit')
}

export default{
    edit,
    editUser
}