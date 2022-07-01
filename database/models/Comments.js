const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    author: String,
    ogPost: String,
    comment_text: String,
},{timestamps: true});

const Comments = mongoose.model('Comments', CommentSchema);

module.exports = Comments;