// Import config
import keys from '@config/keys'
// Exporting env
export default (app) => {
    
    // 1. Get port from environment and store in Express
    const port = normalizePort(keys.port)
    const ip = keys.ip
    app.set('port', port)
    app.set('ip', ip)
    return app
}

function normalizePort(val) {
    console.log(`LN5@index> normilizing port`)
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}