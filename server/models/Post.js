const { Schema, model } = require('mongoose');

const schemaOptions = {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
};

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    views: {
        type: Number,
        default: 0
    }
}, schemaOptions);

const Post = model('Blog Posts', postSchema);

module.exports = Post;