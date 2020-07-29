import index from '@routes/index'
import auth from '@routes/auth'

// Importing index router
export default function(app){
    // Home
    app.use('/', index)

    // Auth
    app.use('/auth', auth)
    
    // Other Routes
    return app
}