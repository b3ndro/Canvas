var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        db: 'mongodb://localhost/canvas',
        rootPath: rootPath,
        port: process.env.PORT || 3030
    },
    production: {
        db: 'mongodb://b3ndro_db:canvas@ds033699.mongolab.com:33699/canvas',
        rootPath: rootPath,
        port: process.env.PORT || 80

    }
}