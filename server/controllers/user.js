// import User from '@models/User'
// import keys from '@config/keys'
// import path from 'path'
// import jsonReader from '@helpers/jsonReader'

const edit = async(req, res)=>{
    // let nativeLanguages = jsonReader.readFileSync(path.join(__dirname,'..','assets','languages.json'))
    // let countries = jsonReader.readFileSync(path.join(__dirname,'..','assets','countries.json'))

    // res.render('users/edit',{
    //     nativeLanguages: nativeLanguages,
    //     countries : countries
    // })
    res.send('Editar Usuarios')
}

export default{
    edit
}