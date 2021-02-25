const Post = require('../models/Post')
const jwt = require('jsonwebtoken');
const withAuth = require('./middleware');
const { appSecret } = require('../config/keys');

const posts = (app) => {
    const findPosts = async (req, res) => {
        try {
            const posts = await Post.find()
            .sort({createdAt: 'desc'});
            res.json(posts)
        } catch (err) {
            res.send(`Error ${err}`)
        }
    }
    app.get('/posts', async (req, res) => {
        findPosts(req, res);
    });
    // Submits a post - Needs to be req.json to submit
    app.post('/posts', withAuth, async (req, res) => {
        const token = 
            req.body.token ||
            req.query.token ||
            req.headers['x-access-token'] ||
            req.cookies.token;  
        
        const decoded = jwt.verify(token, appSecret);

        const post = new Post({
            title: req.body.title,
            description: req.body.description,
            comments: [],
            postUid: decoded.id,
        });
        await post.save();

        findPosts(req, res);
    });
    // Specific post
    app.get('/posts/:postId', async (req, res) => {
        try {
            const post = await Post.findById(req.params.postId)
            .sort({createdAt: 'desc'})
            res.status(200).json(post)
        } catch (err) {
            res.send(`Error ${err}`)
        }
    })
    // Delete post
    app.delete('/posts/:postId', async (req, res) => {
        await Post.deleteOne({_id: req.params.postId});
        findPosts(req, res);
    })
    // Update post
    app.patch('/posts/:postId', async (req, res) => {
        try {
            const updatedPost = await Post.updateOne(
                {_id:req.params.postId},
                {$set: {title:req.body.title}}
            );
            res.json(updatedPost);
        } catch (err) {
            res.send(`Error ${err}`)
        }
    })
    // Post Comment
    app.post('/posts/comment/:postId', withAuth, async (req, res) => {
        const token = 
            req.body.token ||
            req.query.token ||
            req.headers['x-access-token'] ||
            req.cookies.token;  
        
        const decoded = jwt.verify(token, appSecret);

        Post.updateOne(
            { _id : req.params.postId},
            { $push: {
                comments: {
                    commentUid: decoded.id,
                    postUid: req.body.postUid,
                    postId: req.body.postId,
                    comment: req.body.comment
                }
            }
        }).exec();
        
        findPosts(req, res);
    })
    // Delete Comment
    app.delete('/posts/comment/:postId', withAuth, async (req, res) => {
        Post.updateOne(
            { _id : req.params.postId},
            { $pull: {
                comments: {
                    commentUid: req.body.commentUid,
                    postId: req.body.postId,
                    comment: req.body.comment
                }
            }
        }).exec();

        findPosts(req, res);
    })
    // Get Users Posts
    app.get('/userPosts/:userId', async (req, res) => {
        try {
            const post = await Post.find({ postUid: req.params.userId })
            .sort({createdAt: 'desc'});
            res.status(200).json(post)
        } catch (err) {
            res.send(`Error ${err}`)
        }
    })
};

module.exports = posts;