const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/cookitDB',
// {useNewURLParser: true, useUnifiedTopology: true}); 

const fileUpload = require('express-fileupload');

const Post = require('./database/models/Post');
const path = require('path');

// const routes = require(`./routes/routes.js`);

const app = new express();
app.listen(3000, function() {
    console.log("Node Server is Running at Port 3000");
});

app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 
app.use(express.static('public')); 
app.use(fileUpload());

var hbs = require('hbs');
const async = require('hbs/lib/async');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + `/views/partials`);

app.post('/submit-post', function(req, res) {
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

});

//display after submit
app.get('/viewPost', async(req,res) => {
    var passed = req.query.valid;
    const posts =  await Post.findOne({title:passed});
    res.render('viewPost', posts);
})

//home to display
// app.get('/viewPost2', async(req,res) => {
//     const posts = await Post.findOne({...req.body.title})
//     res.render('viewPost', posts)
// })


// app.use(`/`, routes);

app.get('/', (req,res) => {
    res.render('index');
})

app.get('/create', (req,res) => {
    res.render('create');
})

app.get('/settings', (req,res) => {
    res.render('settings');
})

app.get('/profile', (req,res) => {
    res.render('profile');
})

