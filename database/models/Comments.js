const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    author:         {type: String, required: true},
    ogPost:         {type: String, required: true},
    comment_text:   {type: String, required: true},
    editable:       {type: Boolean, default: false}
},{timestamps: true});

const Comments = mongoose.model('Comments', CommentSchema);

module.exports = Comments;