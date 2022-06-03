const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: String,
    tags: String,
    ingredients: String,
    instructions: String,
    image: String,
    rating: Number
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;