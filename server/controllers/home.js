import fs from 'fs'
import path from 'path'
import Collection from '@models/Collection'

// Home Controllers
const index = (req, res) => {
    // Check if the user is logged
    if (res.locals.user && res.locals.user.role == "colaborator") {
        res.redirect(`/collections`)
    } else
    if (res.locals.user) {
        res.redirect('/dashboard')
    } else {
        res.render('index/home', {
            title: 'SYLARD Synchronized Language Annotation Result Display',
        })
    }
}
const contact = (req, res) => {
    res.render('index/contact', {
        title: 'Contact',
        content: 'Contact the administrator',
    })
}
const credits = (req, res) => {
    res.render('index/contact', {
        title: 'Credits',
        content: 'Site builded by Drako-YonceCe',
    })
}
const dashboard = async(req, res) => {
    // Get Collecionts
    const collectionsDocs = await Collection.find()
        .populate('user')
        .exec()
        // Collections to JSON
    let collections = collectionsDocs.map((collection) => {
        return collection.toJSON()
    })
    res.render('index/dashboard', {
        title: 'Catálogo por audionotación',
        collections,
    })
}
const documentation = (req, res) => {
    res.render('index/documentation', {
        title: 'Sylard Documentation',
        content: 'You can find the instructions to use Sylard in this place.',
    })
}
const usermanual = (req, res) => {
    res.render('index/register', {
        title: 'User Manual',
        content: 'Terms and conditions are presenting bellow....',
    })
}
const terms = (req, res) => {
    res.render('index/register', {
        title: 'Terms',
        content: 'Terms and conditions are presenting bellow....',
    })
}

const test = (req, res) => {
    res.render('index/test')
}

const vuetest = (req, res) => {
    res.render('index/vuetest')
}

const audioannotations = (req, res) => {
    res.render('index/audioannotations')
}

const cleanEaf = (req, res) => {
    let eafPath = path.join(__dirname, '..', 'public', 'eaf')
    fs.readdir(eafPath, (err, files) => {
        if (err) { return res.json(err) }
        for (const file of files) {
            fs.unlink(path.join(eafPath, file), err => {
                if (err) { return res.json(err) }
            })
        }
        res.json({ "return": "ok" })
    })
}

// Exporting Controllers
export default {
    index,
    contact,
    credits,
    dashboard,
    documentation,
    usermanual,
    terms,
    test,
    vuetest,
    audioannotations,
    cleanEaf,
}