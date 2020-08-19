// Import Model
import Glottolog from '@models/Glottolog'
import { json } from 'express'

const index = async (req, res)=>{
    const glottologs = await Glottolog.findOne({gid:'yolo1241'}).populate('parentTree').exec()

    // const parent = await glottologs.getParent()
    var parents = [] 
    parents = await glottologs.getParentBranch(parents)
    console.log(`> PARENTS: ${parents.length}`)

    //glottologs.populate('parentTree')
    //glottologs[0].populate('parentTree')
    // console.log(`Parent: ${parent}`)

    //glottologs.populateParentTree()
    //glottologs[0].populate('parentTree')
    // glottologs.forEach(async (language) => {
    //     await language.populateParentTree()
    //     console.log(language.parentTree)
    // });
    
    // let languages = glottologs.map((language)=>{
    //     let nlang = {}
    //     nlang = language.toJSON()
    //     nlang.parentTree = language.parentTree
    //     return nlang
    // })
    return res.send('handshake')
    // res.render('glottolog/index', {
    //     languages,
    //     object: JSON.stringify(languages)
    // })
}

export default {
    index
}