// To use asynch await here
// import "@babel/polyfill"

import mongoose from 'mongoose'
import keys from '@config/keys'

const getConnection = async () => {
  try {
    await mongoose.connect(keys.databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      replset: { sslValidate: false }, // Not recommended look for another options
    })
    console.log(`LN10@OdmConnect.js: Mongoose connected @${keys.databaseUrl}`)
  } catch (error) {
    console.log(`LN12@OdmConnect.js: Error: ${error.message}`)
  }
}

export default function() {
  // Map Global promise - get ride of warning
  // To use global promises
  mongoose.Promise = global.Promise
  return getConnection()
}
