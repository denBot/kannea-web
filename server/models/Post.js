const { Schema, model } = require('mongoose');

const schemaOptions = {
    timestamps: true,
};

const postSchema = new Schema({
    title: {
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
        required: true
    },
    views: {
        type: Number,
        default: 0
    }
}, schemaOptions);

const Post = model('Posts', postSchema);

module.exports = Post;