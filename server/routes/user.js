const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const withAuth = require('./middleware');
const User = require('../models/User')
const { appSecret } = require('../config/keys');

const secret = appSecret;

const user = (app) => {
    app.get('/home', function(req, res) {
        res.send('Welcome!');
    });
    // Get user profile
    app.get('/user/profile', withAuth, async function(req, res) {
        const token = 
            req.body.token ||
            req.query.token ||
            req.headers['x-access-token'] ||
            req.cookies.token;  
        
        const decoded = jwt.verify(token, appSecret);

        User.findById(decoded.id, function(err, user) {
            return res.status(200).json({
                email: user.email,
                password: user.password
            });
        })
    });
    // Register User
    app.post('/user/register', function(req, res) {
        const { email, password } = req.body;
        const user = new User({ email, password, saved: [] });
        user.save(function(err) {
            if (err) {
            res.status(500).send("A user already exists with this email");
            } else {
            res.status(200).send("Registered! Put that information in again to login!");
            }
        });
    });
    // User Login
    app.post('/user/login', function(req, res) {
        const { email, password } = req.body;
        User.findOne({ email }, function(err, user) {
            if (err) {
            console.error(err);
            res.status(500)
                .send('Internal error please try again');
            } else if (!user) {
            res.status(401)
                .send('Incorrect email or password');
            } else {
            user.isCorrectPassword(password, function(err, same) {
                if (err) {
                res.status(500)
                    .send('Internal error please try again');
                } else if (!same) {
                res.status(401)
                    .send('Incorrect email or password');
                } else {
                // Issue token
                const payload = {
                    id: user._id,
                    email,
                };
                const token = jwt.sign(payload, secret, {
                    expiresIn: '7d'
                });
                res.cookie('token', token, { httpOnly: true }).sendStatus(200);
                }
            });
            }
        });
    });
    // Update User
    app.patch('/user/update', withAuth, async (req, res) => {
        const { email, password } = req.body;
        const token = 
            req.body.token ||
            req.query.token ||
            req.headers['x-access-token'] ||
            req.cookies.token;  
        
        const decoded = jwt.verify(token, appSecret);

        const updateQuery = {};

        if (email) updateQuery.email = email;
        if (password) updateQuery.password = await bcrypt.hash(password, 10);

        await User.findByIdAndUpdate(decoded.id, updateQuery);
        try {
            return res.status(200).send("Updated!");
        } catch (error) {
            return res.status(500).send('Internal Error, Please try again')
        }
    })
    // Get User Id
    app.get('/user/getUid', async (req, res) => {
        const token = 
            req.body.token ||
            req.query.token ||
            req.headers['x-access-token'] ||
            req.cookies.token;  

        if (token) {
            const decoded = jwt.verify(token, appSecret);
            return res.send(decoded.id);
        } else {
            return res.send(null)
        }
    })
    // Logs out user
    app.get('/user/logout', function(req, res) {
        res.cookie('token', "", { httpOnly: true }).sendStatus(200);
    });
    // Check token with middleware
    app.get('/checkToken', withAuth, function(req, res) {
        res.sendStatus(200);
    });
};

module.exports = user;