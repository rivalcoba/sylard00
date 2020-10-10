import exphbs from 'express-handlebars'
import path from 'path'
import {ifColaborator} from '@hbsHelpers/index'
import {ifVisitor} from '@hbsHelpers/index'
import {ifSu} from '@hbsHelpers/index'
import {hideIfSu} from '@hbsHelpers/index'


// Extract

export default (app) => {
    // Registering Template Engine
    app.engine('hbs', exphbs({
        extname: '.hbs',
        defaultLayout: 'main',
        helpers:{
            ifColaborator: ifColaborator,
            ifVisitor: ifVisitor,
            ifSu: ifSu,
            hideIfSu: hideIfSu
        }
    }))

    // Selecting Template Engine
    app.set('view engine', 'hbs');
    // Setting Views Route
    app.set('views', path.join(__dirname, '../', 'views'));
    
    return app
}