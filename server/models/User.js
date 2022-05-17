import mongoose from 'mongoose'
import {Schema} from 'mongoose'
import Bcrypt from 'bcryptjs'
import randomstring from 'randomstring'
import Mail from '@fullstackjs/mail'
import keys from '@config/keys'
import Collections from '@models/Collection'
import winston from '@config/winston'

// Creatnig a User Schema
const UserSchema = new Schema({    
    name:{
        type: String,
        // required: true
    },
    lastName:{
        type: String
    },
    secLastName:{
        type: String
    },
    about:{
        type: String
    },
    country:{
        "name_en": String,
        "name_es": String,
        "code": String
    },
    spokenLanguages: [
        {
            type: String
        }
    ],
    email: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        // required: true
    },
    role: {
        type: String,
        default: 'visitor', // visitor | colaborator | su
        // required: true
    },
    image: {
        type: String,
        default: 'https://img.icons8.com/fluent/48/000000/user-male-circle.png'
    },
    terms:{
        type: Boolean,
        default: false,
        // required: true
    },
    TextBox_colab: {
        type: String,
        default: 'no_data'
    },
    onpromote:  {  type: Boolean, default: false },
    emailConfirmationToken : String,
    createdAt: Date,
    updatedAt: Date,
    emailConfirmedAt: Date,
    
})

UserSchema.pre('deleteOne',{ query: false , document : true },async function(){
    winston.info(` >> USER PRE DELETE ONE: ${this._id} `);
    let query = {
        user : this._id
    }
    try { 
        let collectionsDocs = await Collections.find(query).exec()
        winston.info(` >> collectionsDocs: ${collectionsDocs.length} `);
        
        let deletionResults = await Promise.all(
            collectionsDocs.map(async colletionDoc => {
            winston.info(` >> Deleting Collection: ${colletionDoc.title}} `);
            let deleteResult = await colletionDoc.deleteOne()
            return deleteResult  
        }))  

        winston.info(` >-> deletionResults: ${deletionResults} `); 

    } catch (error) {   
        winston.error(`>-> USER PRE DELETEONE Error: ${error.message}`);
        throw error
    }
})

// Creating a Pre 
// ref: https://mongoosejs.com/docs/middleware.html#pre
UserSchema.pre('save', function(){
    // Hashing Password before Save
    this.password = Bcrypt.hashSync(this.password)
    this.emailConfirmationToken = randomstring.generate(64)
    this.createdAt = new Date()
    this.updatedAt = new Date()
})

// Creating Post Middleware
// ref: https://mongoosejs.com/docs/middleware.html#post
// The method retunr a promise
UserSchema.post('save', async function(){
    try {  
    winston.info(` LN68@models/User.js>: Sending email to ${this.email} `);
    winston.info(` LN68@models/User.js>: Sending email from ${keys.authMail} `);
    winston.info(` LN68@models/User.js>: user mail service ${keys.mailUserName} `);
        let result = await new Mail('confirm-account')
        .from(keys.authMail)
        .to(this.email, this.name)
        .subject('Sylard, please confirm your account')
        .data({
            name: this.name,
            url: `${keys.homeUrl}/auth/email/confirm/${this.emailConfirmationToken}`
        })
        .send()
        winston.info(` >>> Email Response: ${JSON.stringify(result)} `);
        winston.info(` models/User.js>: Email send correctly!!! `);
    } catch (error) {
        winston.error(`models/User.js> ERROR SENDING MAIL: ${error.message}`);
        throw error
    }    
})

// User Methods
UserSchema.methods.activateUser = async function(role = 'visitor'){
    await this.updateOne({
            emailConfirmationToken: null,
            updatedAt: new Date(),
            emailConfirmedAt: new Date(),
            role: role
        }).exec()
}

UserSchema.methods.upGradeToColaborator = async function(){
    await this.updateOne({
            updatedAt: new Date(),
            role: "colaborator"
        }).exec()
}

UserSchema.methods.toggleUserPrivileges = async function(){
    let newRole = this.role === 'visitor' ? 'colaborator' : 'visitor'
    try {
        let result = await this.updateOne({
            updatedAt: new Date(),
            role: newRole
        }).exec()
        result.newRole = newRole
        result._id = this._id
        return result
    } catch (error) {
        return "error"
    }
}

UserSchema.methods.editUser= async function(data){
    await this.updateOne(data).exec()
}

UserSchema.methods.editPassword = async function(password){
    await this.updateOne({
        password : Bcrypt.hashSync(password),
        updatedAt : new Date()
    }).exec()
}

UserSchema.methods.resetPassword = async function () {
  // Creating a new password
  let newPassoword = randomstring.generate({
    length: 12,
    charset: 'alphanumeric',
  })

  await this.updateOne({
    password : Bcrypt.hashSync(newPassoword),
    updatedAt : new Date()
  }).exec()

  await new Mail('resetPassword')
    .from(keys.authMail)
    .to(this.email, this.name)
    .subject('Sylard, Password Reset')
    .data({
      name: this.name,
      password: newPassoword,
    })
    .send()
}

// Exporting User Schema
export default mongoose.model('Users', UserSchema)