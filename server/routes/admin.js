const User = require('../models/User')

const admin = (app) => {
    // Get all users 
    app.get('/admin/users', async function(req, res) {
        try {
            const users = await User.find();
            res.json(users)
        } catch (err) {
            res.send(`Error ${err}`)
        }
    });
    // Delete user
    app.delete('/admin/:userId', async (req, res) => {
        try {
            await User.deleteOne({_id: req.params.userId});
            const users = await User.find();
            res.json(users)
        } catch (err) {
            res.send(`Error ${err}`)
        }
    })
};

module.exports = admin;