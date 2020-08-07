import index from '@routes/index'
import auth from '@routes/auth'
import collections from '@routes/collections'

// Importing index router
export default function(app){
    // Home
    app.use('/', index)

    // Auth
    app.use('/auth', auth)

    // Collections
    app.use('/collections', collections)
    
    // Other Routes
    return app
}