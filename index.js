


const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const fileUpload = require('express-fileupload');

const mongoose = require('./database/models/connection');
const Post = require('./database/models/Post');

mongoose.connect();

// routes imports
const routes = require('./routes/routes.js');

// create express application
const app = new express();
var PORT = process.env.PORT || 3000

// listen to port
app.listen(PORT, function() {
    console.log("Node Server is Running at Port 3000");
});

// handlebars setup
var hbs = require('hbs');
const async = require('hbs/lib/async');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 
app.use(fileUpload());

// serve static files
app.use(express.static('public')); 

// Sessions
app.use(session({
    store: MongoStore.create({ mongoUrl: 'mongodb://cookit-apdev.herokuapp.com' }),
    secret: 'randomsecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 7 }
}));

// Flash
app.use(flash());

// Global messages vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

app.use('/', routes);

