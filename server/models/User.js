import mongoose from 'mongoose'
import {Schema} from 'mongoose'
import Bcrypt from 'bcryptjs'
import randomstring from 'randomstring'
import Mail from '@fullstackjs/mail'
import keys from '@config/keys'

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
    shortBio:{
        type: String
    },
    country:{
        "name_en": String,
        "name_es": String,
        "code": String
    },
    spokenLanguages:[{
        name: String,
        gid: String
    }],
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
    about : String,  
    image: {
        type: String,
        default: 'https://img.icons8.com/fluent/48/000000/user-male-circle.png'
    },
    terms:{
        type: Boolean,
        default: false,
        // required: true
    },
    emailConfirmationToken : String,
    createdAt: Date,
    updatedAt: Date,
    emailConfirmedAt: Date
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
        console.log(`LN68@models/User.js>: Sending email to ${this.email}`)
        await new Mail('confirm-account')
        .from("yoncece@sylard.com")
        .to(this.email, this.name)
        .subject('Sylard, please confirm your account')
        .data({
            name: this.name,
            url: `${keys.homeUrl}/auth/email/confirm/${this.emailConfirmationToken}`
        })
        .send()
        console.log(`models/User.js>: Email send correctly!!!`)
    } catch (error) {
        console.log(`models/User.js> ERROR SENDING MAIL: ${error.message}`)
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
    .from('yoncece@sylard.com')
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