import index from '@routes/index'

// Importing index router
export default function(app){
    // Home
    app.use('/', index)
    
    // Other Routes
    return app
}