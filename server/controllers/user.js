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

export default{
    edit
}