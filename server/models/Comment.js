const { Schema, model } = require('mongoose');

const schemaOptions = {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    },
};

const commentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        default: null
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Posts',
        required: true
    },
}, schemaOptions);

const Comment = model('Comments', commentSchema);

module.exports = Comment;