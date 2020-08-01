import {Strategy as LocalStrategy} from 'passport-local'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

// Load user model
import User from '@models/User'

export default function(passport){
    passport.use(new LocalStrategy({
        usernameField: 'email'
    },  (email, password, done)=>{
        // Use mongoose to validate user
        // MATCH USER
        User.findOne({
            email : email
        }).then(user=>{
            if (!user) {
                return done(
                    null, // error
                    false, // user
                    {message : "Usuario no encontrado"} // Message
                )
            }
            // MATCH PASSWORD
            bcrypt.compare(password, user.password)
            .then((isMatch)=>{
                if (isMatch) {
                    return done(null, user)
                } else {
                    return done(
                        null, // error
                        false, // user
                        {message : "Password Incorrecto"} // Message
                    )
                }
            })
            .catch((err)=> {
                console.log(`config>passport>bcryp> Error: ${err}`)
                throw err
            })
        })
    }))

    // Esto genera y mantiene las cookies
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
      
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
    });
}