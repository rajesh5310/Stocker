var winston = require('winston');

var winston = new (winston.Logger)({  
    transports: [
        new (winston.transports.Console)({ level: 'debug' }),
        new (winston.transports.File)({ filename: __dirname + '/../logger.log', level: 'debug' })
    ]
});

winston.info('Chill Winston, the logs are being captured 2 ways - console and file')

module.exports = winston;  