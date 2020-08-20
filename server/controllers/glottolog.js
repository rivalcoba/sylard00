// Import Model
import Glottolog from '@models/Glottolog'

const index = async (req, res)=>{
    const glottologs = await Glottolog.find({},'gid name parent_id').exec()

    console.log(`Glottolog length: ${glottologs.length}`)
        
    let languages = glottologs.map((language)=>{
        let nlang = {}
        nlang = language.toJSON()
        return nlang
    })
    // let arr = []
    // arr = await glottologs[0].getParentBranch(arr)
    // console.log(`Parentree: ${arr.length}`)

    // console.log(`languages: ${languages.length}`)

    res.render('glottolog/index', {
        languages
    })
}

const parentTree = async (req, res)=>{
    const {id} = req.params
    const language = await Glottolog.findById(id)
    let parentTree = []
    parentTree = await language.getParentBranch(parentTree)
    res.status(200).json(parentTree)
}

export default {
    index,
    parentTree
}