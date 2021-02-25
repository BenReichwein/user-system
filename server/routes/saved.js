const Post = require('../models/Post')
const User = require('../models/User')
const jwt = require('jsonwebtoken');
const withAuth = require('./middleware');
const { appSecret } = require('../config/keys');

const saved = (app) => {
    // Add Saved post to user
    app.post('/saved', withAuth, async (req, res) => {
        const token = 
            req.body.token ||
            req.query.token ||
            req.headers['x-access-token'] ||
            req.cookies.token;  
        
        const decoded = jwt.verify(token, appSecret);

        try {
            await User.updateOne(
                { _id : decoded.id},
                { $push: {
                    saved: req.body.postId
                }
            }).exec();
    
            res.status(200).send('Added to [SAVED]')
        } catch (error) {
            res.status(500).send('Internal Error, Please try again')
        }
    })
    // Get Saved Posts from a user
    app.get('/saved', withAuth, async (req, res) => {
        const token = 
            req.body.token ||
            req.query.token ||
            req.headers['x-access-token'] ||
            req.cookies.token;  
        
        const decoded = jwt.verify(token, appSecret);

        try {
            User.findById(decoded.id, function(err, user) {
                Post.find({_id:{$in:user.saved}})
                .sort({createdAt: 'desc'})
                .then(
                    (resp)=> {
                        res.status(200).json(resp)
                    }
                )
            })
        } catch (error) {
            res.status(500).send('Internal Error, Please try again')
        }
    })
    // Delete Saved
    app.delete('/saved/:postId', withAuth, async (req, res) => {
        const token = 
            req.body.token ||
            req.query.token ||
            req.headers['x-access-token'] ||
            req.cookies.token;  
        
        const decoded = jwt.verify(token, appSecret);

        try {
            await User.updateOne(
                { _id : decoded.id},
                { $pull: {
                    saved: req.params.postId
                }
            }).exec();
    
            await User.findById(decoded.id, function(err, user) {
                Post.find({_id:{$in: user.saved}})
                .sort({createdAt: 'desc'})
                .then(
                    (resp)=> {
                        res.status(200).json(resp)
                    }
                )
            })
        } catch (error) {
            res.status(500).send('Internal Error, Please try again')
        }
    })
};

module.exports = saved;