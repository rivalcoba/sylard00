// Importing dotenv
import dotenv from 'dotenv'

// Loading configuration variables
dotenv.config()

// Exporting env
export default{
    homeUrl: process.env.APP_URL || 'http://localhost:3000',
    databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/mevnmongo'
}