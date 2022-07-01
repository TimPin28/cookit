const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    author:         {type: String, required: true},
    title:          {type: String, required: true},
    tags:           {type: String, required: false},
    ingredients:    {type: String, required: true},
    instructions:   {type: String, required: true},
    image:          {type: String, required: false},
    comments:       {type: Object, required: false},
}, {timestamps: true});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;