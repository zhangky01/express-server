'use strict';
const log4js = require('log4js');
const config = require('config');

log4js.configure({
    appenders: {
        console: {
            type: 'console',
            category: 'console'
        },
        dateFileLog: {
            type: 'dateFile',
            filename: 'logs/express-server.log',
            pattern: '_yyyy-MM-dd',
            alwaysIncludePattern: false,
            category: 'dateFileLog'
        }
    },
    categories: {
        default: { appenders: ['console'], level: 'info' },
        fileLog: { appenders: ['dateFileLog'], level: 'info' },
    }
});

const dateFileLog = log4js.getLogger(config.get('app.env') === 'dev' ? 'console' : 'fileLog');

module.exports = dateFileLog;