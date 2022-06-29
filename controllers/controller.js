const db = require('../database/models/connection.js');
const path = require('path');
const Post = require('../database/models/Post.js');
const {validationResult} = require('express-validator');

const controller = {
    getIndex: function(req, res) {
        res.render('index');
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
        image.mv(path.resolve(__dirname, 'public/images', image.name),(error) => {
             Post.create({ 
                ...req.body,
                image:'/images/'+image.name
            }, (error,post) => {
                    var string = encodeURIComponent(req.body.title);
                    res.redirect('/viewPost?valid=' + string)
            }) 
        })
    },

    viewPost: async(req,res) => {
        var passed = req.query.valid;
        const posts =  await Post.findOne({title:passed});
        res.render('viewPost', posts);
    }
}

module.exports = controller;