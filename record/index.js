const service = require('./service');
module.exports = function (app) {
    app.get('/record/', service.get);
    app.post('/record', service.add);
};