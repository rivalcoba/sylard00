// Import Model
import Glottolog from '@models/Glottolog'
import regexhelp from '@helpers/regexhelp'

const index = async (req, res)=>{
    const glottologs = await Glottolog.find({},'gid name parent_id').exec()

    let languages = glottologs.map((language)=>{
        let nlang = {}
        nlang = language.toJSON()
        return nlang
    })
    res.render('glottolog/index', {
        languages
    })
}

const parentTree = async (req, res)=>{
    // Get parent by id of the language
    const {id} = req.params
    const language = await Glottolog.findById(id)
    let parentTree = await language.getParentBranch()
    res.status(200).json(parentTree)
}

const getLanguageList = async (req, res)=>{
    // Get Param from URL    
    const languages = await Glottolog.find({
      $or: [{ country_ids: 'MX' }, { country_ids: 'US' }],
      parent_id: { $ne: '' },
    }).exec()    
    res.status(200).json(languages)
}

const getLanguageListByName = async (req, res)=>{
    // Get Param from URL
    let {name} = req.params
    name = regexhelp.diacriticSensitiveRegex(name)
    const regexName = new RegExp(name,'i')
    
    const languages = await Glottolog.find({
      name: regexName,
      $or: [{ country_ids: 'MX' }, { country_ids: 'US' }],
      parent_id: { $ne: '' },
    }).exec()    
    res.status(200).json(languages)
}

export default {
    index,
    parentTree,
    getLanguageList,
    getLanguageListByName
}