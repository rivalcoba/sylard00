// To use asynch await here
import "@babel/polyfill"
import mongoose from 'mongoose'
import keys from '@config/keys'

const getConnection = async ()=>{
    try {
      await mongoose.connect(keys.databaseUrl, {useNewUrlParser: true,useUnifiedTopology: true })
      console.log(`LN29@app.js: Mongoose connected @${keys.databaseUrl}`)
    } catch (error) {
      console.log(`LN31@app.js: Error: ${error.message}`)
    }
  }

export default function(){
    // Map Global promise - get ride of warning
    // To use global promises
    mongoose.Promise = global.Promise;

    return getConnection()
}