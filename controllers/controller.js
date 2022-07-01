const db = require('../database/models/connection.js');
const path = require('path');
const Post = require('../database/models/Post.js');
const User = require('../database/models/User.js');
const Comment = require('../database/models/Comments.js');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');


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
        const {image} = req.files
        image.mv(path.resolve(__dirname, '../public/images', image.name),(error) => {
             Post.create({ 
                author: req.session.username,
                ...req.body,comments: null,
                image:'/images/'+image.name
            }, (error,post) => {
                    var string = encodeURIComponent(post._id.toString());
                    res.redirect('/viewPost?valid=' + string);
            })
        })
    },

    searchPost: async(req, res) => {
        const posts = await Post.find({'title': {'$regex': req.body.searchPost, '$options': 'i'} })
        res.render('index', {posts});
    },

    commentPost: function(req, res) {
        var ID = req.get('referer');
        var body = req.body.comment_text;
        var username = req.session.username;
        ID = ID.replace("http://localhost:3000/viewPost?valid=", "");

        Comment.create({author: username, ogPost: ID, comment_text: body}, (error) => {
            res.redirect('back');
            //res.render('index', {posts});
        })
    },

    viewComments: async(req,res) => {
        var ID = req.get('referer');
        ID = ID.replace("http://localhost:3000/viewPost?valid=", "");
        await db.findMany(Comment, {_id:ID}, null, function(comments) {
            res.render('viewPost', comments);
        });
    },

    viewPost: async(req,res) => {
        var passed = req.query.valid;
        await db.findOne(Post, {_id:passed}, null, async function(post) {
            await db.findMany(Comment, {ogPost:passed}, null, function(comments) {
                post.comments=comments;
                if(req.session.username) {
                    console.log(post);
                    console.log(comments);
                    res.render('viewPost', {title: post.title,
                        tags: post.tags, author: post.author, createdAt: post.createdAt,
                        ingredients: post.ingredients, instructions: post.instructions, 
                        image: post.image, loggedin: true, loggeduser: req.session.username, 
                        comments: post.comments});
                }
                else {
                    res.render('viewPost', {title: post.title,
                        tags: post.tags, author: post.author, createdAt: post.createdAt,
                        ingredients: post.ingredients, instructions: post.instructions, 
                        image: post.image, comments: post.comments});
                }
            });
            
        });
    },

    getProfile: async(req, res) => {
        const username = req.params.username;
        console.log(req.params.username);
        User.getOne({username:username}, (err, user) => {
            if(req.session.username) {
                res.render('profile', {username: username, joindate: user.date,
                    loggedin: true, loggeduser: req.session.username});
            }
            else {
                res.render('profile', {username: username, joindate: user.date});
            }
            
        });
  
    }
}

module.exports = controller;