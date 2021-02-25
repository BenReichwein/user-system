const user = require('./user');
const post = require('./post');
const saved = require('./saved')
const admin = require('./admin')
// This is where we combine the routes
const appRouter = (app, fs) => {
    app.get('/', (req, res) => {
        res.send(`<h1>Current working routes:</h1>`);
        res.end();
    })
    // Routes
    user(app);
    post(app);
    saved(app);
    admin(app);
}

module.exports = appRouter;