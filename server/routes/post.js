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
            res.status(500).send('Internal Error, Please try again')
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

        try {
            await post.save();
            findPosts(req, res);
        } catch (error) {
            res.status(500).send('Internal Error, Please try again')
        }
    });
    // Specific post
    app.get('/posts/:postId', async (req, res) => {
        try {
            const post = await Post.findById(req.params.postId)
            .sort({createdAt: 'desc'})
            res.status(200).json(post)
        } catch (err) {
            res.status(500).send('Internal Error, Please try again')
        }
    })
    // Delete post
    app.delete('/posts/:postId', async (req, res) => {
        try {
            await Post.deleteOne({_id: req.params.postId});
            findPosts(req, res);
        } catch (error) {
            res.status(500).send('Internal Error, Please try again')
        }
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
            res.status(500).send('Internal Error, Please try again')
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

        try {
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
        } catch (error) {
            res.status(500).send('Internal Error, Please try again')
        }
    })
    // Delete Comment
    app.delete('/posts/comment/:postId', withAuth, async (req, res) => {
        try {
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
        } catch (error) {
            res.status(500).send('Internal Error, Please try again')
        }
    })
    // Get Users Posts
    app.get('/userPosts/:userId', async (req, res) => {
        try {
            const post = await Post.find({ postUid: req.params.userId })
            .sort({createdAt: 'desc'});
            res.status(200).json(post)
        } catch (err) {
            res.status(500).send('Internal Error, Please try again')
        }
    })
};

module.exports = posts;