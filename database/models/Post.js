const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    author: String,
    title: String,
    tags: String,
    ingredients: String,
    instructions: String,
    image: String,
}, {timestamps: true});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;