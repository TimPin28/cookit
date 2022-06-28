const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const fileUpload = require('express-fileupload');

const mongoose = require('./database/models/connection');
const Post = require('./database/models/Post');

// routes imports
const routes = require(`./routes/routes.js`);

// create express application
const app = new express();
const port = 3000;

// listen to port
app.listen(port, function() {
    console.log("Node Server is Running at Port 3000");
});

// handlebars setup
var hbs = require('hbs');
const async = require('hbs/lib/async');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + `/views/partials`);

app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 
app.use(fileUpload());

// serve static files
app.use(express.static('public')); 


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


app.use(`/`, routes);

