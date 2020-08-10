// Importing dotenv
import dotenv from 'dotenv'
// Loading configuration variables
// It fails silently so it would not affect the running of the app if the ".env" file is missing
dotenv.config()
// Exporting env
export default{
    homeUrl: process.env.APP_URL,
    databaseUrl: process.env.DATABASE_URL,
    port: process.env.PORT,
    ip: process.env.IP,
    mailUserName: process.env.MAIL_USERNAME,
    mailPassword: process.env.MAIL_PASSWORD,
    authMail: process.env.AUTH_MAIL,
}