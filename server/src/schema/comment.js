const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    
    blog_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'blogs'
    },
    blog_author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'blogs',
    },
    comment: {
        type: String,
        required: true
    },
    children: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'comments'
    },
    commented_by: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'users'
    },
    isReply: {
        type: Boolean,
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'comments'
    }

},
{
    timestamps: {
        createdAt: 'commentedAt'
    }
})

const Comment = mongoose.model('comments', commentSchema);
module.exports = Comment;