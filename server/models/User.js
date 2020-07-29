import mongoose from 'mongoose'
import {Schema} from 'mongoose'

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
    date: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        default: 'https://img.icons8.com/fluent/48/000000/user-male-circle.png'
    },
    role: {
        type: String,
        default: 'visitor',
        required: true
    }
})

// Exporting User Schema
export default mongoose.model('Users', UserSchema)