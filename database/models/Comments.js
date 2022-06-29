const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    _id: String,
    date: Date,
    comment_text: String,
},{timestamps: true});

const Comments = mongoose.model('Post', CommentSchema);

module.exports = Comments;