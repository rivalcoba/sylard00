import fs from 'fs'
import path from 'path'
import Collection from '@models/Collection'
import keys from '@config/keys'
import Mail from '@fullstackjs/mail'

// Home Controllers
const index = (req, res) => {
  // Check if the user is logged
  if (res.locals.user && res.locals.user.role === 'colaborator') {
    res.redirect(`/collections`)
  } else if (res.locals.user) {
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
    content: 'Contact the administrator asdas',
  })
}

const audioannotation = (req, res) => {
  if (res.locals.user && res.locals.user.role == 'su')
    return res.redirect('/suAudiosDashboard')
  res.render('index/audioannotation', {
    title: 'Catálogo por audioanotación',
  })
}
const credits = (req, res) => {
  res.render('index/credits', {
    title: 'Credits',
    content: 'Site builded by Drako-YonceCe',
  })
}

const suCollectionsDashboard = (req, res) => {
  return res.render('index/suCollectionsDashboard')
}

const suAudiosDashboard = (req, res) => {
  return res.render('index/superUserAudioDashboardView')
}

const dashboard = async (req, res) => {
  if (res.locals.user && res.locals.user.role == 'su') {
    return res.redirect('/suCollectionsDashboard')
  }
  // // Get Collecionts
  // const collectionsDocs = await Collection.find()
  //     .populate('user')
  //     .exec()
  //     // Collections to JSON
  // let collections = collectionsDocs.map((collection) => {
  //     return collection.toJSON()
  // })
  res.render('index/dashboard', {
    title: 'Catálogo por colección',
    // collections,
  })
}
const documentation = (req, res) => {
  res.render('index/documentation', {
    title: 'Sylard Documentation',
    content: 'You can find the instructions to use Sylard in this place.',
  })
}
const usermanual = (req, res) => {
  res.render('index/usermanual', {
    title: 'User Manual',
    content: 'Terms and conditions are presenting bellow....',
  })
}
const terms = (req, res) => {
  res.render('index/terms', {
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
    if (err) {
      return res.json(err)
    }
    for (const file of files) {
      if (path.extname(file) == '.eaf') {
        fs.unlink(path.join(eafPath, file), err => {
          if (err) {
            return res.json(err)
          }
        })
      }
    }
  })

  let eafTempPath = path.join(__dirname, '..', 'public', 'eaf', 'tmp')
  fs.readdir(eafTempPath, (err, files) => {
    for (const file1 of files) {
      if (path.extname(file1) == '.json') {
        fs.unlink(path.join(eafTempPath, file1), err => {
          if (err) {
            return res.json(err)
          }
        })
      }
    }
  })
  res.json({ 'return': 'ok' })
}

const i18n = (req, res) => {
  res.status(200).json(req.app.locals.translation)
}

const testMail = async (req, res) => {
  let { email } = req.params
  console.log(`Api Email>: Sending email to ${email}`)
  console.log(`Api Email>: Sending email from ${keys.authMail}`)
  console.log(`Api Email>: user mail service ${keys.mailUserName}`)
  try {
    let result = await new Mail('email-test')
      .from(keys.authMail)
      .to(email, 'Sr. Steve')
      .subject('Sylard, This is an email test')
      .data({
        name: 'Sr. Steve',
      })
      .send()
    console.log(`Api Email>: user mail service ${JSON.stringify(result)}`)
    res.status(200).json({ email, result })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
const catalog = async (req, res) => {
  // Get Collecionts
  const collectionsDocs = await Collection.find()
    .populate('user')
    .exec()
  // Collections to JSON
  let collections = collectionsDocs.map(collection => {
    return collection.toJSON()
  })
  res.render('index/catalog', {
    title: 'Catálogo por colección',
    collections,
  })
}
const source_code = async (req, res) => {
  // Get Collecionts

  res.render('index/source_code', {
    title: 'Catálogo por colección',
  })
}

// Exporting Controllers
export default {
  index,
  contact,
  credits,
  dashboard,
  suCollectionsDashboard,
  suAudiosDashboard,
  documentation,
  usermanual,
  terms,
  test,
  vuetest,
  audioannotations,
  audioannotation,
  cleanEaf,
  i18n,
  testMail,
  catalog,
  source_code,
}
