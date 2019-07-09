GLOBAL.approot = __dirname; 

const http = require('http');
const express = require('express');
const util = require('util');
const config = require('./config');
const logger = require('./utils/logger');
const middlewares = require('./middlewares/index');
const routes = require('./routes/index');
const constants = require('./utils/constants');
const app = express();


middlewares(app, express, __dirname);
routes(app);

app.set('port', config.get('server.port'));
http.createServer(app).listen(app.get('port'), function () {
    logger.info(util.format('API server started with process :%s and Running on :%s port', process.pid, app.get('port')));
    logger.info(util.format('Environment:%s', config.get('env')));
});

app.use(function (err, req, res, next) {
    logger.error(util.format('Uncaught exception caught, error:- %s', err.stack));
    return res.status(500).send({
        code: 5002,
        messageKey: constants.messageKeys.code_5002,
        data: {}
    });
});