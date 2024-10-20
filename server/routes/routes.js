import index from '@routes/index'
import auth from '@routes/auth'
import user from '@routes/user'
import collections from '@routes/collections'
import locations from '@routes/locations'
import glottolog from '@routes/glottolog'
 import audioannotations from '@routes/audioannotations'
 import genres from '@routes/genres'

// Importing index router
export default function(app){
    // Home
    app.use('/', index)

    // Auth
    app.use('/auth', auth)

    // Users
    app.use(['/user','/users'], user)

    // Collections
    app.use('/collections', collections)
    
    // locations
    app.use('/locations', locations)

    // Glottolog
    app.use('/glottolog', glottolog)
   
   // audioannotations
   app.use('/audioannotations',audioannotations)

   // genres
   app.use('/genres', genres)
    
    // Other Routes
    return app
}