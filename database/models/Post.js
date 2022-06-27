const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    username: String,
    tags: String,
    ingredients: String,
    instructions: String,
    image: String,
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;