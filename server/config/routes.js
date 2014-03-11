var auth = require('./auth');

module.exports = function (app) {
    app.get('/partials/*', function (reg, res) {
        res.render('../../public/app/' + reg.params);
    });

    app.post('/login', auth.authenticate);

    app.get('*', function (req, res) {
        res.render('index');
    });
}