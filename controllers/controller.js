const db = require('../database/models/connection.js');
const path = require('path');
const Post = require('../database/models/Post.js');
const {validationResult} = require('express-validator');

const controller = {
    getIndex: async(req, res) => {
        const posts = await Post.find({})
        console.log(posts);
        res.render('index', {posts});
    },

    getCreate: function(req, res) {
        res.render('create');
    },

    getSettings: function(req, res) {
        res.render('settings');
    },

    getProfile: function(req, res) {
        res.render('profile');
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

            res.redirect('/login');
        }
        else {
            const messages = errors.array().map((item) => item.msg);

            req.flash('error_msg', messages.join(' '));
            res.redirect('/register');
        }
    },

    submitPost: function(req, res) {
        const {image} = req.files
        image.mv(path.resolve(__dirname, '../public/images', image.name),(error) => {
             Post.create({ 
                ...req.body,
                image:'/images/'+image.name
            }, (error,post) => {
                    var string = encodeURIComponent(req.body.title);
                    res.redirect('/viewPost?valid=' + string);
            }) 
        })
    },

    viewPost: async(req,res) => {
        var passed = req.query.valid;
        await db.findOne(Post, {title:passed}, null, function(posts) {
            res.render('viewPost', posts);
        });
        //const posts = await db.findOne(Post, , );
        //const posts =  await Post.findOne();
    }
}

module.exports = controller;