const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    author_id: String,
    date: Date,
    comment_text: String
});

const Comments = mongoose.model('Post', CommentSchema);

module.exports = Comments;