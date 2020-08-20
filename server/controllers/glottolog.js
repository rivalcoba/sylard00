// Import Model
import Glottolog from '@models/Glottolog'

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

export default {
    index,
    parentTree
}