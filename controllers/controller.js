const db = require('../database/models/connection.js');
const path = require('path');
const Post = require('../database/models/Post.js');
const User = require('../database/models/User.js');
const Comment = require('../database/models/Comments.js');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const fs = require('fs');


const controller = {
    getIndex: async(req, res) => {
        const posts = await Post.find({}).sort({createdAt: -1});

        if(req.session.username){
            res.render('index', {posts, loggedin: true, loggeduser: req.session.username});
        }
        else{
            res.render('index', {posts});
        }
        
    },

    getAlpbt: async(req, res) => {
        const posts = await Post.find({}).collation({'locale':'en'}).sort({title: 1})
        if(req.session.username){
            res.render('index', {posts, loggedin: true, loggeduser: req.session.username});
        }
        else{
            res.render('index', {posts});
        }
    },

    getCreate: function(req, res) {
        if(req.session.username){
            res.render('create', {loggedin: true, loggeduser: req.session.username});
        }
        else{
            res.render('create');
        }
    },

    getSettings: function(req, res) {
        if(req.session.username){
            res.render('settings', {loggedin: true, loggeduser: req.session.username});
        }
        else{
            res.render('settings');
        }
    },

    getProfile: function(req, res) {
        if(req.session.username){
            res.render('profile', {loggedin: true, loggeduser: req.session.username});
        }
        else{
            res.render('profile');
        }
    },

    getLogin: function(req, res) {
        res.render('login');
    },

    getRegister: function(req, res) {
        res.render('register');
    },

    registerUser: (req, res) => {
        const errors = validationResult(req);

        if(errors.isEmpty()) {
            const {username, email, password} = req.body;

            User.getOne({email: email}, (err, result) => {
                if (result) {
                    console.log(result);
                    req.flash('error_msg', 'User already exists. Please login.');
                    res.redirect('/login');
                }
                else {
                    const saltRounds = 10;

                    bcrypt.hash(password, saltRounds, (err, hashed) => {
                        const newUser = {
                            username,
                            email,
                            password: hashed

                        };

                        User.create(newUser, (err, user) => {
                            if (err) {
                                req.flash('error_msg', 'Could not create user. Please try again.');
                                res.redirect('/register');
                            }
                            else {
                                req.flash('success_msg', 'You are now registered! Login below.');
                                res.redirect('/login');
                            }
                        })
                    })
                }
            });
        }
        else {
            const messages = errors.array().map((item) => item.msg);

            req.flash('error_msg', messages.join(' '));
            res.redirect('/register');
        }
    },

    loginUser: (req, res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
        const {
            username,
            password
        } = req.body;

        User.getOne({ username: username }, (err, user) => {
            if (err) {
              // Database error occurred...
              req.flash('error_msg', 'Something happened! Please try again.');
              res.redirect('/login');
            } else {
              // Successful query
              if (user) {
                // User found!
                // Check password with hashed value in the database
                bcrypt.compare(password, user.password, (err, result) => {
                    // passwords match (result == true)
                    if (result) {
                        // Update session object once matched!
                        req.session.userid = user._id;
                        req.session.username = user.username;
                    
                        res.redirect('/');
                    } 
                    else {
                        // passwords don't match
                        req.flash('error_msg', 'Incorrect password. Please try again.');
                        res.redirect('/login');
                    }
                });
              } else {
                // No user found
                req.flash('error_msg', 'No registered user with that email. Please register.');
                res.redirect('/register');
              }
            }
          });
        }
        else {
            const messages = errors.array().map((item) => item.msg);

            req.flash('error_msg', messages.join(' '));
            res.redirect('/login');
        }
    },

    logoutUser: (req, res) => {
        if (req.session) {
            req.session.destroy(() => {
                res.clearCookie('connect.sid');
                res.redirect('/');
            });
        }
    },

    submitPost: function(req, res) {
        const image = req.files.image;
        const uploadPath = path.join(__dirname, '..', 'public', 'images', 'posts');

        let imgtype;

        if(image.mimetype === 'image/png') { imgtype = '.png' }
        else if (image.mimetype === 'image/jpeg') { imgtype = '.jpg' }

        image.mv(path.join(__dirname, '..', 'public', 'images', 'posts', image.name), (error) => {
            if(error) throw error;
            Post.create({
                author: req.session.username,
                ...req.body,
                comments: null,
                image: ''
            }, (error, post) => {
                const postid = post._id.toString();
                const author = post.author;
                const newfilename = postid + '-' + author + imgtype;
                fs.rename(uploadPath + '\\' + image.name, uploadPath + '\\' +  newfilename, (error) => {
                    if(error) throw error;
                    post.image = '/images/posts/' + newfilename;
                    post.save();
                    var string = encodeURIComponent(postid);
                    res.redirect('/viewPost?valid=' + string);
                });

            });
        });
    },

    searchPost: async(req, res) => {
        const posts = await Post.find({'$or': [{'title': {'$regex': req.body.searchPost, '$options': 'i'}}, {'tags': {'$regex': req.body.searchPost, '$options': 'i'}}]})
        res.render('index', {posts});
    },

    deletePost: async(req, res) => {
        const user = req.session.username;
        var postID = req.get('referer');
        postID = postID.replace("http://localhost:3000/viewPost?valid=", "");
        Post.deleteOne({author: user, _id: new Object(postID) }, (error) => {
            res.redirect('/');
        });
    },

    deleteComment: async(req, res) => {
        const user = req.session.username;
        var postID = req.params._id;        
        
        Comment.deleteOne({_id: new Object(postID)}, (error) => {
            res.redirect('back');
        });

    },

    commentPost: function(req, res) {
        var ID = req.get('referer');
        var body = req.body.comment_text;
        var username = req.session.username;
        ID = ID.replace("http://localhost:3000/viewPost?valid=", "");

        Comment.create({author: username, ogPost: ID, comment_text: body}, (error) => {
            res.redirect('back');
        })
    },

    editComment: async(req, res) => {
        var postID = req.params._id;
        var ref = req.get('referer');
        ref = ref.replace("http://localhost:3000/viewPost?valid=", "");
        console.log(postID);

        Comment.updateOne({_id: new Object(postID)}, {
            author: req.session.username,
            ogPost: ref,
            comment_text: req.body.comment_text
        }, (error) =>{
            console.log(req.body.comment_text);
            res.redirect('back');
        })

    },

    viewPost: async(req,res) => {
        var passed = req.query.valid;
        await db.findOne(Post, {_id:passed}, null, async function(post) {
            await db.findMany(Comment, {ogPost:passed}, null, function(comments) {
                post.comments=comments;
                if(req.session.username) {
                    if (req.session.username === post.author){
                        res.render('viewPost', {_id: post._id, title: post.title,
                            tags: post.tags, author: post.author, createdAt: post.createdAt,
                            ingredients: post.ingredients, instructions: post.instructions, 
                            image: post.image, comments: post.comments,
                            loggedin: true, loggeduser: req.session.username, isauthor: true});
                    }
                    else {
                        res.render('viewPost', {_id: post._id, title: post.title,
                            tags: post.tags, author: post.author, createdAt: post.createdAt,
                            ingredients: post.ingredients, instructions: post.instructions, 
                            image: post.image, comments: post.comments,
                            loggedin: true, loggeduser: req.session.username});
                    }

                }
                else {
                    res.render('viewPost', {_id: post._id, title: post.title,
                        tags: post.tags, author: post.author, createdAt: post.createdAt,
                        ingredients: post.ingredients, instructions: post.instructions, 
                        image: post.image, comments: post.comments});
                }
            });
            
        });
    },

    editPost: async(req, res) => {
        const username = req.session.username;
        var postID = req.get('referer');
        postID = postID.replace("http://localhost:3000/edit-post-form/", "");
        if (req.files !== null){    
            const image = req.files.image;
            const uploadPath = path.join(__dirname, '..', 'public', 'images', 'posts');

            let imgtype;
            if(image.mimetype === 'image/png') { imgtype = '.png' }
            else if (image.mimetype === 'image/jpeg') { imgtype = '.jpg' }

            image.mv(path.join(__dirname, '..', 'public', 'images', 'posts', image.name), (err) => {
                const newfilename = postID + '-' + username + imgtype;
                fs.rename(uploadPath + '\\' + image.name, uploadPath + '\\' +  newfilename, (error) => {
                    if(error) throw error;
                    else {
                        db.updateOne(Post, {_id: new Object(postID)}, {
                            author: req.session.username, ...req.body,image: '/images/posts/' + newfilename, comments: null,
                            }, (error) => {
                            res.redirect('/viewPost?valid=' + postID);
                        });
                    }
                });
            });
        }
        else {
            const post = Post.findOne({_id: new Object(postID)})
            db.updateOne(Post, {_id: new Object(postID)}, {
                author: req.session.username, ...req.body,image: post.image, comments: null,
                }, (error) => {
                res.redirect('/viewPost?valid=' + postID);
            });
        }
        
    },

    editPostForm: async(req,res) => {
        var postID = req.get('referer');
        postID = postID.replace("http://localhost:3000/viewPost?valid=", "");
        Post.findOne({_id: new Object(postID)}, (error, post) => {
            res.render('CreateEdit', post);
        });
    },

    getProfile: async(req, res) => {
        const username = req.params.username;
        const posts = await Post.find({author: username}).sort({createdAt: -1});
        User.getOne({username:username}, (err, user) => {
            if(req.session.username) {
                res.render('profile', {posts, username: username, joindate: user.date, 
                    pfp: user.pfp, loggedin: true, loggeduser: req.session.username});
            }
            else {
                res.render('profile', {posts, username: username, joindate: user.date, 
                    pfp: user.pfp});
            }
        });
    },

    getProfilealpbt: async(req,res) => {
        const username = req.params.username;
        const posts = await Post.find({author: username}).collation({'locale':'en'}).sort({title: 1});
        User.getOne({username:username}, (err, user) => {
            if(req.session.username) {
                res.render('profile', {posts, username: username, joindate: user.date, 
                    pfp: user.pfp, loggedin: true, loggeduser: req.session.username});
            }
            else {
                res.render('profile', {posts, username: username, joindate: user.date, 
                    pfp: user.pfp});
            }
        });
    },

    deleteUser: async (req, res) => {
        const name = req.session.username;

        await db.deleteMany(Post, {author: name}, async (error) => {
            await User.delete({username: name}, async (error) => {
                await Comment.deleteMany({author: name}, (error) => {
                    res.redirect('/logout');
                });
            });
        });
    },

    changepass: async (req, res) => {
        const errors = validationResult(req);
        console.log('changepass');

        if(errors.isEmpty()) {
            const username = req.session.username;
            const oldpass = req.body.oldpass;
            const newpass = req.body.newpass;

            User.getOne({username: username}, (err, user) => {
                if (err) throw err;
                else {
                    if (user) {
                        bcrypt.compare(oldpass, user.password, (err, result) => {
                            if (result) {
                                const saltRounds = 10;

                                bcrypt.hash(newpass, saltRounds, (err, hashed) => {
                                    User.update({username: username}, {$set: {password: hashed}}, (err, user) => {
                                        if (err) throw err;
                                        else {
                                            req.flash('success_msg', 'Change password success!');
                                            res.redirect('/settings');
                                        }
                                    })
                                })
                            }
                            else {
                                console.log('incorrect pw');
                                req.flash('error_msg', 'Incorrect password. Please try again.');
                                res.redirect('/settings');
                            }
                        });
                    }
                }
            });
        }
        else {
            const messages = errors.array().map((item) => item.msg);
            req.flash('error_msg', messages.join(' '));
            res.redirect('/settings');
        }
        
    },
    
    changepfp: async(req,res) =>{ 
        const username = req.session.username;
        const image = req.files.image;
        const uploadPath = path.join(__dirname, '..', 'public', 'images', 'pfp');

        let imgtype;
        if(image.mimetype === 'image/png') { imgtype = '.png' }
        else if (image.mimetype === 'image/jpeg') { imgtype = '.jpg' }

        image.mv(path.join(__dirname, '..', 'public', 'images', 'pfp', image.name), (err) => {

            const newfilename = username + imgtype;
            fs.rename(uploadPath + '\\' + image.name, uploadPath + '\\' +  newfilename, (error) => {
                if(error) throw error;
                else {
                    User.update({username: username}, {image: '/images/pfp/' + newfilename}, (error) => {
                        req.flash('success_msg', 'Successfully changed profile picture!');
                        res.redirect('/settings');
                    });
                }
            });
        });
    }
}

module.exports = controller;