const express = require('express');
const app = new express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cookitDB',
{useNewURLParser: true, useUnifiedTopology: true}); 

const fileUpload = require('express-fileupload');

// const Post = require('./database/models/Post');
// const path = require('path');

app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 
app.use(express.static('public')); 
app.use(fileUpload());

var hbs = require('hbs');
const async = require('hbs/lib/async');
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
    res.sendFile(__dirname + '\\' + './HomePage/home_page.html');
});

var server = app.listen(3000, function() {
    console.log("Node Server is Running at Port 3000");
});