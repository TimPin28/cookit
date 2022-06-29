const db = require('../database/models/connection.js');
const path = require('path');
const Post = require('../database/models/Post.js');

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
        res.redirect('/login');
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