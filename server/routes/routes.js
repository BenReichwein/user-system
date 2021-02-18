const user = require('./user');
const post = require('./post');
const admin = require('./admin')

const appRouter = (app, fs) => {
    app.get('/', (req, res) => {
        res.send(`<h1>Current working routes:</h1>`);
        res.end();
    })
    // Routes
    user(app);
    post(app);
    admin(app);
}

module.exports = appRouter;