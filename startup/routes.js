const route = require('../routes/questions')

module.exports = function (app) {
    app.use('/api/questions', route);
}
