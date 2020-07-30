import mongoose from 'mongoose'
import {Schema} from 'mongoose'
import Bcrypt from 'bcryptjs'
import randomstring from 'randomstring'
import Mail from '@fullstackjs/mail'
import keys from '@config/keys'
import colors from 'colors'

// Creatnig a User Schema
const UserSchema = new Schema({    
    name:{
        type: String,
        required: true
    },
    lastName:{
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'visitor',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        default: 'https://img.icons8.com/fluent/48/000000/user-male-circle.png'
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
})

// Creating Post Middleware
// ref: https://mongoosejs.com/docs/middleware.html#post
// The method retunr a promise
UserSchema.post('save', async function(){
    try {
        console.log(`LN68@models/User.js>: Sending email to ${this.email}`.yellow.italic.bgRed)
        await new Mail('confirm-account')
        .from("yoncece@sylard.com")
        .to(this.email, this.name)
        .subject('Sylard, please confirm your account')
        .data({
            name: this.name,
            url: `${keys.homeUrl}/auth/email/confirm/${this.emailConfirmationToken}`
        })
        .send()
        console.log(`LN68@models/User.js>: Email send correctly!!!`.yellow.italic.bgBlue)
    } catch (error) {
        console.log(`LN70@models/User.js> ERROR SENDING MAIL: ${error.message}`.red.bold.bgYellow)
    }    
})

// Exporting User Schema
export default mongoose.model('Users', UserSchema)