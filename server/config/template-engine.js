import exphbs from 'express-handlebars'
import path from 'path'

export default (app) => {
    // Registering Template Engine
    app.engine('hbs', exphbs({
        extname: '.hbs',
        defaultLayout: 'main',
        // helpers:{
        //     truncate: truncate,
        //     scriptTags: scriptTags,
        //     formatDate : formatDate,
        //     select: select,
        //     editIcon: editIcon
        // }
    }))

    // Selecting Template Engine
    app.set('view engine', 'hbs');
    // Setting Views Route
    app.set('views', path.join(__dirname, '../', 'views'));
    
    return app
}