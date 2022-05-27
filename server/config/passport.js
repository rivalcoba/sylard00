import {Strategy as LocalStrategy} from 'passport-local'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import winston from '@config/winston'

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
                    {message : "Usuario incorrecto"} // Message
                )
            }
            
            
            // Verifies if the account is active
            if(!user.emailConfirmedAt){
                return done(
                    null, // error
                    false, // user
                    {message : "Cuenta inactiva, favor de activarla haciendo clic en el enlace previamente enviado a su correo."}
                )
            }
            // MATCH PASSWORD
            bcrypt.compare(password, user.password)
            .then((isMatch)=>{
                if (isMatch) {
            winston.info(`> Cuenta  ${user.emailConfirmedAt?'ACTIVA':'INACTIVA'}`);
            winston.info('--------------------------')
            winston.info(`> Usuario "${email}" Logeado `);
            winston.info('--------------------------')
                    return done(null, user)
                } else { 

                    let asteriscos=""
 for(let i=0;i<password.length;i++)asteriscos+="*";
 winston.info(`Usuario o contraseña incorrecta ` );
    winston.info(`del usuario: ${email} con contraseña: ${asteriscos}` );
                    
                    return done(
                        null, // error
                        false, // user
                        {message : "Password Incorrecto"} // Message
                    )
                }
            })
            
            .catch((err)=> {
                winston.error(`config>passport>bcryp> Error: ${err}`);
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